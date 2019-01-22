/*eslint no-console: 0*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import '../assets/styles/App.scss'
import Header from './UI/Header'
import logo from '../assets/images/logo.png'
import Tickets from './UI/Tickets'
import {
	fetchTickets,
	fetchCurrency } from '../helpers/fetch'

class App extends PureComponent {
	componentDidMount() {
		const storage = localStorage['aviasales-store']

		if (!storage || !JSON.parse(storage).tickets.fetch.fetched)
			this.props.fetchTickets('./tickets.json')

		if (!storage || !JSON.parse(storage).currencies.fetch.fetched)
			// this.props.fetchCurrency('https://api.exchangeratesapi.io/latest?base=RUB&symbols=USD,EUR')
			this.props.fetchCurrency('./currency.json')

	}
	render() {
		return (
			<div className='App root__App'>
				<Helmet>
					<html lang='ru' />
					<title>Aviasales</title>
				</Helmet>
				<div className='container App__container'>
					<Header logo={logo} mixin='App__header' />
					<Tickets mixin='App__tickets' />
				</div>
			</div>
		)
	}
}

App.defaultProps = {
	fetchCurrency: f => f,
	fetchTickets: f => f
}

App.propTypes = {
	fetchCurrency: PropTypes.func,
	fetchTickets: PropTypes.func
}

export default connect(
	null,
	{
		fetchCurrency,
		fetchTickets
	}
)(App)
