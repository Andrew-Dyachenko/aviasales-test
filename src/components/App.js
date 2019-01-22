/*eslint no-console: 0*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ScrollbarSize from 'react-scrollbar-size'
import '../assets/styles/App.scss'
import Header from './UI/Header'
import logo from '../assets/images/logo.png'
import Tickets from './UI/Tickets'
import {
	fetchTickets,
	fetchCurrency } from '../helpers/fetch'
import { setMeasurements } from '../store/actions'

class App extends PureComponent {
	componentDidMount() {
		const storage = localStorage['aviasales-store']

		if (!storage || !JSON.parse(storage).tickets.fetch.fetched)
			this.props.fetchTickets('./tickets.json')

		if (!storage || !JSON.parse(storage).currencies.fetch.fetched)
			this.props.fetchCurrency('https://api.exchangeratesapi.io/latest?base=RUB&symbols=RUB,USD,EUR')
			// this.props.fetchCurrency('./currency.json')

	}
	render() {
		const { scrollbarWidth } = this.props.measurements
		return (
			<div className='App root__App'>
				<Helmet>
					<html lang='ru' />
					<title>Aviasales</title>
					<style>
						{`
							:root {
								--scroll-width: ${scrollbarWidth}px;
							}
						`}
					</style>
				</Helmet>
				<ScrollbarSize
					onLoad={this.props.scrollbarSizeLoad}
					onChange={this.props.scrollbarSizeChange} />

				<div className='container App__container'>
					<Header logo={logo} mixin='App__header' />
					<Tickets mixin='App__tickets' />
				</div>
			</div>
		)
	}
}

App.defaultProps = {
	measurements: {scrollbarHeight: 0, scrollbarWidth: 0},
	fetchCurrency: f => f,
	fetchTickets: f => f,
	scrollbarSizeLoad: f => f,
	scrollbarSizeChange: f => f
}

App.propTypes = {
	measurements: PropTypes.object,
	fetchCurrency: PropTypes.func,
	fetchTickets: PropTypes.func,
	scrollbarSizeLoad: PropTypes.func,
	scrollbarSizeChange: PropTypes.func
}

export default connect(
	state =>
		({
			measurements: state.measurements
		}),
	{
		fetchCurrency,
		fetchTickets,
		scrollbarSizeLoad: measurements => dispatch => dispatch(setMeasurements(measurements)),
		scrollbarSizeChange: measurements => dispatch => dispatch(setMeasurements(measurements))
	}
)(App)
