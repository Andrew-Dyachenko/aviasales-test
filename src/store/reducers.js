/*eslint no-console: 0*/
import C from './constants'
import { compose } from 'redux'
import { sortArrayByNumeric } from '../helpers/sort'
import getStopsFromTickets from '../helpers/getStops'

const dafaultFetchState = () => ({
	fetching: false,
	fetched: false,
	error: false
})
const startFetchState = () => ({
	fetching: true,
	fetched: false,
	error: false
})
const successFetchState = () => ({
	fetching: false,
	fetched: true,
	error: false
})
const errorFetchState = () => ({
	fetching: false,
	fetched: false,
	error: true
})

const fetch = (action = {}, state = dafaultFetchState()) => {
	switch (action.type) {
		case C.FETCH_TICKETS_START:
			return startFetchState()

		case C.FETCH_TICKETS_SUCCESS:
			return successFetchState()

		case C.FETCH_TICKETS_ERROR:
			return errorFetchState()

		case C.FETCH_VALUTA_START:
			return startFetchState()

		case C.FETCH_VALUTA_SUCCESS:
			return successFetchState()

		case C.FETCH_VALUTA_ERROR:
			return errorFetchState()

		default:
			return state
	}
}

export const tickets = (state = { list: [], stops: [], fetch: fetch() }, action) => {
	switch (action.type) {
		case C.FETCH_TICKETS_START:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.FETCH_TICKETS_SUCCESS:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.FETCH_TICKETS_ERROR:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.SET_TICKETS:
			return {
				...state,
				list: action.tickets,
				stops: getStopsFromTickets(action.tickets)
			}

		default:
			return state
	}
}

export const stopsFilter = (action, state = []) => {
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
				stops: stopsFilterWithSort(action, state.stops)
			}

		case C.FILTER_BY_DEFAULT_STOPS:
			return {
				...state,
				stops: stopsFilter(action)
			}

		case C.FILTER_BY_ONLY_STOPS:
			return {
				...state,
				stops: stopsFilter(action, state.stops)
			}

		case C.FILTER_BY_ALL_STOPS:
			return {
				...state,
				stops: stopsFilterWithSort(action)
			}

		default:
			return state
	}
}

const baseValuta = (action = {}, state = 'RUB') => {
	switch (action.type) {
		case C.SET_DEFAULT_VALUTA:
			return 'RUB'

		case C.SET_BASE_VALUTA:
			return action.base

		default:
			return state
	}
}

const valutaRates = (action = {}, state = {}) => {
	switch (action.type) {
		case C.SET_VALUTA_RATES:
			return action.rates

		default:
			return state
	}
}

export const valuta = (state = { rates: valutaRates(), base: baseValuta(), fetch: fetch() }, action) => {
	switch (action.type) {
		case C.FETCH_VALUTA_START:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.FETCH_VALUTA_SUCCESS:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.FETCH_VALUTA_ERROR:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.SET_DEFAULT_VALUTA:
			return {
				...state,
				base: baseValuta(action)
			}

		case C.SET_BASE_VALUTA:
			return {
				...state,
				base: baseValuta(action)
			}

		case C.SET_VALUTA_RATES:
			return {
				...state,
				rates: valutaRates(action)
			}

		default:
			return state
	}
}
