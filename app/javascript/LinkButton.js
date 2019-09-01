import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

function LinkButton (props) {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props
  return (
    <button
      {...rest}
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

LinkButton.propTypes = propTypes

export default withRouter(LinkButton)
