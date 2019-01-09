import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/ButtonsGroup.scss'

const ButtonsGroup = ({ buttons, name, title, onCheck }) => {
	const { length } = buttons
	return (
		<div className='buttons-group'>
			{
				title ?
					<h4 className='buttons-group__title'>
						{title}
					</h4> :
					null
			}
			{
				length ?
					<div className='buttons-group__container'>
						{
							buttons.map((button, index) => {
								const { text, defaultChecked } = button
								return (
									<div key={index} className='buttons-group__item'>
										<input
											className='buttons-group__input'
											value={text}
											type='radio'
											name={name}
											id={`buttons-group__input_${index}`}
											onChange={onCheck}
											defaultChecked={defaultChecked} />
										<label htmlFor={`buttons-group__input_${index}`} className='buttons-group__label'>
											<span className='buttons-group__text'>
												{text}
											</span>
										</label>
									</div>
								)
							})
						}
					</div> :
					null
			}
		</div>
	)
}

ButtonsGroup.defaultProps = {
	buttons: [],
	name: 'radio-group',
	title: '',
	onCheck: f => f
}

ButtonsGroup.propTypes = {
	buttons: PropTypes.array,
	name: PropTypes.string,
	title: PropTypes.string,
	onCheck: PropTypes.func
}

export default ButtonsGroup
