import CurrencySymbol from '../../components/UI/CurrencySymbol'
const { shallow } = global.Enzyme

describe('<CurrencySymbol /> UI Component', () => {
	it('Should return RUB symbol by default', () => {
		const currencySymbolResult = shallow(<CurrencySymbol/>)
		expect(currencySymbolResult.text())
			.toEqual('₽')
	})
	it('Should return USD symbol', () => {
		const currencySymbolResult = shallow(<CurrencySymbol currency='USD'/>)
		expect(currencySymbolResult.text())
			.toEqual('$')
	})
	it('Should return EUR symbol', () => {
		const currencySymbolResult = shallow(<CurrencySymbol currency='EUR'/>)
		expect(currencySymbolResult.text())
			.toEqual('€')
	})
})
