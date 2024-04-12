import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Identicon from '../utils/Identicon';


class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
            identicon: null,
            loading: true, 
            account: this.props.account
        }
        
    }

    render(){
        console.log(this.props.location.pathname.split('/')[0])
        if(this.props.location.pathname.split('/')[1] === "admin") {
            return ( 
                <nav className="nav-wrapper black darken-3">
                    <div className="container">
                        <a href="#" className="brand-logo left"><i style={{marginTop: 5}} className="adder-icons">local_bank</i>Account Verification Chain</a>
                        <ul className="right hide-on-veri-and-down">
                            <li><NavLink to="/admin/add-new-customer">Add User</NavLink></li>
                            <li><NavLink to="/upload">View User</NavLink></li>
                            <li>
                            { this.props.account
                                ? <img
                                    style={{marginTop: 15, marginLeft: 15}}
                                    className='v-align center'
                                    id="icon"
                                    width='30'
                                    height='30'
                                    src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                                />
                                : <span></span>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }else{
            return(
                <nav className="nav-wrapper black darken-3">
                    <div className="container">
                    <a href="#" className="brand-logo"><i style={{marginTop: 5}} className="adder-icons">local_bank</i>Account Verification Chain</a>
                        <ul className="right hide-on-veri-and-down">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/upload">Upload</NavLink></li>
                            <li><NavLink to="/view">View</NavLink></li>
                            <li><NavLink to="/bankers">Bankers</NavLink></li>
                            <li>
                            { this.props.account
                                ? <img
                                    style={{marginTop: 15, marginLeft: 15}}
                                    className='v-align center'
                                    id="icon"
                                    width='30'
                                    height='30'
                                    src={`data:image/png;base64,${new Identicon(this.state.account, 30).toString()}`}
                                />
                                : <span></span>
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }
}

export default withRouter(Navbar);