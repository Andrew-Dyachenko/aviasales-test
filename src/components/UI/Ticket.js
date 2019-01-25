/*eslint no-console: 0*/
import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Ticket.scss'
import CurrencySymbol from './CurrencySymbol'
import pluralize from 'pluralize-ru'
import Moment from 'react-moment'
import 'moment/locale/ru'
import logo from '../../assets/images/turkish-airlines-logo.svg'

const dddCapitalize = ddd =>
	ddd.replace(/(пн|вт|ср|чт|пт|сб|вс)$/g, string =>
		string.charAt(0).toUpperCase() + string.slice(1))

const Ticket = ({
	mixin,
	price,
	currency,
	currencies,
	departure_time,
	arrival_time,
	stops,
	origin,
	origin_name,
	destination,
	destination_name,
	arrival_date,
	departure_date }) => {
	const { rates } = currencies
	const stopsText = isFinite(stops)
		? pluralize(stops, '', '%d остановка', '%d остановки', '%d остановок')
		: ''
	// const dateToFormat = '1976-04-19T12:59-0500'
	return (
		<div className={mixin ? `ticket ${mixin}` : 'ticket'}>
			<div className='ticket__col ticket__col--content'>
				<div className='ticket__media'>
					<img src={logo} className='ticket__media-img' width='120' height='35' alt='Ticket logo' />
				</div>
				<div className='ticket__segment'>
					<div className='ticket__route ticket__route--head'>
						<div className='ticket__origin'>
							<div className='ticket__time'>
								{ departure_time }
							</div>
						</div>
						<div className='ticket__path'>
							<div className='ticket__path-stops'>
								{ stopsText }
							</div>
							<div className='ticket__path-canvas'></div>
						</div>
						<div className='ticket__destination'>
							<div className='ticket__time'>
								{ arrival_time }
							</div>
						</div>
					</div>
					<div className='ticket__route ticket__route--body'>
						<div className='ticket__origin'>
							<div className='ticket__location'>
								{ origin }, { origin_name }
							</div>
							<div className='ticket__date'>
								<Moment
									parse='DD.MM.YY'
									format='D MMM YYYY, ddd'
									locale='ru'
									filter={dddCapitalize}>
									{departure_date}
								</Moment>
							</div>
						</div>
						<div className='ticket__destination'>
							<div className='ticket__location'>
								{ destination_name }, { destination }
							</div>
							<div className='ticket__date' align='right'>
								<Moment
									parse='DD.MM.YY'
									format='D MMM YYYY, ddd'
									locale='ru'
									filter={dddCapitalize}>
									{ arrival_date }
								</Moment>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='ticket__col ticket__col--action'>
				<div className='ticket__media'>
					<img src={logo} className='ticket__media-img' width='120' height='35' alt='Ticket logo' />
				</div>
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
		</div>
	)
}

Ticket.propTypes = {
	mixin: PropTypes.string,
	price: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	currency: PropTypes.string,
	currencies: PropTypes.object,
	departure_time: PropTypes.string,
	arrival_time: PropTypes.string,
	stops: PropTypes.number,
	origin: PropTypes.string,
	origin_name: PropTypes.string,
	destination: PropTypes.string,
	destination_name: PropTypes.string,
	arrival_date: PropTypes.string,
	departure_date: PropTypes.string
}

Ticket.defaultProps = {
	mixin: '',
	price: 0,
	currency: 'RUB',
	currencies: {RUB: 1},
	departure_time: '',
	arrival_time: '',
	stops: 0,
	origin: '',
	origin_name: '',
	destination: '',
	destination_name: '',
	arrival_date: '',
	departure_date: ''
}

export default Ticket
