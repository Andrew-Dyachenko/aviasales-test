import React from 'react'
import PropTypes from 'prop-types'
import './ButtonsGroup.scss'

const ButtonsGroup = ({ buttons, name, title, onChoose }) =>
	<div className='buttons-group'>
		{
			title ?
				<h4 className='buttons-group__title'>{title}</h4> :
				null
		}
		<div className='buttons-group__container'>
			{
				buttons.map((button, index) => {
					const { text, defaultChecked } = button
					return (
						<div key={index} className='buttons-group__item'>
							<input
								className='buttons-group__input'
								type='radio'
								name={name}
								id={`buttons-group_input_${index}`}
								onChange={onChoose}
								defaultChecked={defaultChecked} />
							<label htmlFor={`buttons-group_input_${index}`} className='buttons-group__label'>
								<span className='buttons-group__text'>
									{text}
								</span>
							</label>
						</div>
					)
				})
			}
		</div>
	</div>

ButtonsGroup.defaultProps = {
	buttons: [],
	name: 'radio-group',
	title: '',
	onChoose: f => f
}

ButtonsGroup.propTypes = {
	buttons: PropTypes.array,
	name: PropTypes.string,
	title: PropTypes.string,
	onChoose: PropTypes.func
}

export default ButtonsGroup
