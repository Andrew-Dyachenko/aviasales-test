import C from './constants'

export const filterByStops = stops => ({
		type: C.FILTER_BY_STOPS,
		stops
	})

export const filterByDefaultStops = () => ({
		type: C.FILTER_BY_DEFAULT_STOPS
	})
