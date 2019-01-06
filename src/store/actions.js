/*eslint no-console: 0*/
import C from './constants'

const fetchTicketsStart = () => ({
		type: C.FETCH_TICKETS_START
	})

const fetchTicketsSuccess = tickets => ({
		type: C.FETCH_TICKETS_SUCCESS,
		tickets
	})

const fetchTicketsError = () => ({
		type: C.FETCH_TICKETS_ERROR
	})

export const fetchTickets = url => dispatch => {
	dispatch(fetchTicketsStart())
	fetch(url)
		.then(response => response.json())
		.then(tickets => dispatch(fetchTicketsSuccess(tickets)))
		.catch(() => dispatch(fetchTicketsError()))
	}

export const sortStops = stops => ({
		type: C.SORT_STOPS,
		stops
	})

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
