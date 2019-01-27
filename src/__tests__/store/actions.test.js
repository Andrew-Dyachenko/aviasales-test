import C from '../../store/constants'
import {
	fetchTicketsStart,
	fetchTicketsSuccess,
	fetchTicketsError,
	setTickets,
	filterByStops,
	filterByOnlyStops,
	filterByDefaultStops,
	filterByAllStops,
	fetchCurrencyStart,
	fetchCurrencySuccess,
	fetchCurrencyError,
	setCurrencyRates,
	setDefaultCurrency,
	setbaseCurrency,
	addCurrencyModifier,
	removeCurrencyModifiers,
	setCurrencyModifier,
	setCurrencyModifiers,
	setScrollDimensions,
	setWindowDimensions } from '../../store/actions'

import tickets from '../../../public/tickets'
import { rates } from '../../../public/currency'

describe('Action Creators', () => {

	// Fetch

	describe('Fetch', () => {
		describe('Tickets', () => {
			describe('Start action', () => {
				it('Should return start action object', () => {
					const result = fetchTicketsStart()
					expect(result)
						.toEqual({
							type: C.FETCH_TICKETS_START
						})
				})
			})
			describe('Success action', () => {
				it('Should return success action object', () => {
					const result = fetchTicketsSuccess()
					expect(result)
						.toEqual({
							type: C.FETCH_TICKETS_SUCCESS
						})
				})
			})
			describe('Error action', () => {
				it('Should return error action object', () => {
					const result = fetchTicketsError()
					expect(result)
						.toEqual({
							type: C.FETCH_TICKETS_ERROR
						})
				})
			})
		})
		describe('Currencies', () => {
			describe('Start action', () => {
				it('Should return start action object', () => {
					const fetchCurrencyStartAction = fetchCurrencyStart()
					expect(fetchCurrencyStartAction)
						.toEqual({
							type: C.FETCH_CURRENCY_START
						})
				})
			})
			describe('Success action', () => {
				it('Should return success action object', () => {
					const fetchCurrencySuccessAction = fetchCurrencySuccess()
					expect(fetchCurrencySuccessAction)
						.toEqual({
							type: C.FETCH_CURRENCY_SUCCESS
						})
				})
			})
			describe('Error action', () => {
				it('Should return error action object', () => {
					const fetchCurrencyErrorAction = fetchCurrencyError()
					expect(fetchCurrencyErrorAction)
						.toEqual({
							type: C.FETCH_CURRENCY_ERROR
						})
				})
			})
		})
	})

	// Tickets

	describe('Tickets', () => {
		describe('Set tickets', () => {
			it('Should return plain object', () => {
				const setTicketsAction = setTickets(tickets)
				expect(setTicketsAction)
					.toEqual({
						type: C.SET_TICKETS,
						tickets
					})
			})
		})
	})

	// Filters

	describe('Filters', () => {
		describe('Stops', () => {
			it('Should return action object with correct type', () => {
				const filterByStopsAction = filterByStops()
				expect(filterByStopsAction.type)
					.toEqual(C.FILTER_BY_STOPS)
			})
			it('Should return plain object with stops of array', () => {
				const stops = [0,1,2,3]
				const checked = true
				const filterByStopsAction = filterByStops(stops, checked)
				expect(filterByStopsAction)
					.toEqual({
						type: C.FILTER_BY_STOPS,
						stops,
						checked
					})
			})
			it('Should return plain object with stop number', () => {
				const stops = 0
				const checked = true
				const filterByStopsAction = filterByStops(stops, checked)
				expect(filterByStopsAction)
					.toEqual({
						type: C.FILTER_BY_STOPS,
						stops,
						checked
					})
			})
		})
		describe('Filter by only stops', () => {
			it('Should return action object with correct type', () => {
				const filterByOnlyStopsAction = filterByOnlyStops()
				expect(filterByOnlyStopsAction.type)
					.toEqual(C.FILTER_BY_ONLY_STOPS)
			})
			it('Should return plain object with stops of array', () => {
				const stops = [0,1,2,3]
				const filterByOnlyStopsAction = filterByOnlyStops(stops)
				expect(filterByOnlyStopsAction)
					.toEqual({
						type: C.FILTER_BY_ONLY_STOPS,
						stops
					})
			})
			it('Should return plain object with stop number', () => {
				const stops = 0
				const filterByOnlyStopsAction = filterByOnlyStops(stops)
				expect(filterByOnlyStopsAction)
					.toEqual({
						type: C.FILTER_BY_ONLY_STOPS,
						stops
					})
			})
		})
		describe('Filter by default stops', () => {
			it('Should return action object with correct type', () => {
				const filterByDefaultStopsAction = filterByDefaultStops()
				expect(filterByDefaultStopsAction)
					.toEqual({type: C.FILTER_BY_DEFAULT_STOPS })
			})
		})
		describe('Filter by all stops', () => {
			it('Should return action object with correct type', () => {
				const filterByAllStopsAction = filterByAllStops()
				expect(filterByAllStopsAction.type)
					.toEqual(C.FILTER_BY_ALL_STOPS)
			})
			it('Should return plain action object with stops of array', () => {
				const checked = true
				const stops = [0,1,2,3]
				const filterByAllStopsAction = filterByAllStops(stops, checked)
				expect(filterByAllStopsAction)
					.toEqual({
						type: C.FILTER_BY_ALL_STOPS,
						stops,
						checked
					})
			})
			it('Should return plain action object with stop of number', () => {
				const checked = true
				const stops = 0
				const filterByAllStopsAction = filterByAllStops(stops, checked)
				expect(filterByAllStopsAction)
					.toEqual({
						type: C.FILTER_BY_ALL_STOPS,
						stops,
						checked
					})
			})
		})
	})

	// Currencies

	describe('Currencies', () => {
		describe('Currency rates', () => {
			describe('Set currency rates', () => {
				it('Should return correct plain action object', () => {
					const setCurrencyRatesAction = setCurrencyRates(rates)
					expect(setCurrencyRatesAction)
						.toEqual({
							type: C.SET_CURRENCY_RATES,
							rates
						})
				})
			})
			describe('Set default currency rates', () => {
				it('Should return action object with correct type', () => {
					const setDefaultCurrencyAction = setDefaultCurrency()
					expect(setDefaultCurrencyAction)
						.toEqual({type: C.SET_DEFAULT_CURRENCY})
				})
			})
			describe('Set base currency', () => {
				it('Should return action object with base currensy as string', () => {
					const base = 'RUB'
					const setbaseCurrencyAction = setbaseCurrency(base)
					expect(setbaseCurrencyAction)
						.toEqual({
							type: C.SET_BASE_CURRENCY,
							base
						})
				})
			})
		})
	})

	// Modifiers

	describe('Modifiers', () => {
		describe('Currencies', () => {
			describe('Add currency', () => {
				it('Should return action object with added curency as string', () => {
					const currency = 'USD'
					const addCurrencyModifierAction = addCurrencyModifier(currency)
					expect(addCurrencyModifierAction)
						.toEqual({
							type: C.ADD_CURRENCY_MODIFIER,
							currency
						})
				})
			})
			describe('Remove currency', () => {
				it('Should return action object with removing curency as string', () => {
					const currency = 'USD'
					const removeCurrencyModifiersAction = removeCurrencyModifiers(currency)
					expect(removeCurrencyModifiersAction)
						.toEqual({
							type: C.REMOVE_CURRENCY_MODIFIER,
							currency
						})
				})
			})
			describe('Set currencies', () => {
				it('Should return action object with seting curencies as string', () => {
					const currency = 'USD'
					const setCurrencyModifierAction = setCurrencyModifier(currency)
					expect(setCurrencyModifierAction)
						.toEqual({
							type: C.SET_CURRENCY_MODIFIER,
							currency
						})
				})
				it('Should return action object with seting curencies as array', () => {
					const currencies = ['USD', 'EUR']
					const setCurrencyModifiersAction = setCurrencyModifiers(currencies)
					expect(setCurrencyModifiersAction)
						.toEqual({
							type: C.SET_CURRENCY_MODIFIERS,
							currencies
						})
				})
			})
		})
	})

	// Dimensions

	describe('Dimensions', () => {
		describe('Scroll dimensions', () => {
			it('Should return action object with correct type', () => {
				const dimensions = {
					scroll: {
						scrollWidth: {
							scrollbarHeight: 0,
							scrollbarWidth: 0
						}
					}
				}

				const setScrollDimensionsAction = setScrollDimensions(dimensions)
					expect(setScrollDimensionsAction)
						.toEqual({
							type: C.SET_SCROLL_DIAMENTIONS,
							dimensions
						})
			})
		})

		describe('Window dimensions', () => {
			it('Should return action object with correct type', () => {
				const dimensions = {
					scroll: {
						window: {
							innerWidth: 0
						}
					}
				}

				const setWindowDimensionsAction = setWindowDimensions(dimensions)
					expect(setWindowDimensionsAction)
						.toEqual({
							type: C.SET_WINDOW_DIAMENTIONS,
							dimensions
						})
			})
		})
	})
})