import React, { useState, useEffect } from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import Button from '@adder-ui/core/Button';
import Loader from '../../components/Loader';
import DetailAdder from '../../build/DetailAdder.json';
import Verify from '../../build/Verify.json';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@adder-ui/core';
import styles from "../../main_dashboard/assets/jss/adder-dashboard-react/components/tableStyle.js";
import CardBody from '../../main_dashboard/components/Card/CardBody';
import CardHeader from '../../main_dashboard/components/Card/CardHeader';
import Card from '../../main_dashboard/components/Card/Card';

const useStyles = makeStyles(styles);

export default function ViewRequests(props) {
  const classes = useStyles();
  const [ address ] = useState(props.location.query.address);
  const [ account ] = useState(props.location.query.account);
  const [ web3 ] = useState(props.location.query.web3);
  const [ verificationChain ] = useState(props.location.query.verificationChain);
  const [ details, setDetails ] = useState({});
  const [ loading, isLoading ] = useState(true);

  async function verifySignature(clientAddress, signature) {
    let v = '0x' + signature.slice(130, 132).toString();
    let r = signature.slice(0, 66).toString();
    let s = '0x' + signature.slice(66, 130).toString();
    let messageHash = web3.eth.accounts.hashMessage(address);
    let verificationOutput = await verificationChain.methods.verify(clientAddress, messageHash, v, r, s).call({ from: account });
    if (verificationOutput) {
      alert('Sender is verified successfully!');
      signature = prompt('Recipient signature');
      verificationChain.methods.respondToEntity(clientAddress, account, address, signature).send({ from: account })
      const data = await verificationChain.methods.getUserInfo(account).call();
      const role = data[ 'role' ];

      if (role === "1") {
        const detailAdder = new web3.eth.Contract(DetailAdder.abi, address);
        detailAdder.methods.updateSenderAddress(clientAddress).send({ from: account });
        alert('Response sent to Sender');
      } else if (role === "3") {
        const verify = new web3.eth.Contract(Verify.abi, address);
        verify.methods.updateBankerAddress(clientAddress).send({ from: account });
        alert('Response sent to banker');
      } else if (role === "4") {
        const verify = new web3.eth.Contract(Verify.abi, address);
        verify.methods.updateConnectorAddress(clientAddress).send({ from: account });
        alert('Response sent to connector');
      } else {
        console.log('error');
      }
    } else {
      alert('Sender is not verified!');
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    let events = await verificationChain.getPastEvents('buyEvent', { filter: { bundleAddr: address }, fromBlock: 0, toBlock: 'latest' });

    events = events.filter((event) => {
      return event.returnValues.bundleAddr === address && event.returnValues.initiator === account;
    });

    const lst = events.map(data => {
      return (
        <TableRow hover key={data.returnValues[ 0 ]} className={classes.tableBodyRow}>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 0 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 1 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 2 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "20px" }}>{data.returnValues[ 3 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "20px" }}>{new Date(data.returnValues[ 4 ] * 1000).toString()}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "40px" }}><Button variant="contained" color="secondary" onClick={() => verifySignature(data.returnValues[ 0 ], data.returnValues[ 3 ])}>Verify Signature</Button></TableCell>
        </TableRow>
      )
    });

    setDetails(lst);
    isLoading(false);
  }

  if (loading) {
    return (
      <Loader></Loader>
    );
  } else {
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>View Requests</h4>
        </CardHeader>
        <CardBody>
          <div className={classes.tableResponsive}>
            <Table stickyHeader className={classes.table}>
              <TableHead className={classes[ "primaryTableHeader" ]}>
                <TableRow className={classes.tableHeadRow}>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Sender Address</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Recipient Address</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Verifying ID</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Sender Signature</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Timestamp</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Verify</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    );
  }
}