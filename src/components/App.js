/*eslint no-console: 0*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import '../assets/styles/App.scss'
import Header from './UI/Header'
import logo from '../assets/images/logo.png'
import DataComponent from './DataComponent'
import Tickets from './UI/Tickets'
import { fetchTickets } from '../store/actions'

const TicketsWithData =
	DataComponent(
		Tickets,
		'./tickets.json'
	)

class App extends PureComponent {
	componentDidMount() {
		this.props.fetchTickets('./tickets.json');
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
					<TicketsWithData mixin='App__tickets' />
				</div>
			</div>
		)
	}
}

App.defaultProps = {
	fetchTickets: f => f
}

App.propTypes = {
	fetchTickets: PropTypes.func
}

// const mapStateToProps = ({ data = {} }) => ({
// 	data
// })
export default connect(
	null,
	{
		fetchTickets
	}
)(App)
