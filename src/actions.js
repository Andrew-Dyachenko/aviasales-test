import C from './constants'

export const filterTickets = (filterBy, parameter) => ({
		type: C.FILTER_TICKETS,
		filterBy,
		parameter
	})

export const changeValuta = valuta => ({
		type: C.CHANGE_VALUTA,
		valuta
	})
