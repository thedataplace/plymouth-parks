import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material UI
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

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

function StepOnePage () {
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
      buildMap(coordinates.longitude, coordinates.latitude, 15)
    }
  }, [coordinates])

  return (
    <div>
      <NavigationBar />
      <br/>
      <WalkThroughBreadCrumbs />
      <br/>
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
        <DataEntryImage imageFile={imageFile} />
        <Container>
          <ParkMap defaultZoom={15} />
        </Container>
      </ImageCaptureButtonGroup>
    </div>
  )
}

export default StepOnePage
