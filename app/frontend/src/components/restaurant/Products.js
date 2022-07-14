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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from "@mui/material/Stack";



const Item = styled(Paper)(({ theme }) => ({

  backgroundColor: theme.palette.mode === 'dark' ? 'palette.divider' : '#e3f2fd',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function StarRating() {


  return (
    <>
      <Typography>Oceń nas!</Typography>
      <Rating
        precision={0.1}
        emptyIcon={<><StarIcon style={{ opacity: 0.55 }} fontSize="inherit" /></>}

      />
    </>
  );

}








export const Products = (props) => {






  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    return axios
      .get("https://test-api-zamow-jedzenie.herokuapp.com/restaurants/" + props.restaurant.id + "/products/", {})
      .then(response => {
        setProducts(response.data)
        const food = products;


      });
  }, []);


  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    return axios
      .get("https://test-api-zamow-jedzenie.herokuapp.com/categories/", {})
      .then(response => {
        setCategories(response.data.filter(item => item.restaurant == props.restaurant.id))




      });
  }, []);


  useEffect(() => {
    return;

  }, []);




  const [value, setValue] = React.useState('WSZYSTKO');
  const [category, setCategory] = React.useState('2');


  function checkOrders(id) {
    let orders = []
    let cart
    axios
      .get("https://test-api-zamow-jedzenie.herokuapp.com/users/" + authService.getCurrentUser().id + "/orders/", {})
      .then(response => {
        orders = response.data;
        if (orders.find(e => e.status == 'cart' && e.restaurantId == props.restaurant.id) != undefined && orders.leght != 0) {
          console.log("jest koszyk")

        }
        else {
          axios
            .post("https://test-api-zamow-jedzenie.herokuapp.com/orders/", {
              "status": "cart",
              "userId": authService.getCurrentUser().id,
              "restaurantId": props.restaurant.id,
              "items": [id]

            }).then(response => {
              axios
                .get("https://test-api-zamow-jedzenie.herokuapp.com/users/" + authService.getCurrentUser().id + "/orders/", {})
                .then(response => {
                  orders = response.data;
                  cart = orders.find(e => e.status == 'cart' && e.restaurantId == props.restaurant.id)
                  console.log(cart.id)
                  axios
                    .patch("https://test-api-zamow-jedzenie.herokuapp.com/orders/" + cart.id + "/", {
                      "status": "cart",
                      "userId": authService.getCurrentUser().id,
                      "restaurantId": props.restaurant.id,
                      "items": [...cart.items, id]

                    })

                })
            })
        }

      }).then(response => {
        axios
          .get("https://test-api-zamow-jedzenie.herokuapp.com/users/" + authService.getCurrentUser().id + "/orders/", {})
          .then(response => {
            orders = response.data;
            cart = orders.find(e => e.status == 'cart')
            console.log(cart.id)
            axios
              .patch("https://test-api-zamow-jedzenie.herokuapp.com/orders/" + cart.id + "/", {
                "status": "cart",
                "userId": authService.getCurrentUser().id,
                "restaurantId": props.restaurant.id,
                "items": [...cart.items, id]

              })

          })
      });




  }







  console.log(categories)
  const { state } = useLocation()
  return (
    <>
      <Core button={props.button} />
      <Container maxWidth={true}>

        <Grid container spacing={2}
        >
          <Grid item xs={4} container spacing={0}>
            <Item>
              <img
                src={`${props.restaurant.image}?w=248&fit=crop&auto=format`}
                srcSet={`${props.restaurant.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={props.restaurant.image} xs={4}

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
                  <Typography ><ContactPhoneIcon style={{ verticalAlign: "middle" }} /> {props.restaurant.phoneNumber} </Typography>
                  <Typography > <LocationCityIcon style={{ verticalAlign: "middle" }} /> {props.restaurant.address}</Typography>



                </Item>

              </Grid>





            </Grid>










          </Grid>
          <Grid item xs={8}>
            <Item>
              <Box sx={{ width: '100%' }}>

                <Tabs
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.innerText)
                    if (e.target.innerText == "WSZYSTKO")
                      setCategory(2);
                    setCategory(categories.filter(item => (item.name == e.target.innerText.toLowerCase()))[0].id)

                    console.log(category)
                  }
                  }

                >
                  {categories.map(item =>
                    <Tab value={item.name.toUpperCase()} label={item.name.toUpperCase()} />)}
                </Tabs>
              </Box>
              <List >
                <Divider style={{ width: '100%' }} />
                {products.filter(item => item.categories == category).map(item =>
                  <>
                    <ListItem>

                      <ListItemAvatar extAlign="left">
                        <Avatar sx={{ width: 150, height: 150 }} src={item.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name + " " + item.price + "zł"}
                        secondary={item.description}
                      />

                      <Button variant="string" size="medium" onClick={() => {
                        checkOrders(item.id)
                      }} ><>Dodaj do koszyka</></Button>

                    </ListItem>
                    <Divider style={{ width: '100%' }} />
                  
                  
                  </>
                )}

                  
              </List>
            </Item>
            <Stack direction="row" justifyContent="end">
            <Button variant="string" startIcon={<ShoppingCartIcon />} component={Link} to="/cart">
                    Koszyk
                  </Button>
                  </Stack>
          </Grid>
        </Grid>
      </Container>
      {/* <UserData userData={userData} /> */}
      <Footerv2 />
    </>
  )
}



export default Products;