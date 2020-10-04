import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import Button from '@material-ui/core/Button'

// Custom components
import ImageCaptureButtonGroup from '../components/ImageCaptureButtonGroup'
import NavigationBar from '../components/NavigationBar'
import ParkMap from '../components/ParkMap'
import PlaceHolderImage from '../components/PlaceHolderImage'
import WalkThroughBreadCrumbs from '../components/WalkThroughBreadCrumbs'


// Utilities
import { buildMap } from '../utils/mapBox'
import { addFileToWindowImages, getFileFromWindowImages } from '../utils/images'

const geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000
}

export function geoSuccess (position, setCoordinates) {
  const { latitude, longitude } = position.coords
  setCoordinates({ latitude, longitude })
  window.formData.coordinates = { latitude, longitude }
}

export function geoError (evt) {
  alert("Sorry, no position available.");
}

export function getCurrentLocation (setCoordinates) {
  function setPosition (position) {
    return geoSuccess(position, setCoordinates)
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, geoError, geoOptions)
  } else {
    alert('Geo location is not available')
  }
}

export function DataEntryImage ({ imageFile }) {
  if (!imageFile) {
    return <PlaceHolderImage />
  } else {
    const imageFileUrl = URL.createObjectURL(imageFile)
    return <img id="image" src={imageFileUrl} className="center-image" />
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    textAlign: 'center'
  },
  button: {
    textAlign: 'center'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}))

function StepOnePage () {
  const classes = useStyles()
  const defaultImageFile = getFileFromWindowImages('SECONDARY_IMAGE')
  const [imageFile, setImageFile] = useState(defaultImageFile)
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })

  function selectedImages ({ target }) {
    let images = []
    for (var i = 0; i < target.files.length; i++) {
      images[i] = target.files.item(i)
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    addFileToWindowImages('SECONDARY_IMAGE', images[0])
    setImageFile(images[0])
    getCurrentLocation(setCoordinates)
  }

  useEffect(() => {
    if (coordinates.longitude && coordinates.latitude) {
      buildMap({
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
        zoom: 15
      })
    }
  }, [coordinates])

  return (
    <div>
      <NavigationBar />
      <br/>
      <WalkThroughBreadCrumbs />
      <br/>

      <Container>
        <Container>
          <Typography variant="h5" gutterBottom>
            Step 1: Identify & Geolocate
          </Typography>

          <br/>

          <Typography variant="h6" gutterBottom>
            Take a photo of the bark or leaf of the tree.
            Make sure to stand as close as possible to the trunk of the tree,
            when you take the photo.
          </Typography>
        </Container>

        <br/>

        <ImageCaptureButtonGroup
          backLink="/trees"
          nextLink="/trees/step-two"
          selectedImages={selectedImages}
        >
          <Typography variant="h5" gutterBottom align="center">
            A. Review your photo
          </Typography>

          <br/>

          <DataEntryImage imageFile={imageFile} />

          <br/>

          <Typography variant="h5" gutterBottom align="center">
            B. Review your location
          </Typography>

          <br/>

          <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
              If your location doesn't look right, press the "Retry" button.
              You may need to retry geolocating a couple times to get an accurate
              reading.
            </Typography>
          </Container>

          <br/>

          <Container className={classes.root} maxWidth="sm">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => getCurrentLocation(setCoordinates)}
            >
              Retry
              <RefreshIcon className={classes.rightIcon} />
            </Button>
          </Container>

          <br/>

          <Container maxWidth="lg">
            <ParkMap defaultZoom={15} interactive={false} />
          </Container>
        </ImageCaptureButtonGroup>

      </Container>
    </div>
  )
}

export default StepOnePage
