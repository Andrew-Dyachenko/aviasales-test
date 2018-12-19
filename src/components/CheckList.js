import React from 'react'
import PropTypes from 'prop-types'
import './CheckList.scss'

const CheckList = ({ list, title, onChoose }) => {
	const { length } = list
	return (
		<div className='check-list'>
			{
				title ?
					<h4 className='check-list__title'>
						{title}
					</h4> :
					null
			}
			{
				length ?
					<div className='check-list__container'>
						{
							list.map((item, index) => {
								const { text } = item
								return (
									<div key={index} className='check-list__item'>
										<input
											className='check-list__input'
											type='checkbox'
											id={`check-list__input_${index}`}
											onChange={onChoose} />
										<label
											htmlFor={`check-list__input_${index}`}
											className='check-list__label check-list__label--fake' />
										<label
											htmlFor={`check-list__input_${index}`}
											className='check-list__label'>
											{text}
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

CheckList.defaultProps = {
	list: [],
	title: '',
	onChoose: f => f
}

CheckList.propTypes = {
	list: PropTypes.array,
	title: PropTypes.string,
	onChoose: PropTypes.func
}

export default CheckList
