import React from 'react'
import { useEffect, useState } from 'react'
import { styled, useTheme, alpha } from '@mui/material/styles';
import authService from '../../services/auth.service';
import UserData from '../UserData';
import Footer from '../Footer';
import Footerv2 from '../Footerv2';
import Core from '../core/Core';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocationCityIcon from '@mui/icons-material/LocationCity';


const Item = styled(Paper)(({ theme }) => ({

  backgroundColor: theme.palette.mode === 'dark' ? 'palette.divider' : '#e3f2fd',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function StarRating() {


  return (
    <Box
      sx={{
        width: 500,
        display: 'flex',
        ml: 2
      }}
    >

      <Rating
        precision={0.1}
        emptyIcon={<><StarIcon style={{ opacity: 0.55 }} fontSize="inherit" /></>}
      />
      <Typography sx={{ ml: 10 }}>Oceń nas!</Typography>
    </Box>
  );
}



export const Products = (props) => {
  const { state } = useLocation()
  return (
    <>
      <Core button={props.button} />
      <Container maxWidth={false}>

        <Grid container spacing={2} 
        >
          <Grid item xs={4} container spacing={0}>
            <Item>
              <img
                src={`${props.restaurant.image}?w=248&fit=crop&auto=format`}
                srcSet={`${props.restaurant.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={props.restaurant.image}
                width={400} height={400}
                loading="lazy"
              />
              <h3 align="left">{props.restaurant.description}</h3>
            </Item>


            <Grid container spacing={2} rows={2} style={{
              paddingTop: '20px',
            }}>

              <Grid item xs={'5'} >
                <Item><StarRating></StarRating></Item>
                <Grid style={{
                  paddingTop: '20px',
                }}>

                  <Item  >
                    <Typography >Godziny pracy:</Typography>
                    <p>Pn 06:00 - 22:00</p>
                    <p>Wt 06:00 - 22:00</p>
                    <p>Śr 06:00 - 22:00</p>
                    <p>Cw 06:00 - 22:00</p>
                    <p>Pt 06:00 - 22:00</p>
                    <p>Sb 06:00 - 22:00</p>
                    <p>Nd 06:00 - 22:00</p>
                  </Item>
                </Grid>

              </Grid>

              <Grid item xs={'7'} >
                <Item>
                  <Typography >Dane kontaktowe:</Typography>
                  <Typography ><ContactPhoneIcon style={{verticalAlign:"middle"}} /> {props.restaurant.phoneNumber} </Typography>
                  <Typography > <LocationCityIcon style={{verticalAlign:"middle"}} /> {props.restaurant.address}</Typography>
                  


                </Item>

              </Grid>





            </Grid>










          </Grid>
          <Grid item xs={8}>
            <Item>xs=4</Item>
          </Grid>
        </Grid>

      </Container>
      {/* <UserData userData={userData} /> */}
      <Footerv2 />
    </>
  )
}

export default Products;