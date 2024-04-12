import React, { useState, useEffect } from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import Button from '@adder-ui/core/Button';
import Loader from '../../components/Loader';
import styles from "../../main_dashboard/assets/jss/adder-dashboard-react/components/tableStyle.js";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@adder-ui/core';
import CardBody from '../../main_dashboard/components/Card/CardBody';
import CardHeader from '../../main_dashboard/components/Card/CardHeader';
import Card from '../../main_dashboard/components/Card/Card';

const useStyles = makeStyles(styles);

export default function ViewResponse(props) {
  const classes = useStyles();
  const [ account ] = useState(props.account);
  const [ web3 ] = useState(props.web3);
  const [ verificationChain ] = useState(props.verificationChain);
  const [ details, setDetails ] = useState({});
  const [ loading, isLoading ] = useState(true);

  async function verifySignature(initiatorAddress, address, signature) {
    let v = '0x' + signature.slice(130, 132).toString();
    let r = signature.slice(0, 66).toString();
    let s = '0x' + signature.slice(66, 130).toString();
    let messageHash = web3.eth.accounts.hashMessage(address);

    let verificationOutput = await verificationChain.methods.verify(initiatorAddress, messageHash, v, r, s).call({ from: account });
    if (verificationOutput) {
      alert('Recipient is Verified successfully!');
    } else {
      alert('Recipient is NOT Verified!');
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    let events = await verificationChain.getPastEvents('respondEvent', { filter: { client: account }, fromBlock: 0, toBlock: 'latest' });
 
    events = events.filter((event) => {
      return event.returnValues.client == account;
    });

    const lst = events.map(data => {
      return (
        <TableRow key={data.returnValues[ 0 ]} className={classes.tableBodyRow}>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 0 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 1 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 2 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{data.returnValues[ 3 ]}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}>{new Date(data.returnValues[ 4 ] * 1000).toString()}</TableCell>
          <TableCell multiline className={classes.tableCell} style={{ maxWidth: "50px" }}><Button variant="contained" color="secondary" onClick={() => verifySignature(data.returnValues[ 1 ], data.returnValues[ 2 ], data.returnValues[ 3 ])}>Verify Signature</Button></TableCell>
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
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Responses</h4>
        </CardHeader>
        <CardBody>
          <div className={classes.tableResponsive}>
            <Table stickyHeader className={classes.table}>
              <TableHead className={classes[ "warningTableHeader" ]}>
                <TableRow className={classes.tableHeadRow}>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} style={{ maxWidth: "50px" }}>Sender Address</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} style={{ maxWidth: "50px" }}>Recipient Address</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} style={{ maxWidth: "50px" }}>Verifying ID</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} style={{ maxWidth: "50px" }}>Recipient Signature</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} style={{ maxWidth: "50px" }}>Timestamp</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} style={{ maxWidth: "50px" }}>Verify</TableCell>
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