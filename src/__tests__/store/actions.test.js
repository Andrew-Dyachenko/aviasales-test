import C from '../../store/constants'
import {
	fetchTicketsStart,
	fetchTicketsSuccess,
	fetchTicketsError,
	setTickets,
	filterByStops,
	filterByOnlyStops,
	filterByDefaultStops,
	filterByAllStops } from '../../store/actions'

import tickets from '../../../public/tickets'

describe('Action Creators', () => {
	describe('Fetch tickets action creators', () => {
		describe('Start action creator', () => {
			it('Should return start action object', () => {
				const result = fetchTicketsStart()
				expect(result)
					.toEqual({
						type: C.FETCH_TICKETS_START
					})
			})
		})
		describe('Success action creator', () => {
			it('Should return success action object', () => {
				const result = fetchTicketsSuccess()
				expect(result)
					.toEqual({
						type: C.FETCH_TICKETS_SUCCESS
					})
			})
		})
		describe('Error action creator', () => {
			it('Should return error action object', () => {
				const result = fetchTicketsError()
				expect(result)
					.toEqual({
						type: C.FETCH_TICKETS_ERROR
					})
			})
		})
	})
	describe('Set tickets action', () => {
		it('Should return plain action object', () => {
			const setTicketsAction = setTickets(tickets)
			expect(setTicketsAction)
				.toEqual({
					type: C.SET_TICKETS,
					tickets
				})
		})
	})
	describe('Filter actions', () => {
		describe('Filter by stops action', () => {
			it('Should return action object with correct type', () => {
				const filterByStopsAction = filterByStops()
				expect(filterByStopsAction.type)
					.toEqual(C.FILTER_BY_STOPS)
			})
			it('Should return epmty stops by default', () => {
				const filterByStopsAction = filterByStops()
				expect(filterByStopsAction.stops)
					.toEqual([])
			})
			it('Should return checked false by default', () => {
				const filterByStopsAction = filterByStops()
				expect(filterByStopsAction.checked)
					.toBeFalsy()
			})
			it('Should return plain action object with stops of array', () => {
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
			it('Should return plain action object with stop number', () => {
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
		describe('Filter by only stops action', () => {
			it('Should return action object with correct type', () => {
				const filterByOnlyStopsAction = filterByOnlyStops()
				expect(filterByOnlyStopsAction.type)
					.toEqual(C.FILTER_BY_ONLY_STOPS)
			})
			it('Should return epmty stops by default', () => {
				const filterByOnlyStopsAction = filterByOnlyStops()
				expect(filterByOnlyStopsAction.stops)
					.toEqual([])
			})
			it('Should return plain action object with stops of array', () => {
				const stops = [0,1,2,3]
				const filterByOnlyStopsAction = filterByOnlyStops(stops)
				expect(filterByOnlyStopsAction)
					.toEqual({
						type: C.FILTER_BY_ONLY_STOPS,
						stops
					})
			})
			it('Should return plain action object with stop number', () => {
				const stops = 0
				const filterByOnlyStopsAction = filterByOnlyStops(stops)
				expect(filterByOnlyStopsAction)
					.toEqual({
						type: C.FILTER_BY_ONLY_STOPS,
						stops
					})
			})
		})
		describe('Filter by default stops action', () => {
			it('Should return action object with correct type', () => {
				const filterByDefaultStopsAction = filterByDefaultStops()
				expect(filterByDefaultStopsAction)
					.toEqual({type: C.FILTER_BY_DEFAULT_STOPS })
			})
		})
		describe('Filter by all stops action', () => {
			it('Should return action object with correct type', () => {
				const filterByAllStopsAction = filterByAllStops()
				expect(filterByAllStopsAction.type)
					.toEqual(C.FILTER_BY_ALL_STOPS)
			})
			it('Should return epmty stops by default', () => {
				const filterByAllStopsAction = filterByAllStops()
				expect(filterByAllStopsAction.stops)
					.toEqual([])
			})
			it('Should return checked false by default', () => {
				const filterByAllStopsAction = filterByAllStops()
				expect(filterByAllStopsAction.checked)
					.toBeFalsy()
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
})