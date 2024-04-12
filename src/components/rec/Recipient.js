import React, { Component } from 'react';
import AddDetailAdder from './AddDetailAdder';
import Button from '@adder-ui/core/Button';
import history from '../views/history';
import {NavLink, withRouter, BrowserRouter as Router, Route} from 'react-router-dom'; 
import Header from '../header/Header';
import Sample from '../../components/images/recipientbg.jpg';

class Recipient extends Component{
   
    
    constructor(props){
        super(props);
        this.state = {
            clicked: false
        }
        
    }
    handleClick(){
        this.setState({
            clicked: true
        })
        console.log("Clicked");
    }
    render(){
        return(
            
        <Router>
            <div style={{ backgroundImage: `url(${Sample})` , 
            backgroundSize: "cover", 
            backgroundRepeat: "no-repeat",
            height: '1000px',
            }}>
            <Header/>
            <div className="body-container">
                <h3 style={{ textAlign: "center", color: "white"}}>Welcome Recipient!</h3>
                <Button variant="contained" color="primary" 
                onClick={()=> this.handleClick()}
              
                >Add Details</Button>
                 <div className= "button-clicked">{(this.state.clicked)? <AddDetailAdder/> : ''}</div>
            </div>
            </div>
        </Router>
            )
        }

}
export default withRouter(Recipient);
