import {
	dafaultFetchState,
	startFetchState,
	successFetchState,
	errorFetchState } from '../../helpers/fetchStates'

describe('Fetch states', () => {
	it('Default fetch state', () => {
		const defaultState = dafaultFetchState()
		expect(defaultState)
			.toEqual({
				fetching: false,
				fetched: false,
				error: false
			})
	})
	it('Start fetch state', () => {
		const defaultState = startFetchState()
		expect(defaultState)
			.toEqual({
				fetching: true,
				fetched: false,
				error: false
			})
	})
	it('Success fetch state', () => {
		const defaultState = successFetchState()
		expect(defaultState)
			.toEqual({
				fetching: false,
				fetched: true,
				error: false
			})
	})
	it('Error fetch state', () => {
		const defaultState = errorFetchState()
		expect(defaultState)
			.toEqual({
				fetching: false,
				fetched: false,
				error: true
			})
	})
})
