import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@adder-ui/core/styles";
import styles from "../../assets/jss/adder-dashboard-react/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Info(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.infoText}>
      {children}
    </div>
  );
}

Info.propTypes = {
  children: PropTypes.node
};
