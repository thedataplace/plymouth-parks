import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

export default function SuccessDialog ({ open, history }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  function goToStepOne () {
    history.push('/trees/step-one')
  }

  function goToMap () {
    history.push('/trees')
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" align="center">
          Tree entry successfully submitted!
        </DialogTitle>
        <DialogContent>
          <Button onClick={goToStepOne} variant="contained" color="primary" fullWidth>
            Add Tree Entry
          </Button>

          <br/>
          <br/>

          <Button onClick={goToMap} variant="contained" color="secondary" fullWidth>
            Return to Map
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
