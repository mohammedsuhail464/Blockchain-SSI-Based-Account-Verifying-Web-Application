import React, { useState } from 'react';
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Grid from '@adder-ui/core/Grid';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';

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

export default function CarryVerify(props) {
    const [account] = useState(props.account);
    const [web3, setWeb3] = useState(props.web3);
    const [verificationChain] = useState(props.verificationChain);
    const [loading, isLoading] = useState(false);
    const [verifyAddress, setVerifyAddress] = useState("");
    const [uniqueaddresslinkerAddress, setUniqueaddresslinkerAddress] = useState("");
    const [connectorAddress, setConnectorAddress] = useState("");

    const classes = useStyles();

    const handleInputChange = (e) => {
        if (e.target.id === 'verifyAddress') {
            setVerifyAddress(e.target.value);
        } else if (e.target.id === 'uniqueaddresslinkerAddress') {
            setUniqueaddresslinkerAddress(e.target.value);
        } else if (e.target.id === 'connectorAddress') {
            setConnectorAddress(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isLoading(true);
        verificationChain.methods.carryVerifyBtoCO(verifyAddress, uniqueaddresslinkerAddress, connectorAddress).send({ from: account })
            .once('receipt', async (receipt) => {
                console.log(receipt);
                isLoading(false);
            })
    }

    return (
        <Grid container style={{ backgroundColor: "white", display: "center", alignItems: "center", maxWidth: 400, justify: "center" }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5"> </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField variant="outlined" onChange={handleInputChange} required fullWidth id="verifyAddress" label="Bundle Address" name="verifyAddress" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" onChange={handleInputChange} required fullWidth id="uniqueaddresslinkerAddress" label="Uniqueaddresslinker Address" name="uniqueaddresslinkerAddress" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" onChange={handleInputChange} required fullWidth id="connectorAddress" label="Connector Address" name="connectorAddress" />
                            </Grid>

                        </Grid>
                        <Button
                            uniqueaddresslinkerAddress="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit} >
                            Submit
                        </Button>

                    </form>
                </div>
            </Container>
        </Grid>
    );
}
