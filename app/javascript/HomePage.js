import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LinkButton from './LinkButton'
import ParkMap from './ParkMap'

class HomePage extends Component {
  render () {
    return (
      <div id="home-page">
        <h3>Plymouth Tree Partnership</h3>
        <div className="row">
          <LinkButton className="btn" to="/trees/step-one">Add a Tree</LinkButton>
        </div>
        <ParkMap />
      </div>
    )
  }
}

export default HomePage
