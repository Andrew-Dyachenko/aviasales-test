import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Tickets.scss'
import TicketsList from './TicketsList'
import Filter from './Filter'
import { Stops, Valutas } from '../containers'

const buttons = [
	{
		text: 'RUB',
		defaultChecked: true
	},
	{
		text: 'USD'
	},
	{
		text: 'EUR'
	}
]

const Tickets = ({ mixin }) => {
	const className = mixin ?
		`tickets ${mixin}` :
		'tickets'
	return (
		<div className={className}>
			<aside className='tickets__aside'>
				<Filter>
					<div className='filter__tile'>
						<Valutas
							buttons={buttons}
							name='valuta-radio-group'
							title='ВАЛЮТА' />
					</div>
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
