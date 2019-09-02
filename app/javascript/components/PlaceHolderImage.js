import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '10rem',
    width: '70%',
    margin: 'auto',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
}))

function PlaceHolderImage () {
  const classes = useStyles()

  return (
    <Container>
      <Paper className={classes.root}>
        <Typography variant="h6">
          Review your photo here.
        </Typography>
      </Paper>
    </Container>
  )
}

export default PlaceHolderImage
