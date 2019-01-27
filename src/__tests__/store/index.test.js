/*eslint no-console: 0*/
import C from '../../store/constants'
import storeFactory from '../../store'

describe('Store Factory', () => {

	beforeAll(() => {
		window.localStorage = {}
		// console.groupCollapsed = jest.fn()
		// console.log = jest.fn()
		// console.groupEnd = jest.fn()
	})

	afterEach(() => jest.resetAllMocks())

	// describe('Logging', () => {

	// 	let store

	// 	beforeEach(() => {
	// 		store = storeFactory({
	// 			tickets: {
	// 				list: []
	// 			}
	// 		})
	// 		store.dispatch({
	// 			type: C.SET_TICKETS,
	// 			tickets: global.tickets
	// 		})
	// 	})

	// 	it('starts a console group', () =>
	// 		expect(console.groupCollapsed.mock.calls.length).toBe(1)
	// 	)

	// 	it('logs state before action and state after', () =>
	// 		expect(console.log.mock.calls.map(args => args[0]))
	// 			.toEqual([
	// 				'prev state',
	// 				'action',
	// 				'next state'
	// 			])
	// 	)

	// 	it('ends the console group', () =>
	// 		expect(console.groupEnd.mock.calls.length).toBe(1)
	// 	)
	// })

	describe('Saving', () => {

		let store

		beforeEach(() => {
			global.localStorage['aviasales-store'] = false
			store = storeFactory({})
			store.dispatch({
				type: C.SET_TICKETS,
				tickets: global.tickets
			})
		})

		it('saves state to localStorage', () =>
			expect(JSON.parse(global.localStorage['aviasales-store']).tickets.list.length).toEqual(10))

	})

	it('creates a store when default state is not supplied', () => {
		const store = storeFactory()
		expect(store.getState().tickets).toBeInstanceOf(Object)
	})
})
