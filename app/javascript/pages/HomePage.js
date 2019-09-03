import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import ParkMap from '../components/ParkMap'
import NavigationBar from '../components/NavigationBar'


const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  }
}))

function Copyright() {
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

function HomePage ({ showAddButton = true }) {
  const classes = useStyles()
  return (
    <div id="home-page">
      <main>
        <NavigationBar showAddButton={showAddButton} />
        <ParkMap />
      </main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  )
}

export default HomePage
