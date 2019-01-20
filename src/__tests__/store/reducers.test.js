import C from '../../store/constants'
import {
	fetch,
	tickets,
	stopsFilter,
	filters,
	currencyRates,
	baseСurrency,
	currencies,
	modificators,
	// currencyModifiers,
	currencyModifiersList,
	currencyModifier } from '../../store/reducers'

import {
	dafaultFetchState,
	startFetchState,
	successFetchState,
	errorFetchState } from '../../helpers/fetchStates'
	
import getStopsFromTickets from '../../helpers/getStops'

describe('Reducers', () => {
	describe('Fetch', () => {
		it('Should return expected default state', () => {
			const defaultState = fetch()
			expect(defaultState)
				.toEqual(dafaultFetchState())
		})
		describe('Tickets', () => {
			it('Should return start fetch state', () => {
				const startState = fetch({type: C.FETCH_TICKETS_START})
				expect(startState)
					.toEqual(startFetchState())
			})
			it('Should return success fetch state', () => {
				const successState = fetch({type: C.FETCH_TICKETS_SUCCESS})
				expect(successState)
					.toEqual(successFetchState())
			})
			it('Should return error fetch state', () => {
				const errorState = fetch({type: C.FETCH_TICKETS_ERROR})
				expect(errorState)
					.toEqual(errorFetchState())
			})
		})
		describe('Currencies', () => {
			it('Should return start fetch state', () => {
				const startState = fetch({type: C.FETCH_CURRENCY_START})
				expect(startState)
					.toEqual(startFetchState())
			})
			it('Should return success fetch state', () => {
				const successState = fetch({type: C.FETCH_CURRENCY_SUCCESS})
				expect(successState)
					.toEqual(successFetchState())
			})
			it('Should return error fetch state', () => {
				const errorState = fetch({type: C.FETCH_CURRENCY_ERROR})
				expect(errorState)
					.toEqual(errorFetchState())
			})
		})
	})
	describe('Tickets', () => {
		describe('Default state', () => {
			it('Should return expected default state', () => {
				const defaultTicketsState = tickets()
				expect(defaultTicketsState)
					.toEqual({
						list: [],
						stops: [],
						fetch: fetch()
					})
			})
		})
		describe('Fetch', () => {
			it('Should return expected start state', () => {
				const action = {type: C.FETCH_TICKETS_START}
				const list = []
				const stops = []
				const _fetch = fetch(action)
				const state = {
					list,
					stops
				}
				const startTicketsState = tickets(
					state,
					action
				)
				expect(startTicketsState)
					.toEqual({
						list,
						stops,
						fetch: _fetch
					})
			})
			it('Should return expected success state', () => {
				const action = {type: C.FETCH_TICKETS_SUCCESS}
				const list = []
				const stops = []
				const _fetch = fetch(action)
				const state = {
					list,
					stops
				}
				const startTicketsState = tickets(
					state,
					action
				)
				expect(startTicketsState)
					.toEqual({
						list,
						stops,
						fetch: _fetch
					})
			})
			it('Should return expected error state', () => {
				const action = {type: C.FETCH_TICKETS_ERROR}
				const list = []
				const stops = []
				const _fetch = fetch(action)
				const state = {
					list,
					stops
				}
				const startTicketsState = tickets(
					state,
					action
				)
				expect(startTicketsState)
					.toEqual({
						list,
						stops,
						fetch: _fetch
					})
			})
		})
		describe('Set tickets', () => {
			it('Should return expected state with tivkets and stops list', () => {
				const action = {
					type: C.SET_TICKETS,
					tickets: global.tickets
				}
				const list = global.tickets
				const stops = getStopsFromTickets(global.tickets)
				const _fetch = successFetchState()

				const setTicketsResult = tickets({
					list: [],
					stops: [],
					fetch: _fetch
				}, action)

				expect(setTicketsResult)
					.toEqual({
						list,
						stops,
						fetch: _fetch
					})
			})
		})
	})
	describe('Stops filter', () => {
		describe('Filter by stops', () => {
			it('Should return expected default state', () => {
				const stopsFilterResult = stopsFilter()
				expect(stopsFilterResult)
					.toEqual([])
			})
			it('Should add stop on it checked', () => {
				const state = [0,1,2]
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: 3,
					checked: true
				}
				const stopsFilterResult = stopsFilter(action, state)
				expect(stopsFilterResult)
					.toEqual(expect.arrayContaining([0,1,2,3]))
			})
			it('Should add stops on it checked', () => {
				const state = [0,1,2]
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: [3,4,5],
					checked: true
				}
				const stopsFilterResult = stopsFilter(action, state)
				expect(stopsFilterResult)
					.toEqual(expect.arrayContaining([0,1,2,3,4,5]))
			})
			it('It Should not add stop on it unchecked', () => {
				const state = [0,1,2]
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: 3,
					checked: false
				}
				const stopsFilterResult = stopsFilter(action, state)
				expect(stopsFilterResult)
					.toEqual(expect.arrayContaining(state))
			})
			it('It Should not add stops on it unchecked', () => {
				const state = [0,1,2]
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: [3,4,5],
					checked: false
				}
				const stopsFilterResult = stopsFilter(action, state)
				expect(stopsFilterResult)
					.toEqual(expect.arrayContaining(state))
			})
			it('It Should filter stop on it unchecked', () => {
				const state = [0,1,2,3]
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: 3,
					checked: false
				}
				const stopsFilterResult = stopsFilter(action, state)
				expect(stopsFilterResult)
					.toEqual(expect.arrayContaining([0,1,2]))
			})
			it('It Should filter stops on it unchecked', () => {
				const state = [0,1,2,3,4,5]
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: [1,3,5],
					checked: false
				}
				const stopsFilterResult = stopsFilter(action, state)
				expect(stopsFilterResult)
					.toEqual(expect.arrayContaining([0,2,4]))
			})
		})
		describe('Filter by default stops', () => {
			it('Should return expected default stops', () => {
				const action = {
					type: C.FILTER_BY_DEFAULT_STOPS
				}
				const defaultStopsFilterResult = stopsFilter(action)
				expect(defaultStopsFilterResult)
					.toEqual([0,1,2])
			})
		})
		describe('Filter by only stops', () => {
			it('Should return stops state with only passed stop', () => {
				const state = [0,1,2,3,4,5]
				const action = {
					type: C.FILTER_BY_ONLY_STOPS,
					stops: 0
				}
				const onlyStopsResult = stopsFilter(action, state)
				expect(onlyStopsResult)
					.not
					.toEqual(expect.arrayContaining([1,2,3,4,5]))
			})
			it('Should return stops state with only passed stops', () => {
				const state = [0,1,2,3,4,5]
				const action = {
					type: C.FILTER_BY_ONLY_STOPS,
					stops: [0,1]
				}
				const onlyStopsResult = stopsFilter(action, state)
				expect(onlyStopsResult)
					.not
					.toEqual(expect.arrayContaining([2,3,4,5]))
			})
		})
		describe('Filter by all stops', () => {
			it('Should return all acceptable stops when checked', () => {
				const action = {
					type: C.FILTER_BY_ALL_STOPS,
					stops: [0,1,2,3,4,5],
					checked: true
				}
				const allStopsResult = stopsFilter(action)
				expect(allStopsResult)
					.toEqual(expect.arrayContaining([0,1,2,3,4,5]))
			})
			it('Should return empty array when unchecked', () => {
				const action = {
					type: C.FILTER_BY_ALL_STOPS,
					stops: [0,1,2,3,4,5],
					checked: false
				}
				const allStopsResult = stopsFilter(action)
				expect(allStopsResult)
					.toEqual([])
			})
		})
	})
	describe('Filters', () => {
		describe('Filter by stops', () => {
			it('Should return expected default state', () => {
				const state = {
					filters: {
						stops: []
					}
				}
				const defaultFiltersState = filters(state)
				expect(expect.objectContaining(defaultFiltersState))
					.toEqual(state)
			})
			it('Should add stop to stops in filter state when checked', () => {
				const state = {
					foo: 'foo',
					stops: [0,1,2]
				}
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: 3,
					checked: true
				}
				const stopsFilterResult = filters(state, action)
				expect(expect.objectContaining(stopsFilterResult))
					.toEqual({
						foo: 'foo',
						stops: [0,1,2,3]
					})
			})
			it('Should add stop to stops in filter state when checked', () => {
				const state = {
					foo: 'foo',
					stops: [0,1,2]
				}
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: [3,4,5],
					checked: true
				}
				const stopsFilterResult = filters(state, action)
				expect(expect.objectContaining(stopsFilterResult))
					.toEqual({
						foo: 'foo',
						stops: [0,1,2,3,4,5]
					})
			})
			it('Should filter stop at stops in filter state when unchecked', () => {
				const state = {
					foo: 'foo',
					stops: [0,1,2,3]
				}
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: 3,
					checked: false
				}
				const stopsFilterResult = filters(state, action)
				expect(expect.objectContaining(stopsFilterResult))
					.toEqual({
						foo: 'foo',
						stops: [0,1,2]
					})
			})
			it('Should filter stops at stops in filter state when unchecked', () => {
				const state = {
					foo: 'foo',
					stops: [0,1,2,3,4,5]
				}
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: [3,4,5],
					checked: false
				}
				const stopsFilterResult = filters(state, action)
				expect(expect.objectContaining(stopsFilterResult))
					.toEqual({
						foo: 'foo',
						stops: [0,1,2]
					})
			})
			it('Should sort the stop numbers in ascending order.', () => {
				const state = {
					foo: 'foo',
					stops: [2,0,1]
				}
				const action = {
					type: C.FILTER_BY_STOPS,
					stops: [4,5,3],
					checked: true
				}
				const stopsFilterResult = filters(state, action)
				expect(stopsFilterResult.stops)
					.toEqual([0,1,2,3,4,5])
			})
		})
		describe('Filter by default stops', () => {
			it('Should return expected default stops', () => {
				const state = {
					foo: 'foo',
					stops: [3,4,5,6]
				}
				const action = {
					type: C.FILTER_BY_DEFAULT_STOPS
				}
				const defaultStopsFilterResult = filters(state, action)
				expect(defaultStopsFilterResult)
					.toEqual({
						foo: 'foo',
						stops: [0,1,2]
					})
			})
		})
		describe('Filter by only stops', () => {
			it('Should return stops state with only passed stop', () => {
				const state = {
					foo: 'foo',
					stops: [1,2,3,4,5]
				}
				const action = {
					type: C.FILTER_BY_ONLY_STOPS,
					stops: 0
				}
				const onlyStopsResult = filters(state, action)
				expect(onlyStopsResult)
					.toEqual({
						foo: 'foo',
						stops: [0]
					})
			})
			it('Should return stops state with only passed stops', () => {
				const state = {
					foo: 'foo',
					stops: [1,2,3,4,5]
				}
				const action = {
					type: C.FILTER_BY_ONLY_STOPS,
					stops: [0,1,2]
				}
				const onlyStopsResult = filters(state, action)
				expect(onlyStopsResult)
					.toEqual({
						foo: 'foo',
						stops: [0,1,2]
					})
			})
		})
		describe('Filter by all stops', () => {
			it('Should return all acceptable stops when checked', () => {
				const state = {
					foo: 'foo',
					stops: [0,1,2]
				}
				const action = {
					type: C.FILTER_BY_ALL_STOPS,
					stops: [0,1,2,3,4,5],
					checked: true
				}
				const allStopsResult = filters(state, action)
				expect(allStopsResult)
					.toEqual({
						foo: 'foo',
						stops: [0,1,2,3,4,5]
					})
			})
			it('Should return empty array when unchecked', () => {
				const state = {
					foo: 'foo',
					stops: [0,1,2]
				}
				const action = {
					type: C.FILTER_BY_ALL_STOPS,
					stops: [0,1,2,3,4,5],
					checked: false
				}
				const allStopsResult = filters(state, action)
				expect(allStopsResult)
					.toEqual({
						foo: 'foo',
						stops: []
					})
			})
		})
	})
	describe('Currencies', () => {
		it('Should return expected default state', () => {
			const rates = currencyRates()
			const base = baseСurrency()
			const fetch = dafaultFetchState()
			const defaultCurrenciesState = currencies()
			expect(defaultCurrenciesState)
				.toEqual({
					rates,
					base,
					fetch
				})
		})
		describe('Fetch', () => {
			it('Should return expected start state', () => {
				const action = {
					type: C.FETCH_CURRENCY_START
				}
				const _fetch = fetch(action)
				const rates = currencyRates()
				const base = baseСurrency()
				const state = {
					rates,
					base,
					fetch: _fetch
				}
				const startCurrenciesState = currencies(state, action)
				expect(startCurrenciesState)
					.toEqual({
						...state,
						fetch: _fetch
					})
			})
			it('Should return expected success state', () => {
				const action = {
					type: C.FETCH_CURRENCY_SUCCESS
				}
				const _fetch = fetch(action)
				const rates = currencyRates()
				const base = baseСurrency()
				const state = {
					rates,
					base,
					fetch: _fetch
				}
				const successCurrenciesState = currencies(state, action)
				expect(successCurrenciesState)
					.toEqual({
						...state,
						fetch: _fetch
					})
			})
			it('Should return expected error state', () => {
				const action = {
					type: C.FETCH_CURRENCY_ERROR
				}
				const _fetch = fetch(action)
				const rates = currencyRates()
				const base = baseСurrency()
				const state = {
					rates,
					base,
					fetch: _fetch
				}
				const errorCurrenciesState = currencies(state, action)
				expect(errorCurrenciesState)
					.toEqual({
						...state,
						fetch: _fetch
					})
			})
		})
		describe('Set', () => {
			it('Should return expected state with default base currency', () => {
				const action = {
					type: C.SET_DEFAULT_CURRENCY
				}
				const state = {
					foo: 'foo'
				}
				const base = baseСurrency(action)
				const defaultCurrenciesState = currencies(state, action)
				expect(defaultCurrenciesState)
					.toEqual({
						...state,
						base
					})
			})
			it('Should return expected state with base currency', () => {
				const action = {
					type: C.SET_BASE_CURRENCY,
					base: 'USD'
				}
				const state = {
					foo: 'foo'
				}
				const base = baseСurrency(action)
				const baseCurrenciesState = currencies(state, action)
				expect(baseCurrenciesState)
					.toEqual({
						...state,
						base: 'USD'
					})
			})
		})
		describe('Rates', () => {
			describe('Set', () => {
				it('Should return state with default currency rates', () => {
					const action = {}
					const state = {
						foo: 'foo'
					}
					const currenciesWithDefaultRates = currencies(state, action)
					expect(currenciesWithDefaultRates)
						.toEqual({
							...state
						})
				})
				it('Should return expected state with currency rates', () => {
					const rates = {
						USD: 0.0148805739,
						EUR: 0.0129768674
					}
					const action = {
						type: C.SET_CURRENCY_RATES,
						rates
					}
					const state = {
						foo: 'foo'
					}
					const currenciesSetedRates = currencies(state, action)
					expect(currenciesSetedRates)
						.toEqual({
							...state,
							rates
						})
				})
			})
		})
	})
	describe('Modificators', () => {
		it('Should return expected default state', () => {
			// state = {currencies: currencyModifiers()}, action
			const currency = currencyModifier()
			const list = currencyModifiersList()
			const state = {
				currencies: {
					currency,
					list
				}
			}
			const defaultModificatorsState = modificators()
			expect(defaultModificatorsState)
				.toEqual(state)
		})
		describe('Currency modifier', () => {
			it('Should return default currency modifier', () => {
				const _currency = baseСurrency()
				const defaultCurrencyModifierResult = currencyModifier()
				expect(defaultCurrencyModifierResult)
					.toEqual(_currency)
			})
			it('Should return expected base currency', () => {
				const action = {
					type: C.SET_CURRENCY_MODIFIER,
					currency: 'USD'
				}
				const currencyModifierResult = currencyModifier(action)
				expect(currencyModifierResult)
					.toEqual('USD')
			})
		})
		// describe('Currency modifiers list', () => {
		// 	it('Should return currencies default list state', () => {
		// 		currencyModifiersList
		// 	})
		// 	describe('Set list', () => {
				
		// 	})
		// })
	})
})