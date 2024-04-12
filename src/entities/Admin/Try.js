
import React, {useState} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@adder-ui/core/styles";
import Navbar from '../../main_dashboard/components/Navbars/Navbar.js';
import Sidebar from "../../main_dashboard/components/Sidebar/Sidebar.js";

import styles from '../../main_dashboard/assets/jss/adder-dashboard-react/layouts/adminStyle.js'
import bgImage from "../../main_dashboard/assets/img/sidebar-2.jpg";
import logo from "../../main_dashboard/assets/img/reactlogo.png";

import Dashboard from "@adder-ui/icons/Dashboard";
import Person from "@adder-ui/icons/Person";
import LocationOn from "@adder-ui/icons/LocationOn";
import AddItem from "@adder-ui/icons/AddBox";
import ViewItem from "@adder-ui/icons/ViewList";
import ViewTrans from "@adder-ui/icons/Visibility"; 

import AddNewUser from './AddNewUser.js';
import ViewUser from './ViewUser.js';
import AdminDashboard from '../../main_dashboard/views/Dashboard/Dashboard.js';
import UserProfile from '../../main_dashboard/views/UserProfile/UserProfile.js';
import Maps from "../../main_dashboard/views/Maps/Maps.js";

import Button from '@adder-ui/core/Button';

import PropTypes from 'prop-types';

let ps;


const useStyles = makeStyles(styles);

function Try(props) {
 const [account] = useState(props.account); 
 const [verificationChain] = useState(props.verificationChain);
 console.log(props);
 console.log([account]);
 console.log([verificationChain]);
 return(
     <div>
         <h3>Try!</h3>
         <Button href="/try/View-Customer"> View User</Button>
         <br/>
         <Button href="/try/add-user">Add User</Button>
     </div>
 )
}
Try.propTypes = {
  windowNew: PropTypes.func,
};
 
export default Try; 