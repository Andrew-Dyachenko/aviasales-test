import dddCapitalize from '../../helpers/dddCapitalize'

describe('dddCapitalize', () => {
	it('Should return default value', () => {
		const dddCapitalizeResult = dddCapitalize()
		expect(dddCapitalizeResult)
			.toBe(undefined)
	})
	it('Should capitalize russian ddd week', () => {
		const date = '12 мая 2018, пт'
		const capitalizedDate = dddCapitalize(date)
		expect(capitalizedDate)
			.toBe('12 мая 2018, Пт')
	})
})
