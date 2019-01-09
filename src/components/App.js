/*eslint no-console: 0*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import '../assets/styles/App.scss'
import Header from './UI/Header'
import logo from '../assets/images/logo.png'
import Tickets from './UI/Tickets'
import { fetchTickets, fetchValuta, setDefaultValuta } from '../store/actions'

class App extends PureComponent {
	componentDidMount() {
		const storage = localStorage['aviasales-store']

		if (!storage || !JSON.parse(storage).tickets.fetch.fetched)
			this.props.fetchTickets('./tickets.json')

		if (!storage || !JSON.parse(storage).valuta.fetch.fetched)
			this.props.fetchValuta('https://api.exchangeratesapi.io/latest?base=RUB&symbols=USD,EUR')

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
	fetchValuta: f => f,
	fetchTickets: f => f,
	setDefaultValuta: f => f
}

App.propTypes = {
	fetchValuta: PropTypes.func,
	fetchTickets: PropTypes.func,
	setDefaultValuta: PropTypes.func
}

export default connect(
	null,
	{
		fetchValuta,
		fetchTickets,
		setDefaultValuta
	}
)(App)
