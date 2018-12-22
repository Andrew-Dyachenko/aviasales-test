import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Loader from './Loader'

const DataComponent = (ComposedComponent, url) =>
	class DataComponent extends Component {
		constructor(props) {
			super(props)
			this.state = {
				data: [],
				loading: false,
				loaded: false
			}
		}
		componentWillMount() {
			this.setState({
				loading: true
			})
			fetch(url)
				.then(data => {
					this.setState({
						loaded: true,
						loading: false,
						data
					})
				})
				.catch(error => console.error(error)) /* eslint-disable-line no-console */
		}
		render() {
			return (
				<Fragment>
					{(this.state.loading) ?
						<Loader>Loading</Loader> :
						<ComposedComponent {...this.state} {...this.props}/>
					}
				</Fragment>
			)
		}
	}

DataComponent.propTypes = {
	ComposedComponent: PropTypes.element.isRequired,
	url: PropTypes.string
}

DataComponent.defaultProps = {
	ComposedComponent: () =>
		React.createElement('div', {displayName: 'ComposedComponent'}, 'Composed component'),
	url: ''
}

export default DataComponent
