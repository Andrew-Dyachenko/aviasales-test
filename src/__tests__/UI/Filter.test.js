import Filter from '../../components/UI/Filter'
const { shallow } = global.Enzyme

describe('<Filter /> UI Component', () => {
	it('Renders default filter', () => {
		expect(shallow(<Filter />).find('div.filter').length)
			.toBe(1)
	})
	it('Renders children', () => {
		expect(
			shallow(
				<Filter>
					<div className='filter__child-content'/>
					<div className='filter__child-content'/>
					<div className='filter__child-content'/>
				</Filter>
			).find('div.filter__child-content').length
		).toBe(3)
	})
})
