import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Tickets.scss'
import Filter from './Filter'
import Modificator from './Modificator'
import { Stops, Currencies, TicketsListContainer } from '../containers'

const Tickets = ({ mixin }) => {
	const className = mixin ?
		`tickets ${mixin}` :
		'tickets'
	return (
		<div className={className}>
			<aside className='aside tickets__aside'>
				<div className='aside__item'>
					<Modificator>
						<Currencies
							name='currency-radio-group'
							title='ВАЛЮТА' />
					</Modificator>
				</div>
				<div className='aside__item aside__item--no-padding'>
					<Filter>
						<Stops
							mixin='filter__stop-list'
							title='КОЛИЧЕСТВО ПЕРЕСАДОК' />
					</Filter>
				</div>
			</aside>
			<main className='tickets__main'>
				<TicketsListContainer mixin='tickets__list' />
			</main>
		</div>
	)
}

Tickets.defaultProps = {
	mixin: ''
}

Tickets.propTypes = {
	mixin: PropTypes.string
}

export default Tickets
