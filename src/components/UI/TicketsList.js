/*eslint no-console: 0*/
import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/TicketsList.scss'
import Ticket from '../UI/Ticket'
import Loader from '../UI/Loader'

const TicketsList = ({
		mixin,
		currencies,
		filters,
		modificators,
		tickets
	}) => {
	const { list } = tickets
	const { fetching } = tickets.fetch
	const { error } = tickets.fetch
	const { currency } = modificators.currencies
	const { stops } = filters
	return (
		<div className={mixin ? `tickets-list ${mixin}` : 'tickets-list'}>
			{
				error
					? <span>Fetch data error!</span>
					: fetching
						? <Loader>Loading</Loader>
						: list
							? list
								.filter(ticket => stops.indexOf(ticket.stops) !== -1)
								.map((ticket, index) => {
								return (
									<Ticket key={index} {...ticket} currency={currency} currencies={currencies} />
								)
							})
							: null
			}
		</div>
	)
}

TicketsList.defaultProps = {
	mixin: '',
	// children: null,
	currencies: {},
	filters: {},
	modificators: {},
	tickets: {}
	
}

TicketsList.propTypes = {
	mixin: PropTypes.string,
	// children: PropTypes.oneOfType([
	// 	PropTypes.arrayOf(PropTypes.node),
	// 	PropTypes.node,
	// 	PropTypes.object
	// ])
	currencies: PropTypes.object,
	filters: PropTypes.object,
	modificators: PropTypes.object,
	tickets: PropTypes.object
}

export default TicketsList
