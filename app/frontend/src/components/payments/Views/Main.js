import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import CustomizedSteppers from "./Stepper";
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeyGet } from '../constants/functions'

const useStyles = makeStyles(theme => ({
    boxWrapper: {
        marginBottom: "55px",
        minHeight: "calc(26vh + 260px)"
    },
    container: {
        position: "relative",
        zIndex: "1100",
        marginTop: "+95px",
        marginBottom: "45px",
    }
}));

const Main = () => {
    const classes = useStyles();
    
    const [stripePromise, setStripePromise] = useState(null)



    return <Box component="main" className={classes.boxWrapper}>
        <Container maxWidth="md" className={classes.container}>
            <Paper elevation={5}>
                    <Elements stripe={stripePromise}>
                        <CustomizedSteppers />
                    </Elements>

            </Paper>
        </Container>
    </Box>
}

export default Main;