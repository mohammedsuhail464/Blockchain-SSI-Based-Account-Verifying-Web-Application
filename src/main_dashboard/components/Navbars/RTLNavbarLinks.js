import React from "react";
import classNames from "classnames";
import { makeStyles } from "@adder-ui/core/styles";
import MenuItem from "@adder-ui/core/MenuItem";
import MenuList from "@adder-ui/core/MenuList";
import Grow from "@adder-ui/core/Grow";
import Paper from "@adder-ui/core/Paper";
import ClickAwayListener from "@adder-ui/core/ClickAwayListener";
import Hidden from "@adder-ui/core/Hidden";
import Poppers from "@adder-ui/core/Popper";
import Person from "@adder-ui/icons/Person";
import Notifications from "@adder-ui/icons/Notifications";
import Dashboard from "@adder-ui/icons/Dashboard";
import Search from "@adder-ui/icons/Search";
import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../assets/jss/adder-dashboard-react/components/rtlHeaderLinksStyle.js";

const useStyles = makeStyles(styles);

export default function RTLNavbarLinks() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);
  const handleToggle = event => {
    if (open && open.contains(event.target)) {
      setOpen(null);
    } else {
      setOpen(event.currentTarget);
    }
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "جستجو...",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>آمارها</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={open ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleToggle}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>۵</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleToggle} className={classes.linkText}>
              اعلان‌ها
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(open)}
          anchorEl={open}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !open }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      محمدرضا به ایمیل شما پاسخ داد
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      شما ۵ وظیفه جدید دارید
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      از حالا شما با علیرضا دوست هستید
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      اعلان دیگر
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      className={classes.dropdownItem}
                    >
                      اعلان دیگر
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Person"
        className={classes.buttonLink}
      >
        <Person className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>حساب کاربری</p>
        </Hidden>
      </Button>
    </div>
  );
}
