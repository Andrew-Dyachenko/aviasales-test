import getStopsFromTickets from '../../helpers/getStops'

describe('Get stops from tickets array of objects', () => {
	it('Should return array of numbers from array of objects', () => {
		const stops = getStopsFromTickets(global.tickets)
		expect(stops)
			.toEqual([0,1,2,3])
	})
})
