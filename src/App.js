/*eslint no-console: 0*/
import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import './App.scss'
import Header from './components/Header'
import logo from './logo.png'
import Tickets from './components/Tickets'

class App extends PureComponent {
	render() {
		return (
			<div className='App root__App'>
				<Helmet>
					<html lang='ru' />
					<title>Aviasales</title>
				</Helmet>
				<div className="container App__container">
					<Header logo={logo} />
					<Tickets />
				</div>
			</div>
		)
	}
}

export default App
