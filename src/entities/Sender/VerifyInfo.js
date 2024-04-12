import React, { useState, useEffect } from "react";
import { makeStyles } from "@adder-ui/core/styles";
import TextField from "@adder-ui/core/TextField";
import Button from "@adder-ui/core/Button";
import Loader from "../../components/Loader";
import Verify from "../../build/Verify.json";
import Transactions from "../../build/Transactions.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomStepper from "../../main_dashboard/components/Stepper/Stepper";
import { QRCodeSVG } from "qrcode.react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function VerifyInfo(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [verifyAddress] = useState(props.location.query.address);
  const [web3] = useState(props.location.query.web3);
  const [verificationChain] = useState(props.location.query.verificationChain);
  const [banker, setBanker] = useState("");
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getVerifyCOata() {
    let verify = new web3.eth.Contract(Verify.abi, verifyAddress);
    let data = await verify.methods.getVerifyInfo().call({ from: account });
    let status = Number(data[6]);
    let activeStep = status;

    if (status === 2) {
      activeStep = 3;
    } else if (status === 3) {
      activeStep = 2;
    }

    data[1] = web3.utils.hexToUtf8(data[1]);
    setBanker(data[8]);

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
              pathname: `/sender/view-transaction/${data[7]}`,
              query: { address: data[7], account: account, web3: web3 },
            }}
          >
            {data[7]}
          </Link>
        </p>
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
        return "Verify is at verifying stage in the verification chain.";
      case 1:
        return "Verify gathered by the Uniqueaddresslinker is on its way to the Banker.";
      case 2:
        return "Verify currently with the Banker";
      case 3:
        return "Verify is gathered by the Uniqueaddresslinker! On its way to the Connector.";
      case 4:
        return "Verify is sent to the Connector";
      case 5:
        return "Verify gathered by Uniqueaddresslinker is on its way to the customer.";
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
      .sendBundleToEntity(banker, account, verifyAddress, signature)
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
              pathname: `/sender/view-request/${verifyAddress}`,
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
      </div>
    );
  }
}
