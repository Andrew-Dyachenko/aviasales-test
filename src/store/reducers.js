import C from './constants'

export const stops = (state = [], action) => {
	switch (action.type) {
		case C.FILTER_BY_STOPS:
			return {
				stops: [...action.stops]
			}
		case C.FILTER_BY_DEFAULT_STOPS:
			return {
				stops: [0,1,2]
			}
		default:
			return state
	}
}

export const filters = (state = {}, action) => {
	switch (action.type) {
		case C.FILTER_BY_STOPS:
			return {
				...state,
				...stops([], action)
			}
		default:
			return state
	}
}
