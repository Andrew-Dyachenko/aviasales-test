import { compose } from 'redux'
import { sortArrayByNumeric } from '../helpers/sort'

const getUnsortedStops = tickets => {
	const _stops = tickets.reduce((reduced, ticket) => {
		const { stops } = ticket
		return (reduced.indexOf(stops) === -1) ?
			[...reduced, stops] :
			reduced
	}, [])

	return _stops
}

const sortArrayByNumericWrapper = direction => array => sortArrayByNumeric(array, direction)

const getStopsFromTickets = compose(
	sortArrayByNumericWrapper('ascending'),
	getUnsortedStops
)

export default getStopsFromTickets
