import React, { useState, useEffect } from 'react';
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Grid from '@adder-ui/core/Grid';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';
import Transactions from '../../build/Transactions.json';
import DetailAdder from '../../build/DetailAdder.json';
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
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [uniqueaddresslinkerAddress, setUniqueaddresslinkerAddress] = useState("");

  const [verificationChain] = useState(props.verificationChain);
  const [loading, isLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");

  console.log([account]);
  console.log("Rec VerificationChain");
  console.log([verificationChain]); 
  
  const classes = useStyles();

  const handleInputChange = (e) => {
    if (e.target.id === 'description') {
       setDescription(e.target.value);     
    } else if(e.target.id === 'count') {
        setCount(e.target.value);
    } else if(e.target.id === 'uniqueaddresslinkrt-address') {
      setUniqueaddresslinkerAddress(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoading(true);
    var d = web3.utils.padRight(web3.utils.fromAscii(description), 64);
    verificationChain.methods.createDetailAdderBundle(d, count, uniqueaddresslinkerAddress, account).send({ from: account })
    .once('receipt', async (receipt) => {
      var detailAdderAddresses = await verificationChain.methods.getAllBundles().call({from: account});
      let detailAdderAddress = detailAdderAddresses[detailAdderAddresses.length - 1];
      const detailAdder = new web3.eth.Contract(DetailAdder.abi, detailAdderAddress);
      let data = await detailAdder.methods.getVerifiedDetailAdders().call({from: account});
      let txnContractAddress = data[6];
      let txnHash = receipt.transactionHash;
      const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
      transactions.methods.createTxnEntry(txnHash, account, detailAdderAddress, txnHash, '10', '10').send({ from: account }); 
      isLoading(false);
    });
  }

  return (
    <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5"> Add Details </Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="description" label="Identification Code Name(Do not use Personal Name)" name="description"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="count" label="Own Secret Key" name="count"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="uniqueaddresslinkrt-address" label="Identity Address(Provided by Admin)" name="uniqueaddresslinkrt-address"/>
            </Grid>
            </Grid>
            <Button
              type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={ handleSubmit } >
              Submit
            </Button>
          
          </form>
        </div>
      </Container>
    </Grid>
  );
}
