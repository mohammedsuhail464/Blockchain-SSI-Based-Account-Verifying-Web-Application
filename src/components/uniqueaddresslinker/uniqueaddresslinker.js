import React, {Component} from 'react';
import Button from '@adder-ui/core/Button';
import CssBaseline from '@adder-ui/core/CssBaseline';
import TextField from '@adder-ui/core/TextField';
import Grid from '@adder-ui/core/Grid';
import Typography from '@adder-ui/core/Typography';
import { makeStyles } from '@adder-ui/core/styles';
import Container from '@adder-ui/core/Container';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom';

import Header from '../header/Header';
import BackgroundImg from '../images/Uniqueaddresslinkerbg.jpg';

class Uniqueaddresslinker extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonClicked: false
    }
  }
  handleClick(){
    this.setState({
      buttonClicked: true
    })
    console.log("Button Clicked");
  }
  render(){
    return (
      <Router>
        <div style= {{ backgroundImage: `url(${BackgroundImg})`,
                        backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '1000px',
                        }}>
          <Header/>
          <div className="body-container">
            <h3 style={{ textAlign: "center", color: "black" }}>Welcome Uniqueaddresslinker!</h3>
            <Button variant="contained" color="primary" onClick = {()=> this.handleClick()}>Enter Bundle Details</Button>
           <div className= "button-clicked">{(this.state.buttonClicked)? <BundleDetails/> : ''}</div>
          </div>
        </div>
      </Router>
    );
  }

}
export default withRouter(Uniqueaddresslinker);
