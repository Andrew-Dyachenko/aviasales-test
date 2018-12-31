import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Filter.scss'

const Filter = ({ children }) =>
	<div className='filter'>
		{ children }
	</div>

Filter.defaultProps = {
	children: null
}

Filter.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string
	])
}

export default Filter
