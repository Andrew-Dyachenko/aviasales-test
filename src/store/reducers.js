/*eslint no-console: 0*/
import C from './constants'
import { compose } from 'redux'
import { sortArrayByNumeric } from '../helpers/sort'
import getStopsFromTickets from '../helpers/getStops'
import {
	dafaultFetchState,
	startFetchState,
	successFetchState,
	errorFetchState } from '../helpers/fetchStates'

export const fetch = (action = {}, state = dafaultFetchState()) => {
	switch (action.type) {
		case C.FETCH_TICKETS_START:    return startFetchState()
		case C.FETCH_TICKETS_SUCCESS:  return successFetchState()
		case C.FETCH_TICKETS_ERROR:    return errorFetchState()

		case C.FETCH_CURRENCY_START:   return startFetchState()
		case C.FETCH_CURRENCY_SUCCESS: return successFetchState()
		case C.FETCH_CURRENCY_ERROR:   return errorFetchState()

		default:
			return state
	}
}

export const tickets = (state = { list: [], stops: [], fetch: fetch() }, action = {}) => {
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

export const stopsFilter = (action = {}, state = []) => {
	let { stops } = action
	stops = Array.isArray(stops)
		? stops
		: [ stops ]

	switch (action.type) {
		case C.FILTER_BY_STOPS: {
			const { checked } = action
			return [...stops].reduce((reduced, stop) => {
				return (checked && (reduced.indexOf(stop) === -1))
					? [...reduced, stop]
					: reduced.filter(_stop => _stop !== stop)
					
			}, state)
		}

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

const sortArrayByNumericWrapper = direction => array => sortArrayByNumeric(array, direction)

const stopsFilterWithSort = compose(
	sortArrayByNumericWrapper('ascending'),
	stopsFilter
)

export const filters = (state = {}, action = {}) => {
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

export const baseСurrency = (action = {}, state = 'RUB') => {
	switch (action.type) {
		case C.SET_DEFAULT_CURRENCY:
			return 'RUB'

		case C.SET_BASE_CURRENCY:
			return action.base

		default:
			return state
	}
}

export const currencyRates = (action = {}, state = {}) => {
	switch (action.type) {
		case C.SET_CURRENCY_RATES:
			return action.rates

		default:
			return state
	}
}

export const currencies = (state = { rates: currencyRates(), base: baseСurrency(), fetch: fetch() }, action = {}) => {
	switch (action.type) {
		case C.FETCH_CURRENCY_START:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.FETCH_CURRENCY_SUCCESS:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.FETCH_CURRENCY_ERROR:
			return {
				...state,
				fetch: fetch(action)
			}

		case C.SET_DEFAULT_CURRENCY:
			return {
				...state,
				base: baseСurrency(action)
			}

		case C.SET_BASE_CURRENCY:
			return {
				...state,
				base: baseСurrency(action)
			}

		case C.SET_CURRENCY_RATES:
			return {
				...state,
				rates: currencyRates(action)
			}

		default:
			return state
	}
}

export const currencyModifier = (action = {}, state = baseСurrency()) => {
	switch (action.type) {
		case C.SET_CURRENCY_MODIFIER:
			return action.currency

		default:
			return state
	}
}

export const currencyModifiersList = (action = {}, state = [baseСurrency()]) => {
	switch (action.type) {
		case C.SET_CURRENCY_MODIFIERS:
			return action.currencies

		case C.ADD_CURRENCY_MODIFIER:
			return [...state, action.currency]

		case C.REMOVE_CURRENCY_MODIFIER:
			return [...state].filter(currency => currency !== action.currency)

		default:
			return state
	}
}

export const currencyModifiers = (action = {}, state = {list: currencyModifiersList(), currency: currencyModifier()}) => {
	switch (action.type) {
		case C.SET_CURRENCY_MODIFIERS:
			return {
				...state,
				list: currencyModifiersList(action, state.list)
			}

		case C.ADD_CURRENCY_MODIFIER:
			return {
				...state,
				list: currencyModifiersList(action, state.list)
			}

		case C.REMOVE_CURRENCY_MODIFIER:
			return {
				...state,
				list: currencyModifiersList(action, state.list)
			}

		case C.SET_CURRENCY_MODIFIER:
			return {
				...state,
				currency: currencyModifier(action, state.currency)
			}

		default:
			return state
	}
}

export const modificators = (state = {currencies: currencyModifiers()}, action = {}) => {
	switch (action.type) {
		case C.SET_CURRENCY_MODIFIERS:
			return {
				...state,
				currencies: currencyModifiers(action, state.currencies)
			}

		case C.ADD_CURRENCY_MODIFIER:
			return {
				...state,
				currencies: currencyModifiers(action, state.currencies)
			}

		case C.REMOVE_CURRENCY_MODIFIER:
			return {
				...state,
				currencies: currencyModifiers(action, state.currencies)
			}

		case C.SET_CURRENCY_MODIFIER:
			return {
				...state,
				currencies: currencyModifiers(action, state.currencies)
			}

		default:
			return state
	}
}

export const measurements = (state = {scrollbarHeight: 0, scrollbarWidth: 0}, action = {}) => {
	switch (action.type) {
		case C.SET_MEASUREMENTS:
			return action.measurements

		default:
			return state
	}
}
