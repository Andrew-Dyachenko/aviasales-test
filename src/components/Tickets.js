import React from 'react'
import './Tickets.scss'
import TicketsList from './TicketsList'
import DataComponent from './DataComponent'

const FilledTicketsList = DataComponent(
		TicketsList,
		'../data/tickets.json'
	)

const Tickets = () =>
	<div className='tickets'>
		<aside className='tickets__aside'>
			<h1>Tickets aside</h1>
		</aside>
		<main className='tickets__main'>
			<h1>Tickets aside</h1>
			<FilledTicketsList />
		</main>
	</div>

export default Tickets
