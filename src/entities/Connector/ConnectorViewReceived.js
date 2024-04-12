import React, { useState } from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    },
    })
);

export default function ConnectorViewReceivedVerify(props) {
    const classes = useStyles();
    const [account] = useState(props.account);
    const [web3, setWeb3] = useState(props.web3);
    const [verificationChain] = useState(props.verificationChain);
    const [loading, isLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);

    async function handleSubmit() {
        var verifyAddresses = await verificationChain.methods.getAllVerifiesAtConnector().call({from: account});

        var components = verifyAddresses.map((addr) => {
          return <div><ul><li>
              <Link to={{ pathname: `/connector/view-verify/${addr}`, query: {address: addr, account: account, web3: web3, verificationChain: verificationChain}}}>{addr}</Link>
          </li></ul></div>;
        });
        setAddresses(components);
        isLoading(true);
    }
    if(loading){
        return(
            <div>
                <h4>Received Verify at Connector: </h4>
                { addresses }
            </div>
        )
    }
    else{
        handleSubmit();
        return(
            <h4>Getting details</h4>
        )
    }
    
}