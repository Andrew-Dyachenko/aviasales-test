/*eslint no-console: 0*/
import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/StopList.scss'

const StopsList = ({
	list,
	title,
	mixin,
	onAllStops,
	onStop,
	onOnly
}) => {
	const { length } = list
	const className =  mixin ?
		`stop-list ${mixin}` :
		'stop-list'
	return (
		<form className={className}>
			{
				title ?
					<h4 className='stop-list__title'>
						{title}
					</h4> :
					null
			}
			{
				length ?
					<div className='stop-list__container'>
						{
							list.map((item, index) => {
								const { text, stops } = item
								return (
									<div key={index} className='stop-list__item'>
										{
											index ?
												<button type='reset' className='stop-list__only' data-stops={index - 1} onClick={onOnly}>
													Только
												</button> :
												null
										}
										<label
											htmlFor={`stop-list__input_${index}`}
											key={index}
											className='stop-list__label'>
											<div className='stop-list__wrapper'>
												<input
													className='stop-list__input'
													type='checkbox'
													id={`stop-list__input_${index}`}
													onChange={index ? onStop : onAllStops}
													value={stops} />
												<div className='stop-list__face-wrapper'>
													<div className='stop-list__face' />
												</div>
												<div className='stop-list__text'>
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

StopsList.defaultProps = {
	list: [],
	title: '',
	mixin: '',
	onStop: f => f,
	onOnly: f => f,
	onAllStops: f => f
}

StopsList.propTypes = {
	list: PropTypes.array,
	title: PropTypes.string,
	mixin: PropTypes.string,
	onStop: PropTypes.func,
	onOnly: PropTypes.func,
	onAllStops: PropTypes.func
}

export default StopsList
