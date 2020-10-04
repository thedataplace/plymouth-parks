import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Material UI
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

// Custom components
import ImageCaptureButtonGroup from '../components/ImageCaptureButtonGroup'
import NavigationBar from '../components/NavigationBar'
import PlaceHolderImage from '../components/PlaceHolderImage'
import WalkThroughBreadCrumbs from '../components/WalkThroughBreadCrumbs'

// Utilities
import { addFileToWindowImages, getFileFromWindowImages } from '../utils/images'

export function DataEntryImage ({ imageFile }) {
  if (!imageFile) {
    return <PlaceHolderImage />
  } else {
    const imageFileUrl = URL.createObjectURL(imageFile)
    return <img id="image" src={imageFileUrl} className="center-image" />
  }
}

function ImageCapturePage () {
  const defaultImageFile = getFileFromWindowImages('PRIMARY_IMAGE')
  const [imageFile, setImageFile] = useState(defaultImageFile)

  function selectImage ({ target }) {
    let images = []
    for (var i = 0; i < target.files.length; i++) {
      images[i] = target.files.item(i)
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    addFileToWindowImages('PRIMARY_IMAGE', images[0])
    setImageFile(images[0])
  }

  console.log(imageFile)

  return (
    <div>
      <NavigationBar />
      <br/>
      <WalkThroughBreadCrumbs />
      <br/>
      <Container>
        <Container>
          <Typography variant="h5" gutterBottom>
            Step 2: Photograph the whole tree
          </Typography>

          <Typography variant="h6" gutterBottom>
            Walk away from the tree and capture a photo the entire tree.
          </Typography>
        </Container>

        <ImageCaptureButtonGroup
          backLink="/trees/step-one"
          nextLink="/trees/step-three"
          selectedImages={selectImage}
        >
          <DataEntryImage imageFile={imageFile} />
        </ImageCaptureButtonGroup>
      </Container>
    </div>
  )
}

export default ImageCapturePage
