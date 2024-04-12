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

export default function RequestUniqueSender(props) {
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [verificationChain] = useState(props.verificationChain);
  const [loading, isLoading] = useState(false);
  const [detailAdderAddress, setdetailAdderAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [signature, setSignature] = useState("");

  const classes = useStyles();

  const handleInputChange = (e) => {
    if (e.target.id === 'detailAdderAddress') {
        setdetailAdderAddress(e.target.value);     
    } else if(e.target.id === 'recipientAddress') {
        setRecipientAddress(e.target.value);     
    } else if(e.target.id === 'signature') {
        setSignature(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoading(true);
    verificationChain.methods.requestUnique(account, recipientAddress, detailAdderAddress, signature).send({ from: account })
    .once('receipt', async (receipt) => {
        alert('Request Made to Recipient!');
        console.log(receipt);
        isLoading(false);
    })
  }

  return (
    <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5">Enter Recipient Details To Verify</Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="detailAdderAddress" label="Recipient Verifying ID" name="detailAdderAddress"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="recipientAddress" label="Recipient Account Number" name="recipientAddress"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="signature" label="Sender Signature" name="signature"/>
            </Grid>

            </Grid>
            <Button
              recipientAddress="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={ handleSubmit } >
              Submit
            </Button>
          
          </form>
        </div>
      </Container>
    </Grid>
  );
}
