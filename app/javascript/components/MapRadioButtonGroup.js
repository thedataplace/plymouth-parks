import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

function MapRadioButtonGroup () {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('streets-v11')

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <div id="menu" className={classes.root}>
      <Container maxWidth="sm" className={classes.paper}>
        <FormControl component="fieldset">
          <RadioGroup
            row={true}
            aria-label="map-view"
            name="map-view"
            className={classes.group}
            value={selectedValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="streets"
              control={<Radio value="streets-v11" />}
              label="Street"
            />
            <FormControlLabel
              value="satellite"
              control={<Radio value="satellite-v9" />}
              label="Satellite"
            />
          </RadioGroup>
        </FormControl>
      </Container>
    </div>
  );
}

export default MapRadioButtonGroup

// <div id='menu'>
//   <input
//     checked={this.state.box === 'streets-v11'}
//     id='streets-v11'
//     name='rtoggle'
//     type='radio'
//     value='streets'
//     onChange={this.onChange}
//   />
//   <label htmlFor='streets'>Streets</label>
//
//   <input
//     checked={this.state.box === 'satellite-v9'}
//     id='satellite-v9'
//     name='rtoggle'
//     type='radio'
//     value='satellite'
//     onChange={this.onChange}
//   />
//   <label htmlFor='satellite'>Satellite</label>
// </div>
