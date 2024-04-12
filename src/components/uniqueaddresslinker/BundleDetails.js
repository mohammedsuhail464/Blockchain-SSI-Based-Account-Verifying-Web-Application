import React from 'react';
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

function BundleDetails() {
  const classes = useStyles();

  return (
    <Router>
        <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", justify: "center", maxHeight: '500px', }}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">Bundle Details</Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="input-detail-adder" label="Detail Adder/ Verify" name="input-detail-adder"/>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="uniqueaddresslinker-no" label="Uniqueaddresslinker Number/Type" name="uniqueaddresslinker-no"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="outlined" required fullWidth  id="contract-address" label="Contract Address" name="contract-address"/>
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
export default withRouter(BundleDetails);