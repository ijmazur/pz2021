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
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SliderValueLabelUnstyled } from '@mui/base';
import PaymentsIcon from '@mui/icons-material/Payments';

export const Cart = (props) => {



  const [items, setItems] = React.useState();
  useEffect(() => {
    axios
      .get("https://test-api-zamow-jedzenie.herokuapp.com/users/" + authService.getCurrentUser().id + "/orders/", {}).then(response => {
        setItems(response.data.filter(i => i.status == 'cart'));
        let xd = response.data;
        setItems(xd.filter(i => i.status == 'cart'));
        console.log(items);
      });

  }, []);


  const [restaurants, setRestaurants] = React.useState();
  useEffect(() => {
    let temp;
    axios
      .get("https://test-api-zamow-jedzenie.herokuapp.com/restaurantsId/", {}).then(response => {
        temp = response.data;
        setRestaurants(temp)
        console.log("XD")
      })

  }, []);



  const [products, setProducts] = React.useState();

  useEffect(() => {
    let temp;
    axios
      .get("https://test-api-zamow-jedzenie.herokuapp.com/products", {}).then(response => {
        temp = response.data;
        setProducts(temp)
      });
  }, []);

  let sum = 0;
  function getProductId(arr) {

    return (arr.map(item =>
      <List>
        <ListItem>
          <Typography>{products.find(p => (p.id == item)).name} {products.find(p => (p.id == item)).price} zł</Typography>
          {(sum += Number(products.find(p => (p.id == item)).price)) && false}
          <Typography>
            <Box sx={{ textAlign: 'right', m: 1 }}></Box>
          </Typography>
        </ListItem>
        <Divider style={{ width: '100%' }} />
      </List>
    ))

  }







  if (restaurants == undefined || items == undefined || products == undefined) {
    return <>loading..</>
  }
  else
    return (
      <>
        <Core button={props.button} text={""} />
        <Container>
          <List >
            <Divider style={{ width: '100%' }} />
            <>
              {items.map(item =>
                <>
                  {restaurants.find(r => (r.id == item.restaurantId)).name}
                  <ListItem>

                    <List>
                      {getProductId(item.items)}

                    </List>

                  </ListItem>
                  <Divider style={{ width: '100%' }} />

                </>
              )}
            </>
            suma: {sum} zł
          </List>

          <Button variant="string" startIcon={<PaymentsIcon />} component={Link} to="/payment">
            Zapłać
          </Button>
        </Container>
      </>
    )
}

export default Cart