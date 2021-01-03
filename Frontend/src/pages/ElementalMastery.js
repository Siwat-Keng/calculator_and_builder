import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import ScaleReaction from '../components/ScaleReaction';
import NonScaleReaction from '../components/NonScaleReaction';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    minWidth: 90,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function ElementalMastery() {

  const classes = useStyles();
  const [type, setType] = React.useState(localStorage.getItem("reactionType") || 'vaporize');

  const onChange = (event) => {
    localStorage.setItem("reactionType", event.target.value);
    setType(event.target.value);
  }

  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel id="type">Reaction Type</InputLabel>
        <Select
          name="type"
          labelId="type-label"
          id="type-select"
          defaultValue={type}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={'vaporize'}>Vaporize</MenuItem>
          <MenuItem value={'melt'}>Melt</MenuItem>
          <MenuItem value={'crystallize'}>Crystallize</MenuItem>
          <MenuItem value={'overload'}>Overload</MenuItem>
          <MenuItem value={'superconduct'}>Superconduct</MenuItem>
          <MenuItem value={'electro_charged'}>Electro-Charged</MenuItem>
          <MenuItem value={'shattered'}>Shattered</MenuItem>
          <MenuItem value={'swirl'}>Swirl</MenuItem>
        </Select>
      </FormControl><br />
      {
        type === 'vaporize' ? <ScaleReaction type='vaporize' /> :
          type === 'melt' ? <ScaleReaction type='melt' /> :
            <NonScaleReaction type={type} />
      }
    </div>
  );
}

export default ElementalMastery;