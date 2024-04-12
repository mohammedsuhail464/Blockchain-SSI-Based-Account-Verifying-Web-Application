import React, { Component } from 'react'
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Grid from '@adder-ui/core/Grid';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../header/Header';

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

function AddVerify() {
  const classes = useStyles();

  return (
    <Router>
        <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", justify: "center", maxHeight: '660px',maxWidth: 400 }}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">Enter Verify Details</Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="verify-description" label="Verify Desription" name="verify-description"/>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="count" label="Unique Count" name="count"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="detail-adder-location" label="Location of Detail Adder" name="detail-adder-location"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="sender-location" label="Sender Location" name="sender-location"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="uniqueaddresslinker-address" label="Uniqueaddresslinker Location" name="uniqueaddresslinker-address"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="banker-address" label="Banker Location" name="banker-location"/>
                </Grid>
                        
                </Grid>
                <Button
                type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                Submit
                </Button>
            
            </form>
            </div>
        </Container>
        </Grid>
    </Router>
  );
}
export default withRouter(AddVerify);