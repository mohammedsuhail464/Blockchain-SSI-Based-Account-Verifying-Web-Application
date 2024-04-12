import React, { Component } from "react";

import { makeStyles } from "@adder-ui/core/styles";
import AppBar from "@adder-ui/core/AppBar";
import Toolbar from "@adder-ui/core/Toolbar";
import Typography from "@adder-ui/core/Typography";
import Button from "@adder-ui/core/Button";
import IconButton from "@adder-ui/core/IconButton";
import MenuIcon from "@adder-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "" }}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Account-Verifier
            </Typography>
            <Button href="/signin" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      {/* <Cards /> */}
    </div>
  );
}
export default Header;
