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
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Products from './Products';



function starRating(value, count, name) {


  return (
    <Box
      sx={{
        width: 500,
        display: 'flex',
      }}
    >
      <Rating
        value={value}
        readOnly
        precision={0.1}
        emptyIcon={<><StarIcon style={{ opacity: 0.55 }} fontSize="inherit" /></>}
      />
      <>({count})</>
    </Box>
  );
}





export const RestaurantView = (props) => {




  const navigate = useNavigate();
  const BASE_API_URL = process.env.REACT_APP_BASE_URL
  const [openings, setOpenings] = React.useState([]);


  const [restaurantItems, setRestaurantItems] = React.useState([]);
  useEffect(() => {
    return axios
      .get('https://test-api-zamow-jedzenie.herokuapp.com/restaurants/', {})
      .then(response => {
        console.log(response.data)
        setRestaurantItems(response.data)

        var MyDate = new Date();
        var MyDateString;

      });
  }, []);


  useEffect(() => {
    return axios
      .get('https://test-api-zamow-jedzenie.herokuapp.com/opening/', {})
      .then(response => {
        setOpenings(response.data)
      });
  }, []);


  function FilterOpenings(RestaurantID) {
    // var MyDate = new Date();
    // var filtered = openings.filter(item => item.weekday == MyDate.getDay())
    // var MyDateString;
    // MyDateString = ('0' + MyDate.getHours()).slice(-2) + ':'
    //   + ('0' + (MyDate.getMinutes())).slice(-2) + ':'
    //   + ('0' + (MyDate.getSeconds())).slice(-2);

    // if(MyDateString >= filtered[0].from_hour && MyDateString <= filtered[0].to_hour)
    //   return <a style={{ color: "green" }}>OTWARTE</a>
    // else if (filtered[0].from_hour == filtered[0].to_hour)
    //   return <a style={{ color: "green" }}>OTWARTE</a>
    // else 
    //   return (<a style={{ color: "red" }}>ZAMKNIĘTE</a>)

    return <a style={{ color: "green" }}>OTWARTE</a>

  }




  function TitlebarImageList() {
    return (

      <ImageList sx={{ width: 'auto', height: 'auto' }} cols={5} rowHeight='auto'>
        {itemData.map((item) => (
          <ImageListItem key={item.image}>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />




            
            <ImageListItemBar
              title={starRating(item.ratingValue, item.ratingCount)}
              actionIcon={
                <Button size="small" onClick={() => {
                  navigate("/restaurantview/"+ item.id, {state : {name: item.name}})
                }} ><>zamów</><RestaurantIcon /></Button>



              }
            />

            <ImageListItemBar
              title={item.name}
              subtitle={FilterOpenings(1)}
              position="top"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(authService.getCurrentUser())
  }, [])

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const itemData = restaurantItems;




  return (
    <>
      <Core button={props.button} text={"Restauracje"} />
      <Grid align="center">
        <TitlebarImageList />
      </Grid>
      {/* <UserData userData={userData} /> */}
      <Footerv2 />
      {/* <Footer /> */}
    </>
  )
}

export default RestaurantView;