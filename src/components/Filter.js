import React from 'react'
import PropTypes from 'prop-types'
import './Filter.scss'

const Filter = ({ children, onFilter }) =>
	<form className='filter' onSubmit={onFilter}>
		{ children }
	</form>

Filter.defaultProps = {
	children: null,
	onFilter: f => f
}

Filter.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string
	]),
	onFilter: PropTypes.func
}

export default Filter
