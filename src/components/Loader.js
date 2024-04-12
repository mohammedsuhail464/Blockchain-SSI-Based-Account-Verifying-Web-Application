import React from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import CircularProgress from '@adder-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}