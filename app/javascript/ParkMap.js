import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LinkButton from './LinkButton'

class ParkMap extends Component {
  constructor (props) {
    super(props)

    this.state = { box: 'streets-v11' }
  }

  componentDidMount () {
    buildMap()
  }

  onChange = ({ target }) => {
    this.setState({ box: target.id })
  }

  render () {
    return (
      <div id="park-map">
        <div id="map-container">
          <div id='menu'>
            <input
              checked={this.state.box === 'streets-v11'}
              id='streets-v11'
              name='rtoggle'
              type='radio'
              value='streets'
              onChange={this.onChange}
            />
            <label htmlFor='streets'>Streets</label>

            <input
              checked={this.state.box === 'satellite-v9'}
              id='satellite-v9'
              name='rtoggle'
              type='radio'
              value='satellite'
              onChange={this.onChange}
            />
            <label htmlFor='satellite'>Satellite</label>
          </div>
        </div>

        <div id="map-container">
          <div id='map' className="mapboxgl-map"></div>
        </div>
      </div>
    )
  }
}

export default ParkMap
