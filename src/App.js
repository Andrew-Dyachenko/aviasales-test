import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import './App.scss'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Helmet>
					<html lang='en' />
					<title>Aviasales</title>
				</Helmet>
				App
			</div>
		)
	}
}

export default App
