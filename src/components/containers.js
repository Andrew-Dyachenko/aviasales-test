/*eslint no-console: 0*/
import { connect } from 'react-redux'
import StopList from '../components/UI/StopList'
import { filterByStops, filterByOnlyStops, filterByAllStops } from '../store/actions'
import getStops from '../helpers/getStops'

export const Stops = connect(
	null,
	dispatch =>
		({
			onStop(event) {
				const { target } = event
				const { value } = target
				const { checked } = target
				// console.log('value: ', value)
				dispatch(filterByStops(value, checked))
			},
			onOnly(event) {
				const { target } = event
				const { dataset } = target
				const { stops } = dataset
				console.log('onOnly target dataset index: ', stops)
				dispatch(filterByOnlyStops(stops))
			},
			onAllStops(event) {
				// console.log('window.store: ', window.store)
				const { target } = event
				const { checked } = target
				const stops = getStops(window.store)
				// const { dataset } = target
				// const { array } = dataset
				console.log('onAllStops stops: ', stops)
				// dispatch(filterByAllStops())
				dispatch(filterByAllStops(stops, checked))
			}
		})
)(StopList)
