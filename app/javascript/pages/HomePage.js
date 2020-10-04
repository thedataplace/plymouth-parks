import React, { Component, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

import Copyright from '../components/Copyright'
import NavigationBar from '../components/NavigationBar'
import ParkMap from '../components/ParkMap'

import { isFeatureEnabled, isLoggedIn } from '../utils/auth'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    marginTop: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  }
}))

function AddTreeButton () {
  if (!isFeatureEnabled('tree-data-capture') || !isLoggedIn()) return ''
  return (
    <Link component={RouterLink} to="/trees/step-one" variant="body2">
      <Button
        color="default"
        fullWidth
        size="medium"
        variant="contained"
      >
        add a tree
      </Button>
    </Link>
  )
}

function HomePage ({ showAddButton = true }) {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div id="home-page">
      <main>
        <NavigationBar showAddButton={showAddButton} />
        <Container maxWidth="md">
          <br/>
          <AddTreeButton />
          <ParkMap />
        </Container>
      </main>

      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  )
}

export default HomePage
