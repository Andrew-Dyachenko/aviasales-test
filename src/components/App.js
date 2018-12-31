/*eslint no-console: 0*/
import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import '../assets/styles/App.scss'
import Header from './UI/Header'
import logo from '../assets/images/logo.png'
import DataComponent from './DataComponent'
import Tickets from './UI/Tickets'

const TicketsWithData =
	DataComponent(
		Tickets,
		'./tickets.json'
	)

class App extends PureComponent {
	constructor() {
		super()
		this.state = {
			fetching: false
		}
		this.onOnly = this.onOnly.bind(this)
		this.onStop = this.onStop.bind(this)
		this.onAllStops = this.onAllStops.bind(this)
	}
	onOnly() {}
	onStop() {}
	onAllStops() {}
	render() {
		return (
			<div className='App root__App'>
				<Helmet>
					<html lang='ru' />
					<title>Aviasales</title>
				</Helmet>
				<div className="container App__container">
					<Header logo={logo} mixin='App__header' />
					<TicketsWithData mixin='App__tickets' />
				</div>
			</div>
		)
	}
}

export default App
