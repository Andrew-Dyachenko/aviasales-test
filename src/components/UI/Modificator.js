/*eslint no-console: 0*/
import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Modificator.scss'

const Modificator = ({ children }) =>
	Array.isArray(children) ?
		children.map((child, index) =>
			<div key={index} className='modificator__children'>
				{ child }
			</div>
		) :
		<div className='modificator__children'>
			{ children }
		</div>

Modificator.defaultProps = {
	children: null
}

Modificator.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.object
	])
}

export default Modificator
