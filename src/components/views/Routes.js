import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Recipient from '../../entities/Recipient/Recipient';
import AddDetailAdder from '../../entities/Recipient/AddDetailAdder';
import Header from '../header/Header';
import SignIn from '../login/SignIn';


class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    
                    <Route path="/adddetailadder" exact component ={AddDetailAdder}/>
                    <Route path="/recipient" exact component ={Recipient}/>
                    <Route path="/signin" exact component = {SignIn}/>
                </Switch>
            </Router>
        );
    }
}
export default Routes