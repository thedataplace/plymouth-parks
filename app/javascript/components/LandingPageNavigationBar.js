import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  appBar: {
    background: '#009688'
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: '1rem',
    color: 'white'
  }
}));

function LandingPageNavigationBar () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Plymouth Tree Partnership
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default LandingPageNavigationBar
