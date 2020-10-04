import React from 'react'
import { withRouter, Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Link from '@material-ui/core/Link'

import { isFeatureEnabled, isLoggedIn } from '../utils/auth'

const useStyles = makeStyles(theme => ({
  appBar: {
    background: '#00693E'
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '1rem'
  },
  linkTitle: {
    color: 'white'
  }
}));

function RightActionButton ({ onAddButtonClick }) {
  if (!isFeatureEnabled('tree-data-capture')) return ''

  const classes = useStyles()

  if (isLoggedIn()) {
    return (
      <Link href="/users/sign_out" rel="nofollow"  className={classes.linkTitle} data-method="delete">
        <Button color="inherit">Logout</Button>
      </Link>
    )
  } else {
    return (
      <Link href="/users/sign_in" className={classes.linkTitle}>
        <Button color="inherit">Login</Button>
      </Link>
    )
  }
}

const NavigationBar = withRouter(({ history }) => {
  const classes = useStyles();

  function onAddButtonClick () {
    history.push('/trees/step-one')
  }

  function navigateToLogin () {
    history.push('/trees/step-one')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link component={RouterLink} className={classes.linkTitle} to="/trees">
              Plymouth Tree Partnership
            </Link>
          </Typography>
          <RightActionButton onAddButtonClick={onAddButtonClick} />
        </Toolbar>
      </AppBar>
    </div>
  );
})

export default NavigationBar
