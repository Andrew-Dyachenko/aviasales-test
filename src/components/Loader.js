import React from 'react'
import PropTypes from 'prop-types'
import './Loader.css'

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
	children: PropTypes.string || PropTypes.element
}

export default Loader
