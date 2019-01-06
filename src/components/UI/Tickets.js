import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/Tickets.scss'
import TicketsList from './TicketsList'
import DataComponent from '../DataComponent'
import Filter from './Filter'
import { Stops } from '../containers'
import ButtonsGroup from './ButtonsGroup'

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

const list = [
	{text: 'Все', stops: Infinity},
	{text: 'Без пересадок', stops: 0},
	{text: '1 пересадка', stops: 1},
	{text: '2 пересадки', stops: 2},
	{text: '3 пересадки', stops: 3}
]

const FilledTicketsList = DataComponent(
		TicketsList,
		'../data/tickets.json'
	)

const Tickets = ({ mixin }) => {
	const className = mixin ?
		`tickets ${mixin}` :
		'tickets'
	return (
		<div className={className}>
			<aside className='tickets__aside'>
				<Filter>
					<div className='filter__tile'>
						<ButtonsGroup
							buttons={buttons}
							name='valuta-radio-group'
							title='ВАЛЮТА' />
					</div>
					<div className='filter__tile filter__tile--nopadding'>
						<Stops
							mixin='filter__stop-list'
							list={list}
							title='КОЛИЧЕСТВО ПЕРЕСАДОК' />
					</div>
				</Filter>
			</aside>
			<main className='tickets__main'>
				<FilledTicketsList />
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
