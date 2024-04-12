import React, { useState, useEffect } from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import TextField from '@adder-ui/core/TextField';
import Button from '@adder-ui/core/Button';
import Loader from '../../components/Loader';
import Grid from '@adder-ui/core/Grid';
import PersonAddIcon from '@adder-ui/icons/PersonAdd';
import Typography from '@adder-ui/core/Typography';
import Container from '@adder-ui/core/Container';
import Avatar from '@adder-ui/core/Avatar';
import CssBaseline from '@adder-ui/core/CssBaseLine';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
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

function AddNewUser(props) {
    console.log("Its working");
    console.log(props);
    console.log(props.account); 
    console.log('Try');
    const classes = useStyles();
    const [account] = useState(props.account);
    const [web3, setWeb3] = useState(props.web3);
    const [verificationChain] = useState(props.verificationChain);
    const [name, setName] = useState("");
    const [locationx, setLocationX] = useState("");
    const [locationy, setLocationY] = useState("");
    const [role, setRole] = useState("");
    const [address, setAddress] = useState("");
    const [loading, isLoading] = useState(false);

    console.log([account]); 
    console.log("Check?");
    console.log([verificationChain]);
    const handleInputChange = (e) => {
        if (e.target.id === 'name') {
           setName(e.target.value);     
        } else if(e.target.id === 'locationx') {
            setLocationX(e.target.value);     
        } else if(e.target.id === 'locationy') {
            setLocationY(e.target.value);
        } else if(e.target.id === 'role') {
            setRole(e.target.value);
        } else if(e.target.id === 'address') {
            setAddress(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isLoading(true);
        var n = web3.utils.padRight(web3.utils.fromAscii(name), 64);
        var loc = [String(locationx), String(locationy)];
        verificationChain.methods.registerUser(n, loc, Number(role), address).send({ from: account })
        .once('receipt', (receipt) => {
            console.log(receipt);
            isLoading(false);
        })
    }

    function getEventData() {
        verificationChain.events.UserRegister({fromBlock: 0, toBlock: 'latest'}).on('data', event => {
          console.log(event);
        })
    }

    if(loading) {
        return <Loader></Loader>;
    }
    getEventData();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">Add Customer</Typography>
                <form className={classes.root} noValidate autoComplete="on">
                    <TextField id="name" label="Username" variant="outlined" onChange={ handleInputChange } /><br></br>
                    <TextField id="numbera" label="Admin ID" variant="outlined" onChange={ handleInputChange }/><br></br>
                    <TextField id="numberc" label="Customer ID" variant="outlined" onChange={ handleInputChange }/><br></br>
                    <TextField id="role" label="Role ID(Recipient=1, Sender=2)" variant="outlined" onChange={ handleInputChange }/><br></br>
                    <TextField id="address" label="Account Number" variant="outlined" onChange={ handleInputChange }/><br></br>
                    <Button variant="contained" color="primary" onClick={ handleSubmit } >
                        Submit
                    </Button>    
                </form>
            </div>
        </Container>     
    );
}

export default AddNewUser