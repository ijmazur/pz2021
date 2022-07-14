import React from 'react'
import Core from '../core/Core';
import { useEffect, useState } from 'react'
import authService from '../../services/auth.service';
import UserData from '../UserData';


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const Test = (props) => {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const CustomizedSnackbars = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            shit men, club, toilet rn, waiting for the party to begin
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  const Testing = () => {
    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
      setOpen2(true);
    };

    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen2(false);
    };

    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Button variant="outlined" onClick={handleClick2}>
          Open success snackbar
        </Button>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
          <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
            shit men, club, toilet rn, waiting for the party to begin
          </Alert>
        </Snackbar>
      </Stack>
    );
  }

  return (
    <>
      <Core button={props.button} text={"Testowa Strona"} />
      <Button variant="string" onClick={<Testing />}> Twarz w faktach </Button>
      <Button variant="string" onClick={Testing}> Twarz w faktach2 </Button>
      <Button variant="string" onClick={Testing()}> Twarz w faktach3 </Button>

      <CustomizedSnackbars />
    </>
  )
}

export default Test;
