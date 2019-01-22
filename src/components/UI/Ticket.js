import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Ticket.scss'
import CurrencySymbol from './CurrencySymbol'

const Ticket = ({ price, currency, currencies }) => {
	const { rates } = currencies
	return (
		<div className='ticket'>
			<div className='ticket__action-col'>
				<button type='button' className='ticket__buy'>
					<div className='ticket__buy-text'>
						Купить
					</div>
					<div className='ticket__price'>
						<div className='ticket__price-inner'>
							<div className='ticket__price-currency'>
								<CurrencySymbol currency={currency} />
							</div>
							<div className='ticket__price-value'>
								за { (price * (rates[currency] ? rates[currency] : 1)).toFixed(2) }
							</div>
						</div>
					</div>
				</button>
			</div>
			<div className='ticket__content'>
			</div>
		</div>
	)
}

Ticket.propTypes = {
	price: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	currency: PropTypes.string,
	currencies: PropTypes.object
}

Ticket.defaultProps = {
	price: 0,
	currency: 'RUB',
	currencies: {RUB: 1}
}

export default Ticket
