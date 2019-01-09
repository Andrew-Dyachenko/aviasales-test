/*eslint no-console: 0*/
import C from './constants'

// Tickets

const fetchTicketsStart = () => ({ type: C.FETCH_TICKETS_START })
const fetchTicketsSuccess = () => ({ type: C.FETCH_TICKETS_SUCCESS })
const fetchTicketsError = () => ({ type: C.FETCH_TICKETS_ERROR })

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

// Valuta

const fetchValutaStart = () => ({ type: C.FETCH_VALUTA_START })
const fetchValutaSuccess = () => ({ type: C.FETCH_VALUTA_SUCCESS })
const fetchValutaError = () => ({ type: C.FETCH_VALUTA_ERROR })

const setValutaRates = rates => ({
	type: C.SET_VALUTA_RATES,
	rates
})

export const fetchValuta = url => dispatch => {
	dispatch(fetchValutaStart())
	fetch(url)
		.then(response => response.json())
		.then(response => {
			console.log(response)
			return response
		})
		.then(response => {
			const { rates } = response
			dispatch(fetchValutaSuccess())
			dispatch(setValutaRates(rates))
		})
		.catch(() => dispatch(fetchValutaError()))
}

export const setDefaultValuta = () => ({
	type: C.SET_DEFAULT_VALUTA
})

export const setBaseValuta = base => ({
	type: C.SET_BASE_VALUTA,
	base
})
