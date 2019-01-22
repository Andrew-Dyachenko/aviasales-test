import getStopsFromTickets from '../../helpers/getStops'
import tickets from '../../../public/tickets'

describe('Get stops array from tickets array of objects', () => {
	it('Should return array of numbers from array of objects', () => {
		const stops = getStopsFromTickets(tickets)
		expect(stops)
			.toEqual([0,1,2,3])
	})
})