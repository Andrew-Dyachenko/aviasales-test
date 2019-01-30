import Modificator from '../../components/UI/Modificator'

const { React } = global
const { shallow } = global.Enzyme

describe('<Modificator /> UI Component', () => {
	it('Renders default modificator', () => {
		expect(shallow(<Modificator />).find('div.modificator__children').length)
			.toBe(1)
	})
	it('Renders children', () => {
		expect(
			shallow(
				<Modificator>
					<div className='modificator__child'/>
					<div className='modificator__child'/>
					<div className='modificator__child'/>
				</Modificator>
			).find('div.modificator__child').length
		).toBe(3)
	})
})
