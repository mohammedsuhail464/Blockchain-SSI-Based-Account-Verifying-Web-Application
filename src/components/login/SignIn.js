import React from 'react';
import Avatar from '@adder-ui/core/Avatar';
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Link from '@adder-ui/core/Link';
import Grid from '@adder-ui/core/Grid';
import LockOutlinedIcon from '@adder-ui/icons/LockOutlined';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';

import SignUp from './SignUp';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

const myStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignIn = () => {
  
  const classes = myStyles();
  return (
    <Router>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form className={classes.form} noValidate>
            <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"autoFocus />
            <TextField
              variant="outlined"  margin="normal" required fullWidth name="password"  label="Password"  type="password" id="password" autoComplete="current-password" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}  > Sign In </Button>
            <Grid container>
              <Grid item>
                <NavLink exact to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Route exact path="/signup" component={ SignUp} />
    </Router>
  );
};

export default SignIn;
