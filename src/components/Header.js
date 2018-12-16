import React from 'react'
import PropTypes from 'prop-types'
import './Header.scss'

const Header = ({ children, logo, mixin }) => {
	const className = mixin ?
		`header ${mixin}` :
		'header'
	return (
		<header className={className}>
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
	)
}

Header.defaultProps = {
	children: null,
	logo: '',
	mixin: ''
}

Header.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string
	]),
	logo: PropTypes.string,
	mixin: PropTypes.string
}

export default Header
