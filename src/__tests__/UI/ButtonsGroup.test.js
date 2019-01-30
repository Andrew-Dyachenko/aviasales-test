import ButtonsGroup from '../../components/UI/ButtonsGroup'

const { shallow, mount } = global.Enzyme

describe('ButtonsGroup', () => {
	const buttons = [
		{ text: 'btn 1', defaultChecked: true, disabled: false },
		{ text: 'btn 2', defaultChecked: false, disabled: false },
		{ text: 'btn 3', defaultChecked: false, disabled: false }
	]
	let _onCheck = jest.fn()
	afterEach(() => jest.resetAllMocks())
	describe('Render UI', () => {
		it('Not renders div.buttons-group__title when title variable is undefined', () => {
			expect(shallow(<ButtonsGroup />).find('div.buttons-group__title').length)
				.toBe(0)
		})
	})
	describe('Change currency', () => {
		beforeAll(() => {
			mount(<ButtonsGroup buttons={buttons} onCheck={_onCheck} />)
				.find('input.buttons-group__input')
				.last()
				.simulate('change')
		})
		it('Invokes onChange', () => {
			expect(_onCheck).toBeCalled()
		})
	})
	describe('Check default props', () => {
		let wrapper
		beforeAll(() => {
			wrapper = mount(<ButtonsGroup buttons={buttons}/>)
				.find('input.buttons-group__input')
				.last()
				.simulate('change')
		})
		it('Invokes onChange', () => {
			expect(wrapper.props().onCheck)
				.toBe(undefined)
		})
	})
})
