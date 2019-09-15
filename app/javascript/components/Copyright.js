import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Crafted by { ' ' }
      <Link color="inherit" href="https://thedata.place">
      The Data Place
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
