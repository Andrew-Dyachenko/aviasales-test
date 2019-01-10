import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Modificator.scss'

const Modificator = ({ children }) =>
	<div className='Modificator'>
		{ children }
	</div>

Modificator.defaultProps = {
	children: null
}

Modificator.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string
	])
}

export default Modificator
