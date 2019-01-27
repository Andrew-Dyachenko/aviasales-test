/*eslint no-console: 0*/
import C from './constants'

// Tickets

export const fetchTicketsStart = () =>   ({ type: C.FETCH_TICKETS_START })
export const fetchTicketsSuccess = () => ({ type: C.FETCH_TICKETS_SUCCESS })
export const fetchTicketsError = () =>   ({ type: C.FETCH_TICKETS_ERROR })

export const setTickets = tickets => ({
	type: C.SET_TICKETS,
	tickets
})

// Filters

export const filterByStops = (stops, checked) => ({
	type: C.FILTER_BY_STOPS,
	stops,
	checked
})

export const filterByOnlyStops = (stops) => ({
	type: C.FILTER_BY_ONLY_STOPS,
	stops
})

export const filterByDefaultStops = () => ({
	type: C.FILTER_BY_DEFAULT_STOPS
})

export const filterByAllStops = (stops, checked) => ({
	type: C.FILTER_BY_ALL_STOPS,
	stops,
	checked
})

// Currencies

export const fetchCurrencyStart = () =>   ({ type: C.FETCH_CURRENCY_START })
export const fetchCurrencySuccess = () => ({ type: C.FETCH_CURRENCY_SUCCESS })
export const fetchCurrencyError = () =>   ({ type: C.FETCH_CURRENCY_ERROR })

export const setCurrencyRates = (rates) => ({
	type: C.SET_CURRENCY_RATES,
	rates
})

export const setDefaultCurrency = () => ({
	type: C.SET_DEFAULT_CURRENCY
})

export const setbaseCurrency = base => ({
	type: C.SET_BASE_CURRENCY,
	base
})

export const addCurrencyModifier = currency => ({
	type: C.ADD_CURRENCY_MODIFIER,
	currency
})

export const removeCurrencyModifiers = currency => ({
	type: C.REMOVE_CURRENCY_MODIFIER,
	currency
})

export const setCurrencyModifiers = currencies => ({
	type: C.SET_CURRENCY_MODIFIERS,
	currencies
})

export const setCurrencyModifier = currency => ({
	type: C.SET_CURRENCY_MODIFIER,
	currency
})

export const setScrollDimensions = dimensions => ({
	type: C.SET_SCROLL_DIAMENTIONS,
	dimensions
})

export const setWindowDimensions = dimensions => ({
	type: C.SET_WINDOW_DIAMENTIONS,
	dimensions
})
