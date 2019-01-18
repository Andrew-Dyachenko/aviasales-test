// import C from '../../store/constants'
import { fetch } from '../../store/reducers'
import { dafaultFetchState } from '../../helpers/fetchStates'

describe('Reducers', () => {
	describe('Fetch', () => {
		it('It should return default state', () => {
			const defaultState = fetch()
			expect(defaultState)
				.toEqual(dafaultFetchState())
		})
	})
})