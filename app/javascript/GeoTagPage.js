import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LinkButton from './LinkButton'
import { addFileToWindowImages, getFileFromWindowImages } from './utils'

export function DataEntryImage ({ imageFile }) {
  if (!imageFile) return ''

  const imageFileUrl = URL.createObjectURL(imageFile)

  return <img id="image" src={imageFileUrl} />
}

function GeoTagPage () {
  const defaultImageFile = getFileFromWindowImages('SECONDARY_IMAGE')
  const [imageFile, setImageFile] = useState(defaultImageFile)

  function selectedImages ({ target }) {
    let images = []
    for (var i = 0; i < target.files.length; i++) {
      images[i] = target.files.item(i)
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    addFileToWindowImages('SECONDARY_IMAGE', images[0])
    setImageFile(images[0])
  }

  return (
    <div>
      <h2>Plymouth Tree Partnership</h2>
      <h3>Step 1: Take a photo of the bark or leaf of the tree.</h3>
      <p>
        Make sure to stand as close as possible to the trunk of the tree,
        when you take the photo.
      </p>
      <div className="row">
        <div className="upload-button-wrapper">
          <button className="upload-button">Take the Photo</button>
          <input
            accept="image/png,image/gif,image/jpeg"
            id="data_entry_image"
            name="data_entry[image]"
            type="file"
            onChange={selectedImages}
          />
        </div>

        <DataEntryImage imageFile={imageFile} />

        <div className="row pb">
          <LinkButton className="btn" to="/trees/step-two">Continue</LinkButton>
        </div>

        <div className="row pb">
          <LinkButton className="btn" to="/trees">Go Back</LinkButton>
        </div>
      </div>
    </div>
  )
}

export default GeoTagPage
