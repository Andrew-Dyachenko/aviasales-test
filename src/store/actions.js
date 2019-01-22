/*eslint no-console: 0*/
import C from './constants'

// Tickets

const fetchTicketsStart = () =>   ({ type: C.FETCH_TICKETS_START })
const fetchTicketsSuccess = () => ({ type: C.FETCH_TICKETS_SUCCESS })
const fetchTicketsError = () =>   ({ type: C.FETCH_TICKETS_ERROR })

const setTickets = tickets => ({
	type: C.SET_TICKETS,
	tickets
})

export const fetchTickets = url => dispatch => {
	dispatch(fetchTicketsStart())
	fetch(url)
		.then(response => response.json())
		.then(tickets => {
			dispatch(fetchTicketsSuccess())
			dispatch(setTickets(tickets))
		})
		.catch(() => dispatch(fetchTicketsError()))
}

// Filters

export const filterByStops = (stops, checked) => ({
	type: C.FILTER_BY_STOPS,
	stops,
	checked
})

export const filterByOnlyStops = stops => ({
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

const fetchCurrencyStart = () =>   ({ type: C.FETCH_CURRENCY_START })
const fetchCurrencySuccess = () => ({ type: C.FETCH_CURRENCY_SUCCESS })
const fetchCurrencyError = () =>   ({ type: C.FETCH_CURRENCY_ERROR })

const setCurrencyRates = rates => ({
	type: C.SET_CURRENCY_RATES,
	rates
})

export const fetchCurrency = url => dispatch => {
	dispatch(fetchCurrencyStart())
	fetch(url)
		.then(response => response.json())
		.then(response => {
			console.log(response)
			return response
		})
		.then(response => {
			const { rates } = response
			dispatch(fetchCurrencySuccess())
			dispatch(setCurrencyRates(rates))
		})
		.catch(() => dispatch(fetchCurrencyError()))
}

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
