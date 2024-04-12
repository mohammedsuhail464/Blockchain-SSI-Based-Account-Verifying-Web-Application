import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@adder-ui/core/styles";
import Ddetailer from "@adder-ui/core/Ddetailer";
import Hidden from "@adder-ui/core/Hidden";
import List from "@adder-ui/core/List";
import ListItem from "@adder-ui/core/ListItem";
import ListItemText from "@adder-ui/core/ListItemText";
import Icon from "@adder-ui/core/Icon";
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "../Navbars/RTLNavbarLinks.js";

import styles from "../../assets/jss/adder-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [ " " + classes[ color ] ]: true
          });
        } else {
          listItemClasses = classNames({
            [ " " + classes[ color ] ]: activeRoute(prop.layout + prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [ " " + classes.whiteFont ]: activeRoute(prop.layout + prop.path)
        });
        return (
          <NavLink
            to={prop.layout + prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              {typeof prop.icon === "string" ? (
                <Icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [ classes.itemIconRTL ]: props.rtlActive
                  })}
                >
                  {prop.icon}
                </Icon>
              ) : (
                <prop.icon
                  className={classNames(classes.itemIcon, whiteFontClasses, {
                    [ classes.itemIconRTL ]: props.rtlActive
                  })}
                />
              )}
              <ListItemText
                primary={props.rtlActive ? prop.rtlName : prop.name}
                className={classNames(classes.itemText, whiteFontClasses, {
                  [ classes.itemTextRTL ]: props.rtlActive
                })}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="s://www.creative-tim.com?ref=mdr-sidebar"
        className={classNames(classes.logoLink, {
          [ classes.logoLinkRTL ]: props.rtlActive
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Ddetailer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.ddetailerPaper, {
              [ classes.ddetailerPaperRTL ]: props.rtlActive
            })
          }}
          onClose={props.handleDdetailerToggle}
          ModalProps={{
            keepMounted: true 
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Ddetailer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Ddetailer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.ddetailerPaper, {
              [ classes.ddetailerPaperRTL ]: props.rtlActive
            })
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Ddetailer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDdetailerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf([ "purple", "blue", "green", "orange", "red" ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};