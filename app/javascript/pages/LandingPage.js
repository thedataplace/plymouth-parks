import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'

import ParkMap from '../components/ParkMap'
import Copyright from '../components/Copyright'
import LandingPageNavigationBar from '../components/LandingPageNavigationBar'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    marginTop: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function LandingPage ({ showAddButton = true }) {
  const classes = useStyles()
  return (
    <div id="home-page">
      <main>
      <LandingPageNavigationBar />
      <Container maxWidth="xlg">
        <ParkMap />
      </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  )
}

export default LandingPage
