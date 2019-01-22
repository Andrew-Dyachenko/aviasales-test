/*eslint no-console: 0*/
import React from 'react'
import PropTypes from 'prop-types'
import '../../assets/styles/StopList.scss'
import pluralize from 'pluralize-ru'
import Loader from './Loader'

const StopsList = ({
	filters,
	stops,
	title,
	mixin,
	fetching,
	onAllStops,
	onStop,
	onOnly
}) => {
	// console.log('fetching: ', fetching)
	const _stops = [Infinity, ...stops]
	const { length } = stops
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
				fetching ?
					<Loader /> :
					length ?
						<div className='stop-list__container'>
							{
								_stops.map((stop, index) => {
									const text = isFinite(stop)
										? pluralize(stop, 'Без пересадок', '%d пересадка', '%d пересадки', '%d пересадок')
										: 'Все'

									return (
										<div key={index} className='stop-list__item'>
											{
												index ?
													<button type='button' className='stop-list__only' data-stops={index - 1} onClick={onOnly}>
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
														value={stop}
														checked={
															index
																? filters.indexOf(stop) !== -1
																: filters.length === stops.length } />
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
	filters: [],
	stops: [],
	title: '',
	mixin: '',
	fetching: false,
	onStop: f => f,
	onOnly: f => f,
	onAllStops: f => f
}

StopsList.propTypes = {
	filters: PropTypes.array,
	stops: PropTypes.array,
	title: PropTypes.string,
	mixin: PropTypes.string,
	fetching: PropTypes.bool,
	onStop: PropTypes.func,
	onOnly: PropTypes.func,
	onAllStops: PropTypes.func
}

export default StopsList
