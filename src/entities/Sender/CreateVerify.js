import React, { useState, useEffect } from 'react';
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Grid from '@adder-ui/core/Grid';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';
import Transactions from '../../build/Transactions.json';
import Verify from '../../build/Verify.json';

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

export default function CreateVerify(props) {
  console.log(props);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [loading, isLoading] = useState(false);
  const [verificationChain] = useState(props.verificationChain);

  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [detailMatAddress, setDetailMatAddress] = useState([]);
  const [senderAddress, setSenderAddress] = useState("");
  const [uniqueaddresslinkerAddress, setUniqueaddresslinkerAddress] = useState("");
  const [bankerAddress, setBankerAddress] = useState(""); 

  const classes = useStyles();

  const handleInputChange = (e) => {
    if (e.target.id === 'description') {
       setDescription(e.target.value);     
    } else if(e.target.id === 'count') {
        setCount(e.target.value);     
    } else if(e.target.id === 'detailMatAddress') {
        setDetailMatAddress(e.target.value);
    } else if(e.target.id === 'senderAddress') {
        setSenderAddress(e.target.value);
    } else if(e.target.id === 'uniqueaddresslinkerAddress') {
        setUniqueaddresslinkerAddress(e.target.value);
    } else if(e.target.id === 'bankerAddress') {
        setBankerAddress(e.target.value);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    isLoading(true);
    var d = web3.utils.padRight(web3.utils.fromAscii(description), 64);
    verificationChain.methods.senderCreatesVerify(senderAddress, d, [detailMatAddress], count, [uniqueaddresslinkerAddress]).send({ from: account })
    .once('receipt', async (receipt) => {
      console.log(receipt);
      var verifyAddresses = await verificationChain.methods.getAllCreatedVerifies().call({ from: account });
      let verifyAddress = verifyAddresses[verifyAddresses.length - 1];
      const verify = new web3.eth.Contract(Verify.abi, verifyAddress);
      let data = await verify.methods.getVerifyInfo().call({ from: account });
      let txnContractAddress = data[7];
      let txnHash = receipt.transactionHash;
      const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
      transactions.methods.createTxnEntry(txnHash, account, verifyAddress, txnHash, '10', '10').send({ from: account });
      isLoading(false);
    })
  }


  return (
    <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center"}}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography component="h1" variant="h5">Create New Verify </Typography>
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="description" label="Verify Description" name="description"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="count" label="Verify Count" name="count"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="detailMatAddress" label="Detail Adder Address" name="detailMatAddress"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="senderAddress" label="Sender Address" name="senderAddress"/>
            </Grid>
            <Grid item xs={12}>
                <TextField variant="outlined" onChange={ handleInputChange } required fullWidth  id="uniqueaddresslinkerAddress" label="Uniqueaddresslinker Address" name="uniqueaddresslinkerAddress"/>
            </Grid>
              {

                
              }
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
