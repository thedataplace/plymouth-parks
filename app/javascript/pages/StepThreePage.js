import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// Material UI
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/core/styles'

// Custom components
import NavigationBar from '../components/NavigationBar'
import WalkThroughBreadCrumbs from '../components/WalkThroughBreadCrumbs'
import StepThreePageInputGroup from '../components/StepThreePageInputGroup'
import SuccessDialog from '../components/SuccessDialog'

// Utilities
import { saveDataEntry } from '../utils/api'
import { getFileFromWindowImages } from '../utils/images'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  submitButton: {
    color: 'white',
    backgroundColor: '#00796b'
  }
}))

const DEFAULT_DETAILS = {
  title: '',
  subtitle: '',
  username: '',
  notes: ''
}

export async function submitForm (details, setRequestStatus) {
  const primaryImageFile = getFileFromWindowImages('PRIMARY_IMAGE')
  const secondaryImageFile = getFileFromWindowImages('SECONDARY_IMAGE')
  const coordinates = window.formData.coordinates

  if (!details.username || details.username === '') {
    window.alert('You must enter your name.')
  } else if (!primaryImageFile || !secondaryImageFile) {
    window.alert('You must include a primary and secondary image.')
  } else if (!coordinates.longitude || !coordinates.latitude) {
    window.alert(
      `There was a problem determining your location. Please go back
      to Step #1 and click the "Retry" button get the tree's
      geographic coordinates.
      `
    )
  } else {
    const entryFormData = new FormData()
    entryFormData.append('data_entry[title]', details.title)
    entryFormData.append('data_entry[subtitle]', details.subtitle)
    entryFormData.append('data_entry[image]', primaryImageFile)
    entryFormData.append('data_entry[secondary_image]', secondaryImageFile)
    entryFormData.append('data_entry[notes]', details.notes)
    entryFormData.append('data_entry[username]', details.username)
    entryFormData.append('data_entry[latitude]', coordinates.latitude)
    entryFormData.append('data_entry[longitude]', coordinates.longitude)
    const response = await saveDataEntry(entryFormData)
    if (response.status === 201) {
      window.formData = { images: {}, coordinates: {} }
      setRequestStatus('SUCCESS')
    } else {
      setRequestStatus('FAILURE')
    }
  }
}

export function DataEntryImage ({ fileName }) {
  const classes = useStyles()
  const imageFile = getFileFromWindowImages(fileName)

  if (imageFile) {
    const imgURL = URL.createObjectURL(imageFile)
    return <img className="review-image" id="image" src={imgURL}/>
  } else {
    return ''
  }
}

function StepThreePage ({ history }) {
  const [details, setDetails] = useState(DEFAULT_DETAILS)
  const [requestStatus, setRequestStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()

  function triggerSubmit () {
    setIsLoading(true)
    submitForm(details, setRequestStatus)
  }

  return (
    <div>
      <NavigationBar />
      <br/>
      <WalkThroughBreadCrumbs />
      <br/>
      <Container>
        <Typography variant="h5" gutterBottom>
          Step 3: Details, Review & Submit
        </Typography>
        <br/>
        <Typography variant="h6" gutterBottom>
        { /* Enter additional instructions here */ }
        </Typography>
      </Container>

      <StepThreePageInputGroup
        details={details}
        setDetails={setDetails}
      />

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Primary Image
            </Typography>
            <DataEntryImage fileName="PRIMARY_IMAGE" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
              Secondary Image
            </Typography>
            <DataEntryImage fileName="SECONDARY_IMAGE" />
          </Grid>
        </Grid>
      </div>
      <br/>
      <Button
        size="medium"
        variant="contained"
        fullWidth
        color="default"
        disabled={isLoading}
        className={classes.submitButton}
        onClick={triggerSubmit}
      >
        Upload
        <CloudUpload className={classes.rightIcon} />
      </Button>
      <br/>
      <SuccessDialog open={requestStatus === 'SUCCESS'} history={history} />
    </div>
  )
}

export default StepThreePage
