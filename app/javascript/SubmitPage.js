import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LinkButton from './LinkButton'
import { saveDataEntry } from './api'
import { getFileFromWindowImages } from './utils'

export async function submitForm (history) {
  const entryFormData = new FormData()
  const primaryImageFile = getFileFromWindowImages('PRIMARY_IMAGE')

  entryFormData.append('data_entry[title]', 'Example title')
  entryFormData.append('data_entry[image]', primaryImageFile)
  entryFormData.append('data_entry[secondary_image]', primaryImageFile)

  const response = await saveDataEntry(entryFormData)

  if (response.status === 201) {
    console.log('yea!')
    history.push('/trees')
  }
}

export function DataEntryImage ({ fileName }) {
  const imageFile = getFileFromWindowImages(fileName)
  if (imageFile) {
    const imgURL = URL.createObjectURL(imageFile)
    return <img id="image" src={imgURL}/>
  } else {
    return <div></div>
  }
}

function SubmitDataEntryPage ({ history }) {
  return (
    <div>
      <h2>Step 3: Review & Submit</h2>

      <div className="row pb">
        <DataEntryImage fileName="PRIMARY_IMAGE" />
      </div>

      <div className="row pb">
        <DataEntryImage fileName="SECONDARY_IMAGE" />
      </div>

      <div className="row pb">
        <LinkButton className="btn" to="/step-two">Go Back</LinkButton>
      </div>

      <div className="row pb">
        <button className="btn" onClick={() => submitForm(history)}>
          Submit Entry
        </button>
      </div>
    </div>
  )
}

export default SubmitDataEntryPage
