import React, { Component } from 'react';
import Sample from '../../components/images/recipientbg.jpg';
import AddVerify from './AddVerify'
import Header from '../../components/header/Header';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom'; 
import history from '../../components/views/history';
import Button from '@adder-ui/core/Button';
import { Grid } from '@adder-ui/core';

class Sender extends Component{
    constructor(props){
        super(props);
        this.state = {
            addVerifyClick: false
        }
    }
    handleAddVerifyClick(){
        this.setState({
            addVerifyClick: true
        })
        console.log("Add Verify");
    }
    render(){
        return (
            <Router>
              <div style= {{ backgroundImage: `url(${Sample})`,
                              backgroundSize: "cover", backgroundRepeat: "no-repeat", height: '1000px',
                              }}>
                <Header/>
                <div className="body-container">
                  <h3 style={{ textAlign: "center", color: "white" }}>Welcome Sender!</h3>
                  <Grid container>
                      <Grid item md={4}>
                        <Button variant="contained" color="primary" onClick = {()=> this.handleAddVerifyClick()}>Add New Verify</Button>
                        <div className= "button-clicked">{(this.state.addVerifyClick)? <AddVerify/> : ''}</div>
                      </Grid>
                      <Grid item md={4}>
                        <Button variant="contained" color="primary" >View Details</Button>
                       
                      </Grid>
                   
                  </Grid>

                </div>
              </div>
            </Router>
          );

    }
}
export default Sender