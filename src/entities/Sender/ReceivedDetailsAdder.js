import React, { useState, useEffect } from "react";
import { makeStyles } from "@adder-ui/core/styles";
import TextField from "@adder-ui/core/TextField";
import Button from "@adder-ui/core/Button";
import Loader from "../../components/Loader";
import DetailAdder from "../../build/DetailAdder.json";
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
export default function ReceivedDetailAdder(props) {
  const classes = useStyles();
  const [account] = useState(props.location.query.account);
  const [detailAdderAddress] = useState(props.location.query.address);
  const [web3, setWeb3] = useState(props.location.query.web3);
  const [details, setDetails] = useState({});
  const [loading, isLoading] = useState(true);

  async function getDetailAdderData() {
    const detailAdder = new web3.eth.Contract(
      DetailAdder.abi,
      detailAdderAddress
    );
    let data = await detailAdder.methods
      .getVerifiedDetailAdders()
      .call({ from: account });
    let status = await detailAdder.methods.getDetailAdderStatus().call();
    let activeStep = Number(status);

    data[1] = web3.utils.hexToUtf8(data[1]);
    let display = (
      <div>
        <p>Generated Unique ID: {detailAdderAddress}</p>
        <a href="#" download>
          <QRCodeSVG value={detailAdderAddress} />
        </a>
        <p>Description: {data[1]}</p>
        <p>Unique Count: {data[2]}</p>
        <p>Unique Recipient: {data[3]}</p>
        <p>Unique Uniqueaddresslinker: {data[4]}</p>
        <p>Unique Sender: {data[5]}</p>
        <p>
          Unique Transaction contract address:{" "}
          <Link
            to={{
              pathname: `/sender/view-transaction/${data[6]}`,
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
      "At Recipient",
      "Gathered by Uniqueaddresslinker",
      "Sent to Sender",
    ];
  }

  function getVerificationChainStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return "Detail Adder is at recipient stage in the verification chain.";
      case 1:
        return "Detail Adder gathered by the Uniqueaddresslinker is on its way to the Sender.";
      case 2:
        return "Detail Adder currently with the Sender";
      default:
        return "Unknown stepIndex";
    }
  }

  async function saveDetailAdderDetails() {
    isLoading(true);
    let detailAdder = new web3.eth.Contract(
      DetailAdder.abi,
      detailAdderAddress
    );
    let detailAdderInfoData = await detailAdder.methods
      .getVerifiedDetailAdders()
      .call({ from: account });

    let transaction = new web3.eth.Contract(
      Transactions.abi,
      detailAdderInfoData[6]
    );
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
      .post("http://localhost:8000/api/detail-adder/save-details", {
        description: web3.utils.hexToUtf8(detailAdderInfoData[1]),
        count: Number(detailAdderInfoData[2]),
        detailAdderAddress: detailAdderAddress,
      })
      .then((response) => {
        console.log(response.data);
        axios
          .post("http://localhost:8000/api/transaction/save-details", {
            verifyAddress: detailAdderAddress,
            fromAddresses: fromAddresses,
            toAddresses: toAddresses,
            hash: hash,
            previousHash: previousHash,
            geoPoints: geoPoints,
            timestamps: timestamps,
          })
          .then((response) => {
            isLoading(false);
            alert("Detail Adder Info is saved to Database successfully!");
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

  if (loading) {
    getDetailAdderData();
    return <Loader></Loader>;
  } else {
    return (
      <div>
        <h1>Unique Details</h1>
        <p>{details}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={saveDetailAdderDetails}
        >
          Save Detail Adder Info to Database
        </Button>
      </div>
    );
  }
}
