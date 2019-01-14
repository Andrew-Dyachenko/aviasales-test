import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Filter.scss'

const Filter = ({ children }) =>
	Array.isArray(children) ?
		children.map((child, index) =>
			<div key={index} className='filter__child'>
				{ child }
			</div>
		) :
		<div className='filter__child'>
			{ children }
		</div>

Filter.defaultProps = {
	children: null
}

Filter.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.object
	])
}

export default Filter
