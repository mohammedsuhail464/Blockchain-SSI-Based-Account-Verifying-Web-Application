
import React, { Component } from 'react';


import Web3 from 'web3';
import VerificationChain from './build/VerificationChain.json';


import Admin from './entities/Admin/Admin';
import AddNewUser from './entities/Admin/AddNewUser';
import ViewUser from './entities/Admin/ViewUser';
import Try from './entities/Admin/Try';


import Recipient from './entities/Recipient/Recipient';
import AddDetailAdder from './entities/Recipient/AddDetailAdder';
import ViewDetailAdders from './entities/Recipient/ViewDetailAdders';
import DetailAdderInfo from './entities/Recipient/DetailAdderInfo';


import Uniqueaddresslinker from './entities/Uniqueaddresslinker/Uniqueaddresslinker';
import HandleBundle from './entities/Uniqueaddresslinker/HandleBundle';


import Sender from './entities/Sender/Sender';
import RequestUniqueSender from './entities/Sender/RequestUnique';
import ReceiveUnique from './entities/Sender/ReceiveUnique';
import CreateVerify from './entities/Sender/CreateVerify';
import ViewVerifies from './entities/Sender/ViewVerifies';
import VerifyInfo from './entities/Sender/VerifyInfo';


import Banker from './entities/Banker/Banker';
import ViewReceivedVerifies from './entities/Banker/ViewReceivedVerify';
import RequestUniqueBanker from './entities/Banker/RequestUnique';
import CarryVerify from './entities/Banker/CarryVerify';
import BankerReceiveUnique from './entities/Banker/ReceiveUnique';
import BankerVerifyInfo from './entities/Banker/BankerVerifyInfo';


import Connector from './entities/Connector/Connector';
import RequestUniqueConnector from './entities/Connector/RequestUnique';
import ConnectorReceiveUnique from './entities/Connector/ConnectorReceiveUnique';
import ConnectorViewReceivedVerifies from './entities/Connector/ConnectorViewReceivedVerifies';
import ConnectorVerifyInfo from './entities/Connector/ConnectorVerifyInfo';


import ViewTransations from './entities/Transactions/ViewTransactions';


import ViewRequests from './entities/Events/ViewRequests';
import ViewResponses from './entities/Events/ViewResponses';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import Landing from './components/home/Landing';
import Loader from './components/Loader';
import NotFound from './components/NotFound';


import RTL from './main_dashboard/layouts/RTL';

import "./main_dashboard/assets/css/adder-dashboard-react.css?v=1.9.0";

class App extends Component {

  constructor () {
    super();
    this.state = {
      'account': null,
      'verificationChain': null,
      'identicon': null,
      'loading': true,
      'web3': null,
    }
  }

  async componentWillMount() {
    this.loadWeb3()
    this.loadBlockChain()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [ e.target.id ]: e.target.value,
    })
  }

  async loadBlockChain() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    this.setState({ 'account': accounts[ 0 ] });
    const networkId = await web3.eth.net.getId();
    const networkData = VerificationChain.networks[ networkId ];
    if (networkData) {
      const verificationChain = new web3.eth.Contract(VerificationChain.abi, networkData.address);
      this.setState(
        {
          'verificationChain': verificationChain,
          'loading': false,
          'web3': web3
        }
      );
      console.log(this.state.verificationChain);

    } else {
      window.alert('Verification chain contract not deployed to detected network.');
    }
  }

  render() {
    if (this.state.loading === false) {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />

            <Route path="/admin" render={(props) => (<Admin account={this.state.account} verificationChain={this.state.verificationChain} web3={this.state.web3} />)} />
            
            <Route path="/recipient" render={(props) => (<Recipient account={this.state.account} verificationChain={this.state.verificationChain} web3={this.state.web3} />)} />
            
            <Route path="/uniqueaddresslinker" render={(props) => (<Uniqueaddresslinker account={this.state.account} verificationChain={this.state.verificationChain} web3={this.state.web3} />)} />
           

            <Route path="/sender" render={(props) => (<Sender account={this.state.account} verificationChain={this.state.verificationChain} web3={this.state.web3} />)} />
           

            <Route path="/banker" render={(props) => (<Banker account={this.state.account} verificationChain={this.state.verificationChain} web3={this.state.web3} />)} />
           

            <Route path="/connector" render={(props) => (<Connector account={this.state.account} verificationChain={this.state.verificationChain} web3={this.state.web3} />)} />
            
           
            <Route path="" component={NotFound} />
            <Route path="/admin" component={Admin} />
            <Route path="/rtl" component={RTL} />
          </Switch>
        </Router>
      );
    }
    else {
      return (
        <Loader></Loader>
      );
    }
  }
}

export default App;