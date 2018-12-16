import React from 'react'
import PropTypes from 'prop-types'
import './ButtonsGroup.scss'

const ButtonsGroup = ({ buttons, onChoose }) =>
	<div className='buttons-group'>
		{
			buttons.map((button, index) => {
				const { text } = button
				return (
						<div key={index} className='buttons-group__item'>
							<input type='radio' id={`buttons-group_input_${index}`}/>
							<label htmlFor={`buttons-group_input_${index}`} onChange={onChoose}>
								{text}
							</label>
						</div>
					)
				}
			)
		}
	</div>

ButtonsGroup.defaultProps = {
	buttons: [],
	onChoose: f => f
}

ButtonsGroup.propTypes = {
	buttons: PropTypes.array,
	onChoose: PropTypes.func
}

export default ButtonsGroup