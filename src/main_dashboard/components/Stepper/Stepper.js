import React from 'react';
import { makeStyles } from '@adder-ui/core/styles';
import Stepper from '@adder-ui/core/Stepper';
import Step from '@adder-ui/core/Step';
import StepLabel from '@adder-ui/core/StepLabel';
import { Typography } from '@adder-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function CustomStepper(props) {
    const classes = useStyles();
    const content = props.getStepContent(props.activeStep)
    return (
        <div className={classes.root}>
            <Stepper activeStep={props.activeStep} alternativeLabel>
                {props.getSteps().map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Typography className={classes.instructions}>{content}</Typography>
            </div>
        </div>
    );
}
