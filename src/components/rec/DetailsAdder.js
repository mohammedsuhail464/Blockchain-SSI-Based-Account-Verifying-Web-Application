import React, { useState, useEffect } from 'react';
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Grid from '@adder-ui/core/Grid';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddDetailAdder(props) {
  

  const classes = useStyles();

  return (
    <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5"> Add Details </Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField variant="outlined" 
                 
                required fullWidth  id="description" label="Adder Description" name="description"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" 
               
                required fullWidth  id="count" label="Adder Count" name="count"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined"
                 
                 required fullWidth  id="locationx" label="Location - x" name="recipient-location"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined"
              
                  required fullWidth  id="locationy" label="Location - y" name="recipient-location"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" 
                 
                required fullWidth  id="uniqueaddresslinkrt-address" label="Uniqueaddresslinker Address" name="uniqueaddresslinkrt-address"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" 
                
                required fullWidth  id="sender-address" label="Sender Address" name="sender-address"/>
            </Grid>
            
            </Grid>
            <Button
              type="submit" fullWidth variant="contained" color="primary"
              
                >
              Submit
            </Button>
          
          </form>
        </div>
      </Container>
    </Grid>
  );
}
