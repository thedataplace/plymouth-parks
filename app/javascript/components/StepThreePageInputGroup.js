import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}))

function DetailsInputGroup ({ details, setDetails }) {
  const classes = useStyles()

  const handleChange = evt => {
    setDetails({ ...details, [evt.target.name]: evt.target.value })
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        name="title"
        id="title"
        label="Tree species"
        style={{ margin: 8 }}
        placeholder="Douglas fir"
        helperText="The common name for the tree"
        fullWidth
        margin="normal"
        variant="filled"
        value={details.title}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        helperText="The latin name for the tree"
        id="subtitle"
        InputLabelProps={{ shrink: true }}
        label="Tree type"
        margin="normal"
        name="subtitle"
        onChange={handleChange}
        placeholder="Pseudotsuga menziesii"
        style={{ margin: 8 }}
        value={details.subtitle}
        variant="filled"
      />
      <TextField
        fullWidth
        helperText="Helpful notes about the entry"
        id="notes"
        InputLabelProps={{ shrink: true }}
        label="Notes"
        margin="normal"
        multiline
        name="notes"
        onChange={handleChange}
        placeholder="Unsure of the tree species..."
        style={{ margin: 8 }}
        value={details.notes}
        variant="filled"
      />
    </form>
  )
}

export default DetailsInputGroup
