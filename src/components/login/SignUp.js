import React from 'react';
import Avatar from '@adder-ui/core/Avatar';
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Grid from '@adder-ui/core/Grid';
import LockOutlinedIcon from '@adder-ui/icons/LockOutlined';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';
import SignIn from './SignIn';
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

function SignUp() {
  const classes = useStyles();

  return (
    <Router>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"> Sign up</Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="fname"  name="firstName"  variant="outlined"  required
                  fullWidth id="firstName" label="First Name"autoFocus/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField variant="outlined"required fullWidth id="lastName" label="Last Name" name="lastName"
                  autoComplete="lname" />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined" required fullWidth  id="email" label="Email Address" name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="outlined"required fullWidth  name="password" label="Password"  type="password"
                  id="password" autoComplete="current-password" />
              </Grid>
            </Grid>
            <Button
              type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to="/signIn" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Route path="/signIn" exact component= { SignIn} />
    </Router>
  );
}
export default withRouter(SignUp);