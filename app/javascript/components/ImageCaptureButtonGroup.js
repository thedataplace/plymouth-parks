import React from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    textAlign: 'center'
  },
  uploadButton: {
    marginTop: '6px',
    padding: '12px 20px',
    cursor: 'pointer',
    float: 'right'
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}))

const ImageCaptureButtonGroup = withRouter(({
  history,
  backLink,
  nextLink,
  children,
  selectedImages
}) => {
  const classes = useStyles()

  function navigateTo (value) {
    history.push(value)
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="upload-button-wrapper">
            <label htmlFor="data_entry_image">
              <Button
                size="medium"
                variant="contained"
                fullWidth
                color="default"
                className={classes.uploadButton}
              >
                Upload
                <PhotoCameraIcon className={classes.rightIcon} />
              </Button>
            </label>
            <input
              accept="image/png,image/gif,image/jpeg"
              id="data_entry_image"
              name="data_entry[image]"
              type="file"
              onChange={selectedImages}
            />
          </div>
        </Grid>

        <Container>
          { children }
        </Container>

        <Grid item xs={12}>
          <ButtonGroup variant="contained" fullWidth aria-label="full width contained button group">
            <Button color="secondary" onClick={() => navigateTo(backLink)}>
              <ArrowBackIcon className={classes.leftIcon} />
              Back
            </Button>
            <Button color="primary" onClick={() => navigateTo(nextLink)}>
              Next
              <ArrowForwardIcon className={classes.rightIcon} />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  )
})

export default ImageCaptureButtonGroup
