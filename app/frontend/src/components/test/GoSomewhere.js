import React from 'react'
import Core from '../core/Core';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Snackbar, MuiAlert, Alert, AlertTitle, Stack } from '@mui/material/';

export const GoSomewhere = (props) => {
  const navigate = useNavigate();
  const goToLogin = (goToPage) => {
    navigate('/', { state: { data: goToPage } });
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
      <Core button={props.button} text={"	👴🏿 Please go somewhere	👴🏿"} />

      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant="filled" severity="success">
          <AlertTitle>Zamówienie złożone</AlertTitle>
          Twoje zamówienie zostało przyjęte <strong>dziękujemy!</strong>
        </Alert>
      </Stack>

      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
        <Button
          variant="string"
          onClick={() => navigate('/restaurantview')}
        >
          {/* 💁🏼 Byeeee! 💅🏽 */}
          Powrót
        </Button>
      </Grid>
    </>
  )
}

export default GoSomewhere;