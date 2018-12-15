import React from 'react'
import PropTypes from 'prop-types'
import './Header.scss'

const Header = ({ children, logo }) =>
	<header className='header'>
		<a href='https://www.aviasales.ru/' className='header__logo'>
			<img src={logo} className='header__logo-img' alt='Logo'/>
		</a>
		{
			children ?
				<div className='header__content'>
					{children}
				</div> :
				null
		}
	</header>

Header.defaultProps = {
	children: null,
	logo: ''
}

Header.propTypes = {
	children: PropTypes.string || PropTypes.element,
	logo: PropTypes.string
}

export default Header
