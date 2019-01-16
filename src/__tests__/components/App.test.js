import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../components/App'
import { Provider } from 'react-redux'
import storeFactory from '../../store'

const store = storeFactory()

window.React = React
window.store = store


it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, div)
	ReactDOM.unmountComponentAtNode(div)
})
