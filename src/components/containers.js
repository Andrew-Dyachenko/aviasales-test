import { connect } from 'react-redux'
import StopList from '../components/UI/StopList'
import ButtonsGroup from './UI/ButtonsGroup'
import TicketsList from './UI/TicketsList'
import {
	filterByStops,
	filterByOnlyStops,
	filterByAllStops,
	setCurrencyModifier } from '../store/actions'

export const Stops = connect(
	state =>
		({
			filters: state.filters.stops,
			stops: state.tickets.stops,
			fetching: state.tickets.fetch.fetching
		}),
	dispatch =>
		({
			onStop(event) {
				const { target } = event
				const value = Number(target.value)
				const { checked } = target
				dispatch(filterByStops(value, checked))
			},
			onOnly(event) {
				const { target } = event
				const { dataset } = target
				const stops = Number(dataset.stops)
				dispatch(filterByOnlyStops(stops))
			},
			onAllStops(event) {
				const { target } = event
				const { checked } = target
				const { stops } = window.store.getState().tickets
				dispatch(filterByAllStops(stops, checked))
			}
		})
)(StopList)

const hasRateData = (rates = {}, currency) =>
	Object.keys(rates).some((rate, index, array) =>
		array.indexOf(currency) !== -1
	)

export const Currencies = connect(
	state => {
		const { list } = state.modificators.currencies
		const buttons = list.map(currency => {
			const text = currency
			const isBase = currency === state.currencies.base
			const defaultChecked = currency === state.modificators.currencies.currency
			const disabled = isBase
				? false
				: (
					state.currencies.fetch.fetching ||
					state.currencies.fetch.error ||
					!hasRateData(state.currencies.rates, currency)
				)
					? true
					: false
			return ({
				text,
				defaultChecked,
				disabled
			})
		})
		return ({
			buttons,
			fetching: state.currencies.fetch.fetching
		})
	},
	dispatch => ({
		onCheck(event) {
			const { target } = event
			const { value } = target
			dispatch(setCurrencyModifier(value))
		}
	})
)(ButtonsGroup)

export const TicketsListContainer = connect(
	state => ({
		currencies: state.currencies,
		filters: state.filters,
		modificators: state.modificators,
		tickets: state.tickets,
		dimensions: state.dimensions
	}),
	null
)(TicketsList)
