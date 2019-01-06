export const sortArrayByNumeric = (array, direction = 'ascending') => {
	switch(direction) {
		case 'ascending':
			return [...array].sort((a, b) => a - b)

		case 'descending':
			return [...array].sort((a, b) => b - a)

		default:
			return array
	}
}
