import React from 'react'
import PropTypes from 'prop-types'
import { filterTickets } from '../actions'
import Filter from './UI/Filter'

export const FilterTickets = (props, { store }) => (
	<Filter onNewColor={(title, color) => store.dispatch(filterTickets(title, color))} />
)

FilterTickets.contextTypes = {
	store: PropTypes.object
}
