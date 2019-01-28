import CurrencySymbol from '../../components/UI/CurrencySymbol'
const { shallow } = Enzyme

describe('<CurrencySymbol /> UI Component', () => {
	it('Should return expected default result', () => {
		const currencySymbolResult = shallow(<CurrencySymbol/>)
		expect(currencySymbolResult)
			.toEqual('₽')
	})
})
