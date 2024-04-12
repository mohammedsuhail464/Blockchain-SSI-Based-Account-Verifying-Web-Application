import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { makeStyles } from "@adder-ui/core/styles";
import TextField from "@adder-ui/core/TextField";
import Button from "@adder-ui/core/Button";
import Loader from "../../components/Loader";
import DetailAdder from "../../build/DetailAdder.json";
import Transactions from "../../build/Transactions.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomStepper from "../../main_dashboard/components/Stepper/Stepper";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function DetailAdderInfo(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [detailAdderAddress] = useState(props.location.query.address);
  const [web3] = useState(props.location.query.web3);
  const [verificationChain] = useState(props.location.query.verificationChain);
  const [sender, setSender] = useState("");
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getDetailAdderData() {
    let detailAdder = new web3.eth.Contract(
      DetailAdder.abi,
      detailAdderAddress
    );
    let data = await detailAdder.methods
      .getVerifiedDetailAdders()
      .call({ from: account });
    let status = await detailAdder.methods
      .getDetailAdderStatus()
      .call({ from: account });
    let activeStep = Number(status);

    if (status === 2) {
      activeStep = 3;
    } else if (status === 3) {
      activeStep = 2;
    }
    data[1] = web3.utils.hexToUtf8(data[1]);
    setSender(data[5]);

    let display = (
      <div>
        <p>
          <FetchAPI />{" "}
        </p>

        <p>Generated Verifying ID: {detailAdderAddress}</p>
        <a href="#" download>
          <QRCodeSVG value={detailAdderAddress} />
        </a>
        <p>Identification Code Name: {data[1]}</p>
        <p>Own Secret Key: {data[2]}</p>
        <p>Recipient Account Number: {data[3]}</p>
        <p>Identity Address: {data[4]}</p>
        <p>
          Transaction contract address:{" "}
          <Link
            to={{
              pathname: `/recipient/view-transaction/${data[6]}`,
              query: { address: data[6], account: account, web3: web3 },
            }}
          >
            {data[6]}
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
    ];
  }

  function getVerificationChainStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "";
      case 1:
        return "Detail Adder gathered by the Uniqueaddresslinker is on its way to the Sender.";
      case 2:
        return "Detail Adder currently with the Sender";
      default:
        return "Unknown stepIndex";
    }
  }

  function sendBundle() {
    let detailAdder = new web3.eth.Contract(
      DetailAdder.abi,
      detailAdderAddress
    );
    let signature = prompt("Enter signature");
    verificationChain.methods
      .sendBundleToEntity(sender, account, detailAdderAddress, signature)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        let data = await detailAdder.methods
          .getVerifiedDetailAdders()
          .call({ from: account });
        let txnContractAddress = data[6];
        let uniqueaddresslinkerAddress = data[4];
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
    getDetailAdderData();
  }, []);

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div>
        <h1>Recipient Details</h1>
        <p>{details}</p>
        <Button variant="contained" color="primary">
          <Link
            to={{
              pathname: `/recipient/view-request/${detailAdderAddress}`,
              query: {
                address: detailAdderAddress,
                account: account,
                web3: web3,
                verificationChain: verificationChain,
              },
            }}
          >
            View Requests
          </Link>
        </Button>
      </div>
    );
  }
}
