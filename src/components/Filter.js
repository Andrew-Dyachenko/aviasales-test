import React from 'react'
import propTypes from 'prop-types'
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
	children: propTypes.oneOfType([
		propTypes.arrayOf(propTypes.node),
		propTypes.node,
		propTypes.string
	]),
	onFilter: propTypes.func
}

export default Filter
