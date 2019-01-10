import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Tickets.scss'
import TicketsList from './TicketsList'
import Filter from './Filter'
import Modificator from './Modificator'
import { Stops, Currencies } from '../containers'

const Tickets = ({ mixin }) => {
	const className = mixin ?
		`tickets ${mixin}` :
		'tickets'
	return (
		<div className={className}>
			<aside className='tickets__aside'>
				<Modificator>
					<div className='modificator__tile'>
						<Currencies
							name='currency-radio-group'
							title='ВАЛЮТА' />
					</div>
				</Modificator>
				<Filter>
					<div className='filter__tile filter__tile--nopadding'>
						<Stops
							mixin='filter__stop-list'
							title='КОЛИЧЕСТВО ПЕРЕСАДОК' />
					</div>
				</Filter>
			</aside>
			<main className='tickets__main'>
				<TicketsList />
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
