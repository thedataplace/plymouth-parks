/* eslint no-console:0 */
// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import App from 'App'

window.images = {}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
