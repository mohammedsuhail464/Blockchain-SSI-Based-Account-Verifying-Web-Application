import React, { useState, useEffect } from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import TextField from '@adder-ui/core/TextField';
import Button from '@adder-ui/core/Button';
import Loader from '../../components/Loader';
import DetailAdder from '../../build/DetailAdder.json';
import Transactions from '../../build/Transactions.json';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ReceiveUnique(props) {
  const classes = useStyles();
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [address, setAddress] = useState("");
  const [verificationChain] = useState(props.verificationChain);
  const [loading, isLoading] = useState(false);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  }

  async function verifySignature(initiatorAddress, signature) {
    let v = '0x' + signature.slice(130, 132).toString();
    let r = signature.slice(0, 66).toString();
    let s = '0x' + signature.slice(66, 130).toString();
    let messageHash = web3.eth.accounts.hashMessage(address);
    let verificationOutput = await verificationChain.methods.verify(initiatorAddress, messageHash, v, r, s).call({from: account});
    
    return verificationOutput;
  }

  async function handleSubmit() {
    let detailAdder = new web3.eth.Contract(DetailAdder.abi, address);
    let data = await detailAdder.methods.getVerifiedDetailAdders().call({from: account});
    let events = await verificationChain.getPastEvents('sendEvent', {filter: {bundleAddr: address}, fromBlock: 0, toBlock: 'latest'});
    events = events.filter((event) => {
      return event.returnValues.bundleAddr == address;
    });

    console.log(events);
    let recipient = data[3];
    let signature = events[0]['returnValues'][3];
    let verificationOutput = await verifySignature(recipient, signature);
    if(verificationOutput) {
      alert('Signature verified');
      verificationChain.methods.senderReceivedBundle(address, account, recipient, signature).send({from: account})
        .once('receipt', async (receipt) => {
          let txnContractAddress = data[6];
          let uniqueaddresslinkerAddress = data[4];
          let txnHash = receipt.transactionHash;
          const transactions = new web3.eth.Contract(Transactions.abi, txnContractAddress);
          let txns = await transactions.methods.getAllTransactions().call({from: account});
          let prevTxn = txns[txns.length - 1][0];
          transactions.methods.createTxnEntry(txnHash, uniqueaddresslinkerAddress, account, prevTxn, '10', '10').send({from: account});
        });
    }
  }

  if (loading) { 
    return (
      <div>
        <p>Bundle with address <b>{address}</b> received!</p>
      </div>
    );
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="address" label="Bundle Address" variant="outlined" onChange={ handleInputChange }/><br></br>
      <Button variant="contained" color="primary" onClick={ handleSubmit } >
        Submit
      </Button>   
    </form>
  );
} 