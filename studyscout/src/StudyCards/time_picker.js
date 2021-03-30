import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display:'inline',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePickers() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
      //className ="input_box"
        id="datetime-local"
        label="Time + Date"
        type="datetime-local"
        className="input_box"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
