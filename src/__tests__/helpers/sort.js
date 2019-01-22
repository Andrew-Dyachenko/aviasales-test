import { sortArrayByNumeric } from '../../helpers/sort'

describe('Sort functions', () => {
	it('Should return ascending array by default', () => {
		const arr = [1,0,3,2,5,4]
		const result = sortArrayByNumeric(arr)
		expect(result)
			.toEqual([0,1,2,3,4,5])
	})
	it('Should return ascending array', () => {
		const arr = [1,0,3,2,5,4]
		const result = sortArrayByNumeric(arr, 'ascending')
		expect(result)
			.toEqual([0,1,2,3,4,5])
	})
	it('Should return descending array', () => {
		const arr = [1,0,3,2,5,4]
		const result = sortArrayByNumeric(arr, 'descending')
		expect(result)
			.toEqual([5,4,3,2,1,0])
	})
})
