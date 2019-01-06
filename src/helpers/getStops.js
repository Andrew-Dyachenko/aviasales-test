/*eslint no-console: 0*/
import { compose } from 'redux'
import { sortArrayByNumeric } from '../helpers/sort'

const getUnsortedStops = store => {
	const { tickets } = store.getState()
	// console.log('tickets: ', tickets)
	const { list } = tickets
	// console.log('list: ', list)
	const _stops = list.reduce((reduced, ticket) => {
		// console.log('ticket: ', ticket)
		const { stops } = ticket
		// console.log('stops: ', stops)
		// console.log('reduced: ', reduced)
		return (reduced.indexOf(stops) === -1) ?
			[...reduced, stops] :
			reduced
	}, [])

	// console.log('getStops: ', sortArrayByNumeric(_stops))
	return _stops
}

const getStops = compose(
	sortArrayByNumeric,
	getUnsortedStops
)

export default getStops
