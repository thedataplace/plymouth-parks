import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import HomeIcon from '@material-ui/icons/Home'
import ExploreIcon from '@material-ui/icons/Explore'
import PhotoIcon from '@material-ui/icons/PhotoCamera'
import CloudUpload from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  },
}))

function WalkThroughBreadCrumbs () {
  const classes = useStyles()

  return (
    <Paper elevation={0} className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={RouterLink}
          color="inherit"
          to="/trees/step-one"
        >
          <Typography color="textPrimary" className={classes.link}>
            <ExploreIcon className={classes.icon} />
            Step 1
          </Typography>
        </Link>

        <Link
          component={RouterLink}
          color="inherit"
          to="/trees/step-two"
        >
          <Typography color="textPrimary" className={classes.link}>
            <PhotoIcon className={classes.icon} />
            Step 2
          </Typography>
        </Link>

        <Link
          component={RouterLink}
          color="inherit"
          to="/trees/step-three"
        >
          <Typography color="textPrimary" className={classes.link}>
            <CloudUpload className={classes.icon} />
            Step 3
          </Typography>
        </Link>
      </Breadcrumbs>
    </Paper>
  )
}

export default WalkThroughBreadCrumbs
