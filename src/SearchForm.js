import React, { useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {},

  textfields: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',

    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },

  submit: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
  }

}));

function SearchForm({setParams}) {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    e.preventDefault();
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
    e.preventDefault();
  };

  const handleSubmit = () => {
    setParams({
      page: 1,
      description: description,
      location: location
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.textfields}>
        <TextField
          onChange={handleChangeDescription}
          label="Description" />
        <TextField
          onChange={handleChangeLocation}
          label="Location"  />
      </div>
      <div className={classes.submit}>
        <Button
          onClick={handleSubmit}
          color={"primary"}
          variant={'outlined'} >
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchForm;