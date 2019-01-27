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
import {
	setScrollDimensions,
	setWindowDimensions } from '../store/actions'

class App extends PureComponent {
	componentDidMount() {
		window.addEventListener('resize', this.props.onResize)
		const storage = localStorage['aviasales-store']

		if (!storage || !JSON.parse(storage).tickets.fetch.fetched)
			this.props.fetchTickets('./tickets.json')

		if (!storage || !JSON.parse(storage).currencies.fetch.fetched)
			this.props.fetchCurrency('https://api.exchangeratesapi.io/latest?base=RUB&symbols=RUB,USD,EUR')

	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.props.onResize)
	}
	render() {
		const { scrollbarWidth } = this.props.dimensions.scroll
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
	dimensions: {
		scroll: {
			scrollbarHeight: 0,
			scrollbarWidth: 0
		},
		window: {
			innerWidth: 0
		}
	},
	fetchCurrency: f => f,
	fetchTickets: f => f,
	scrollbarSizeLoad: f => f,
	scrollbarSizeChange: f => f
}

App.propTypes = {
	
	dimensions: PropTypes.object,
	fetchCurrency: PropTypes.func,
	fetchTickets: PropTypes.func,
	onResize: PropTypes.func,
	scrollbarSizeLoad: PropTypes.func,
	scrollbarSizeChange: PropTypes.func
}

export default connect(
	state =>
		({
			dimensions: state.dimensions
		}),
	{
		fetchCurrency,
		fetchTickets,
		onResize: () => dispatch => dispatch(setWindowDimensions({ innerWidth: window.innerWidth })),
		scrollbarSizeLoad: dimensions => dispatch => dispatch(setScrollDimensions(dimensions)),
		scrollbarSizeChange: dimensions => dispatch => dispatch(setScrollDimensions(dimensions))
	}
)(App)
