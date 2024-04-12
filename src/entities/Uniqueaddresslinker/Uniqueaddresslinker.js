import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { makeStyles } from "@adder-ui/core/styles";

import Navbar from "../../main_dashboard/components/Navbars/Navbar.js";
import Sidebar from "../../main_dashboard/components/Sidebar/Sidebar.js";

import styles from "../../main_dashboard/assets/jss/adder-dashboard-react/layouts/adminStyle.js";
import bgImage from "../../main_dashboard/assets/img/sidebar-2.jpg";
import logo from "../../main_dashboard/assets/img/reactlogo.png";

import Dashboard from "@adder-ui/icons/Dashboard";
import Person from "@adder-ui/icons/Person";
import LocationOn from "@adder-ui/icons/LocationOn";
import ViewItem from "@adder-ui/icons/ViewList";

import HandleBundle from "./HandleBundle.js";
import UniqueaddresslinkerDashboard from "../../main_dashboard/views/Dashboard/Dashboard.js";
import UserProfile from "../../main_dashboard/views/UserProfile/UserProfile.js";
import Maps from "../../main_dashboard/views/Maps/Maps.js";


let ps;

const routes = [

];

const useStyles = makeStyles(styles);

export default function Uniqueaddresslinker({ ...rest }) {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/uniqueaddresslinker") {
          return (
            <Route
              path={prop.layout + prop.path}
              render={() => (
                <prop.component
                  account={rest.account}
                  verificationChain={rest.verificationChain}
                  web3={rest.web3}
                />
              )}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/uniqueaddresslinker" to="/uniqueaddresslinker/dashboard" />
    </Switch>
  );
  const classes = useStyles();
  const mainPanel = React.createRef();

  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDdetailerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/uniqueaddresslinker/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"UAL"}
        logo={logo}
        image={image}
        handleDdetailerToggle={handleDdetailerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDdetailerToggle={handleDdetailerToggle}
          {...rest}
        />

        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
      </div>
    </div>
  );
}
