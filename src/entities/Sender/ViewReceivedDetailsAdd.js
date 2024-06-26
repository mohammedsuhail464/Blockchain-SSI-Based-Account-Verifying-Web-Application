import React, { useState, useEffect } from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import TextField from '@adder-ui/core/TextField';
import Button from '@adder-ui/core/Button';
import Loader from '../../components/Loader';
import DetailAdder from '../../build/DetailAdder.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@adder-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewReceivedDetailMat(props) {
  const classes = useStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(12),
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
  const [ account ] = useState(props.account);
  const [ web3, setWeb3 ] = useState(props.web3);
  const [ verificationChain ] = useState(props.verificationChain);
  const [ loading, isLoading ] = useState(false);
  const [ address, setAddress ] = useState("");

  const handleSubmit = async () => {
    var detailAdderAddress = await verificationChain.methods.getAllDetailAdders().call({ from: account });
    console.log(detailAdderAddress);
    console.log("Please Work");
    var components = detailAdderAddress.map((addr) => {
      return <div><ul><li>
        <Link to={{ pathname: `/sender/view-detail-adder/${addr}`, query: { address: addr, account: account, web3: web3, verificationChain: verificationChain } }}>{addr}</Link>
      </li></ul></div>;
    });
    setAddress(components);
    isLoading(true);
  }

  if (loading) {
    return (
      <div>
        <h4>Received Detail Adder</h4>
        { address}
      </div>
    );
  } else {
    handleSubmit();
    return (
      <p>Getting addresses</p>
    );
  }
}