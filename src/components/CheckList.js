import React from 'react'
import PropTypes from 'prop-types'
import './CheckList.scss'

const CheckList = ({ list, title, mixin, onAllStops, onStop, onOnly }) => {
	const { length } = list
	const className =  mixin ?
		`check-list ${mixin}` :
		'check-list'
	return (
		<form className={className}>
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
										{
											index ?
											<button type='reset' className='check-list__only' onClick={onOnly}>
												Только
											</button> :
											null
										}
										<label
											htmlFor={`check-list__input_${index}`}
											key={index}
											className='check-list__label'>
											<div className='check-list__wrapper'>
												<input
													className='check-list__input'
													type='checkbox'
													id={`check-list__input_${index}`}
													onChange={index ? onStop : onAllStops} />
												<div className='check-list__face-wrapper'>
													<div className='check-list__face' />
												</div>
												<div className='check-list__text'>
													{text}
												</div>
											</div>
										</label>
									</div>
								)
							})
						}
					</div> :
					null
			}
		</form>
	)
}

CheckList.defaultProps = {
	list: [],
	title: '',
	mixin: '',
	onStop: f => f,
	onOnly: f => f,
	onAllStops: f => f
}

CheckList.propTypes = {
	list: PropTypes.array,
	title: PropTypes.string,
	mixin: PropTypes.string,
	onStop: PropTypes.func,
	onOnly: PropTypes.func,
	onAllStops: PropTypes.func
}

export default CheckList
