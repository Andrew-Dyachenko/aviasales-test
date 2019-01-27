import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import tickets from '../../public/tickets'
import deepFreeze from 'deep-freeze'
import initialState from '../data/initialState'

Enzyme.configure({ adapter: new Adapter() })

global.React = React
global.Enzyme = Enzyme
global.tickets = deepFreeze(tickets)
global.initialState = deepFreeze(initialState)
