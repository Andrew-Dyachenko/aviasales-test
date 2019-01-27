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
		tickets,
		dimensions
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
									<Ticket
										{...ticket}
										key={index}
										mixin='App__ticket'
										currency={currency}
										currencies={currencies}
										dimensions={dimensions} />
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
	tickets: {},
	dimensions: {}
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
	tickets: PropTypes.object,
	dimensions: PropTypes.object
}

export default TicketsList
