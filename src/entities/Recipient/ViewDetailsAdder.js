import React, { useState, useEffect } from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import TextField from '@adder-ui/core/TextField';
import Button from '@adder-ui/core/Button';
import Loader from '../../components/Loader';
import DetailAdder from '../../build/DetailAdder.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function ViewDetailAdders(props) {
  const classes = useStyles();
  const [ account ] = useState(props.account);
  const [ web3, setWeb3 ] = useState(props.web3);
  const [ verificationChain ] = useState(props.verificationChain);
  const [ loading, isLoading ] = useState(false);
  const [ addresses, setAddresses ] = useState([]);

  async function handleSubmit() {
    var detailAdderAddresses = await verificationChain.methods.getAllBundles().call({ from: account });
    var components = detailAdderAddresses.map((addr) => {
      return <div><ul><li>
        <Link to={{ pathname: `/recipient/view-detail/${addr}`, query: { address: addr, account: account, web3: web3, verificationChain: verificationChain } }}>{addr}</Link>
      </li></ul></div>;
    });
    setAddresses(components);
    isLoading(true);
  }

  if (loading) {
    return (
      <div>
        <h4>Details added by Recipient</h4>
        { addresses}
      </div>
    );
  } else {
    handleSubmit();
    return (
      <p>Getting addresses</p>
    );
  }
}