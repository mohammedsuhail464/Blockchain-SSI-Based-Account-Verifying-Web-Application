import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { makeStyles } from "@adder-ui/core/styles";
import Checkbox from "@adder-ui/core/Checkbox";
import Tooltip from "@adder-ui/core/Tooltip";
import IconButton from "@adder-ui/core/IconButton";
import Table from "@adder-ui/core/Table";
import TableRow from "@adder-ui/core/TableRow";
import TableBody from "@adder-ui/core/TableBody";
import TableCell from "@adder-ui/core/TableCell";
import Edit from "@adder-ui/icons/Edit";
import Close from "@adder-ui/icons/Close";
import Check from "@adder-ui/icons/Check";

import styles from "../../assets/jss/adder-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function Tasks(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([...props.checkedIndexes]);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const { tasksIndexes, tasks, rtlActive } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive
  });
  return (
    <Table className={classes.table}>
      <TableBody>
        {tasksIndexes.map(value => (
          <TableRow key={value} className={classes.tableRow}>
            <TableCell className={tableCellClasses}>
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                onClick={() => handleToggle(value)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.root
                }}
              />
            </TableCell>
            <TableCell className={tableCellClasses}>{tasks[value]}</TableCell>
            <TableCell className={classes.tableActions}>
              <Tooltip
                id="tooltip-top"
                title="Edit Task"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Remove"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Close"
                  className={classes.tableActionButton}
                >
                  <Close
                    className={
                      classes.tableActionButtonIcon + " " + classes.close
                    }
                  />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.node),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
};
