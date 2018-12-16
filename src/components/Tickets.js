import React from 'react'
import PropTypes from 'prop-types'
import './Tickets.scss'
import TicketsList from './TicketsList'
import DataComponent from './DataComponent'

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
				<div className='tile'>Aside</div>
			</aside>
			<main className='tickets__main'>
				Main
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
