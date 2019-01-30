/*eslint no-console: 0*/
/** global: localStorage */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { tickets, currencies, filters, modificators, dimensions } from './reducers'
import stateData from '../data/initialState'

// const logger = store => next => action => {
// 	let result
// 	console.groupCollapsed('dispatching', action.type)
// 	console.log('prev state', store.getState())
// 	console.log('action', action)
// 	result = next(action)
// 	console.log('next state', store.getState())
// 	console.groupEnd()
// 	return result
// }

const saver = store => next => action => {
	let result = next(action)
	localStorage['aviasales-store'] = JSON.stringify(store.getState())
	return result
}

const storeFactory = (initialState = stateData) =>
	applyMiddleware(/*logger, */saver, thunk)(createStore)(
		combineReducers({ tickets, currencies, filters, modificators, dimensions }),
		(localStorage['aviasales-store']) ?
			JSON.parse(localStorage['aviasales-store']) :
			initialState
	)

export default storeFactory
