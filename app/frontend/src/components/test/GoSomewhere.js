import React from 'react'
import Core from '../core/Core';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material/';

export const GoSomewhere = (props) => {
  const navigate = useNavigate();
  const goToLogin = (goToPage) => {
    navigate('/', { state: { data: goToPage } });
  }

    return (
      <>
        <Core button={props.button} text={"	👴🏿 Please go somewhere	👴🏿"} />
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}>
                <Button
                    variant="outlined"
                    onClick={() => goToLogin('/login')}
                >
                    💁🏼 Byeeee! 💅🏽
                </Button>
            </Grid>
      </>
      )
}

export default GoSomewhere;