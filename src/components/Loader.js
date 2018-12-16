import React from 'react'
import PropTypes from 'prop-types'
import './Loader.scss'

const Loader = ({children}) =>
	<div className="loader">
		<div className="loader__text">
			{children}
		</div>
	</div>

Loader.defaultProps = {
	children: 'Loading'
}

Loader.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string
	])
}

export default Loader
