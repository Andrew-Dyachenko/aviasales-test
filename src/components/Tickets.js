import React from 'react'
import PropTypes from 'prop-types'
import './Tickets.scss'
import TicketsList from './TicketsList'
import DataComponent from './DataComponent'
import Filter from './Filter'
import ButtonsGroup from './ButtonsGroup'

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
				<div className='tile'>
					<Filter>
						<ButtonsGroup />
					</Filter>
				</div>
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
