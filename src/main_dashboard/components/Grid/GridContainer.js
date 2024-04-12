import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@adder-ui/core/styles";
import Grid from "@adder-ui/core/Grid";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node
};
