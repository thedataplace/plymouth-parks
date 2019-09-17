import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MapRadioButtonGroup from './MapRadioButtonGroup'
import { buildMap } from '../utils/mapBox'

class ParkMap extends Component {
  constructor (props) {
    super(props)

    this.state = { box: 'streets-v11' }
  }

  componentDidMount () {
    buildMap({
      longitude: -4.148052,
      latitude: 50.382439,
      zoom: this.props.defaultZoom,
      interactive: this.props.interactive
    })
  }

  onChange = ({ target }) => {
    this.setState({ box: target.id })
  }

  render () {
    return (
      <div id="park-map">
        <MapRadioButtonGroup />
        <div id="map-container">
          <div id='map' className="mapboxgl-map"></div>
        </div>
      </div>
    )
  }
}

export default ParkMap
