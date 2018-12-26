/*eslint no-console: 0*/

import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { colors, sort } from './reducers'

const logger = store => next => action => {
	let result
	console.groupCollapsed('dispatching', action.type)
	console.log('prev state', store.getState())
	console.log('action', action)
	result = next(action)
	console.log('next state', store.getState())
	console.groupEnd()
	return result
}

const saver = store => next => action => {
	let result = next(action)
	localStorage['aviasales-store'] = JSON.stringify(store.getState())
	return result
}

const storeFactory = (initialState = {}) =>
	applyMiddleware(logger, saver)(createStore)(
		combineReducers(/*{colors, sort}*/),
		(localStorage['aviasales-store']) ?
			JSON.parse(localStorage['aviasales-store']) :
			initialState
	)

export default storeFactory
