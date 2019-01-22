import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const char = ({ currency }) => {
	switch(currency) {
		case 'RUB':
			return '₽'

		case 'USD':
			return '$'

		case 'EUR':
			return '€'

		default:
			return '₽'
	}
}
const CurrencySymbol = currency => {
	const charSymbol = char(currency)
	return (
		<Fragment>
			{
				charSymbol
			}
		</Fragment>
	)
}

CurrencySymbol.propTypes = {
	currency: PropTypes.string
}

CurrencySymbol.defaultProps = {
	currency: 'RUB'
}

export default CurrencySymbol
