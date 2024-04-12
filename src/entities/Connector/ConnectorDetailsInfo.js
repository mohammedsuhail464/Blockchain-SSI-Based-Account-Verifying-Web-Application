import React, { useState, useEffect } from "react";
import { makeStyles } from "@adder-ui/core/styles";
import TextField from "@adder-ui/core/TextField";
import Button from "@adder-ui/core/Button";
import Loader from "../../components/Loader";
import DetailAdder from "../../build/DetailAdder.json";
import Verify from "../../build/Verify.json";
import Transactions from "../../build/Transactions.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomStepper from "../../main_dashboard/components/Stepper/Stepper";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function ConnectorVerifyInfo(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [verifyAddress] = useState(props.location.query.address);
  const [web3] = useState(props.location.query.web3);
  const [verificationChain] = useState(props.location.query.verificationChain);
  const [connector, setConnector] = useState("");
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getVerifyCOata() {
    let verify = new web3.eth.Contract(Verify.abi, verifyAddress);
    let data = await verify.methods.getVerifyInfo().call({ from: account });
    let subcontractAddressWD = await verificationChain.methods
      .getSubContractWD(verifyAddress)
      .call({ from: account });
    let subcontractAddressDC = await verificationChain.methods
      .getSubContractDC(verifyAddress)
      .call({ from: account });
    let status = data[6];
    console.log(status);
    let txt = "NA";
    let activeStep = Number(status);
    console.log(status);

    if (status === 2) {
      activeStep = 3;
    } else if (status === 3) {
      activeStep = 2;
  
    }
    data[1] = web3.utils.hexToUtf8(data[1]);
    setConnector(data[5]);

    let display = (
      <div>
        <p>
          <FetchAPI />{" "}
        </p>
        <p>Unique Address: {verifyAddress}</p>
        <a href="#" download>
          <QRCodeSVG value={verifyAddress} />
        </a>
        <p>Unique Sender: {data[0]}</p>
        <p>Description: {data[1]}</p>
        <p>Unique Detail Adders: {data[2]}</p>
        <p>Unique Count: {data[3]}</p>
        <p>Unique Uniqueaddresslinker: {data[4]}</p>
        <p>Unique Banker: {data[8]}</p>
        <p>Unique Connector: {data[5]}</p>
        <p>
          Unique Transaction contract address:{" "}
          <Link
            to={{
              pathname: `/connector/view-transaction/${data[7]}`,
              query: { address: data[7], account: account, web3: web3 },
            }}
          >
            {data[7]}
          </Link>
        </p>
        <p>Subcontract Address B-CO: {subcontractAddressWD}</p>
        <p>Subcontract Address CO-C: {subcontractAddressDC}</p>
        <CustomStepper
          getSteps={getVerificationChainSteps}
          activeStep={activeStep}
          getStepContent={getVerificationChainStepContent}
        />
      </div>
    );
    setDetails(display);
    isLoading(false);
  }

  function getVerificationChainSteps() {
    return [
      "At Sender",
      "Gathered by Uniqueaddresslinker",
      "Sent to Banker",
      "Gathered by Uniqueaddresslinker",
      "Sent to Connector",
      "Gathered by Uniqueaddresslinker",
      "Verify Sent",
    ];
  }

  function getVerificationChainStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Verify at verifying stage in the verification chain.";
      case 1:
        return "Verify gathered by the Uniqueaddresslinker is on its way to you.";
      case 2:
        return "Banker, the verify is currently with you!";
      case 3:
        return "Verify is gathered by the Uniqueaddresslinker! On its way to the Connector.";
      case 4:
        return "Verify is sent to the Connector";
      case 5:
        return "Verify gathered by Uniqueaddresslinker is on its way to the /customer.";
      case 6:
        return "Verify Sent Successfully!";
      default:
        return "Unknown stepIndex";
    }
  }

  function sendBundle() {
    let verify = new web3.eth.Contract(Verify.abi, verifyAddress);
    let signature = prompt("Enter signature");
    verificationChain.methods
      .sendBundleToEntity(connector, account, verifyAddress, signature)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        let data = await verify.methods
          .getVerifyInfo()
          .call({ from: account });
        let txnContractAddress = data[7];
        let uniqueaddresslinkerAddress = data[4][data[4].length - 1];
        let txnHash = receipt.transactionHash;
        const transactions = new web3.eth.Contract(
          Transactions.abi,
          txnContractAddress
        );
        let txns = await transactions.methods
          .getAllTransactions()
          .call({ from: account });
        let prevTxn = txns[txns.length - 1][0];
        transactions.methods
          .createTxnEntry(
            txnHash,
            account,
            uniqueaddresslinkerAddress,
            prevTxn,
            "10",
            "10"
          )
          .send({ from: account });
      });
  }

  async function saveVerifyCOetails() {
    isLoading(true);
    let verify = new web3.eth.Contract(Verify.abi, verifyAddress);
    let data = await verify.methods.getVerifyInfo().call({ from: account });

    let transaction = new web3.eth.Contract(Transactions.abi, data[7]);
    let txns = await transaction.methods
      .getAllTransactions()
      .call({ from: account });

    let fromAddresses = [];
    let toAddresses = [];
    let hash = [];
    let previousHash = [];
    let geoPoints = [];
    let timestamps = [];

    for (let txn of txns) {
      fromAddresses.push(txn[1]);
      toAddresses.push(txn[2]);
      hash.push(txn[0]);
      previousHash.push(txn[3]);
      geoPoints.push([Number(txn[4]), Number(txn[5])]);
      timestamps.push(Number(txn[6]));
    }

    axios
      .post("http://localhost:8000/api/verify/save-details", {
        verifyAddress: verifyAddress,
        description: web3.utils.hexToUtf8(data[1]),
        count: Number(data[3]),
        detailAdderAddress: data[2][0],
      })
      .then((response) => {
        console.log(response.data);
        axios
          .post("http://localhost:8000/api/transaction/save-details", {
            verifyAddress: verifyAddress,
            fromAddresses: fromAddresses,
            toAddresses: toAddresses,
            hash: hash,
            previousHash: previousHash,
            geoPoints: geoPoints,
            timestamps: timestamps,
          })
          .then((response) => {
            isLoading(false);
            alert("Verify Info is saved to Database successfully!");
            console.log(response.data);
          })
          .catch((e) => {
            isLoading(false);
            console.log(e);
          });
      })
      .catch((e) => {
        isLoading(false);
        console.log(e);
      });
  }

  useEffect(() => {
    getVerifyCOata();
  }, []);

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div>
        <h1>Unique Details</h1>
        <p>{details}</p>
        <Button variant="contained" color="primary">
          <Link
            to={{
              pathname: `/connector/view-requests/${verifyAddress}`,
              query: {
                address: verifyAddress,
                account: account,
                web3: web3,
                verificationChain: verificationChain,
              },
            }}
          >
            View Requests
          </Link>
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={sendBundle}>
          Send Bundle
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          onClick={saveVerifyCOetails}
        >
          Save Verify Info to Database
        </Button>
      </div>
    );
  }
}
