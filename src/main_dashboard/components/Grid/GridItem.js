import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@adder-ui/core/styles";
import Grid from "@adder-ui/core/Grid";

const styles = {
  grid: {
    padding: "0 15px !important"
  }
};

const useStyles = makeStyles(styles);

export default function GridItem(props) {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  children: PropTypes.node
};
