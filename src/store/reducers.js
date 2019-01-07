/*eslint no-console: 0*/
import C from './constants'
import { compose } from 'redux'
import { sortArrayByNumeric } from '../helpers/sort'
import getStopsFromTickets from '../helpers/getStops'

const fetchingTickets = (state = { fetching: false, fetched: false, error: false }, action = {}) => {
	switch (action.type) {
		case C.FETCH_TICKETS_START:
			return {
				fetching: true,
				fetched: false,
				error: false
			}

		case C.FETCH_TICKETS_SUCCESS:
			return {
				fetching: false,
				fetched: true,
				error: false
			}

		case C.FETCH_TICKETS_ERROR:
			return {
				fetching: false,
				fetched: false,
				error: true
			}

		default:
			return state
	}
}

export const tickets = (state = { list: [], fetch: fetchingTickets() }, action) => {
	switch (action.type) {
		case C.FETCH_TICKETS_START:
			return {
				...state,
				fetch: fetchingTickets({}, action)
			}

		case C.FETCH_TICKETS_SUCCESS:
			return {
				list: action.tickets,
				fetch: fetchingTickets({}, action),
				stops: getStopsFromTickets(action.tickets)
			}

		case C.FETCH_TICKETS_ERROR:
			return {
				...state,
				fetch: fetchingTickets({}, action)
			}

		default:
			return state
	}
}

export const stopsFilter = (state = [], action) => {
	let { stops } = action
	stops = Array.isArray(stops)
		? stops
		: [ stops ]

	switch (action.type) {
		case C.FILTER_BY_STOPS:
			return [...state, ...stops].reduce((reduced, stop) => {
					const { checked } = action
					return reduced.indexOf(stop) === -1 ?
						[...reduced, stop] :
						checked ?
							reduced :
							reduced.filter(_stop => _stop !== stop)
				}, [])

		case C.FILTER_BY_DEFAULT_STOPS:
			return [0,1,2]

		case C.FILTER_BY_ONLY_STOPS:
			return stops

		case C.FILTER_BY_ALL_STOPS: {
			const { checked } = action
			return checked
				? stops
				: []
		}

		default:
			return state
	}
}

const stopsFilterWithSort = compose(
	sortArrayByNumeric,
	stopsFilter
)

export const filters = (state = {}, action) => {
	switch (action.type) {
		case C.FILTER_BY_STOPS:
			return {
				...state,
				stops: stopsFilterWithSort(state.stops, action)
			}
		case C.FILTER_BY_DEFAULT_STOPS:
			return {
				...state,
				stops: stopsFilter([], action)
			}
		case C.FILTER_BY_ONLY_STOPS:
			return {
				...state,
				stops: stopsFilter(state.stops, action)
			}
		case C.FILTER_BY_ALL_STOPS:
			return {
				...state,
				stops: stopsFilterWithSort([], action)
			}
		default:
			return state
	}
}
