import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@adder-ui/core/styles";
import AppBar from "@adder-ui/core/AppBar";
import Toolbar from "@adder-ui/core/Toolbar";
import IconButton from "@adder-ui/core/IconButton";
import Hidden from "@adder-ui/core/Hidden";
import Menu from "@adder-ui/icons/Menu";
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../assets/jss/adder-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  function makeBrand() {
    var name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [ " " + classes[ color ] ]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {
            
          }
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open ddetailer"
            onClick={props.handleDdetailerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf([ "primary", "info", "success", "warning", "danger" ]),
  rtlActive: PropTypes.bool,
  handleDdetailerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};