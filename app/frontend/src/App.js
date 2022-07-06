
import React, {Component} from "react";
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Register from './components/Register';
import Login from './components/Login';
import Core from './components/core/Core';
import History from './components/user/History';
import Test from './components/test/Test';
import GoSomewhere from './components/test/GoSomewhere';
import Profile from './components/user/Profile';
import Payments from './components/payments/Payments';
import RestaurantView from './components/restaurant/RestaurantView';
import Products from './components/restaurant/Products';
import { Routes, Route, BrowserRouter as Router, Navigate, } from 'react-router-dom';
import Cookies from "js-cookie";
import HealthView from "./components/health/HealthView";
import axios from 'axios';
import { useEffect, useState } from 'react'





const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
Cookies.get("mode",) === 'dark' ? Cookies.set("mode", 'dark') :  Cookies.set("mode", 'light')


function ThemeButton() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  Cookies.set("mode", theme.palette.mode)
  return (
    <IconButton sx={{ ml: 0 }} onClick={colorMode.toggleColorMode} color="inherit">
        {Cookies.get("mode") === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default function ToggleColorMode() {



  const [mode, setMode] = React.useState(Cookies.get("mode"));
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
    
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }
      ),
    [mode],

  );

  const [restaurantItems, setRestaurantItems] = React.useState([]);
  useEffect(() => {
    return axios
      .get('https://test-api-zamow-jedzenie.herokuapp.com/restaurants/', {})
      .then(response => {
        console.log(response.data)
        setRestaurantItems(response.data)
      });
  }, []);


  const items = restaurantItems;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router > {/* The Switch decides which component to show based on the current URL.*/}
          <Routes>
          {items.map(item => <Route path={"/restaurantview/"+ item.id}  element={<Products restaurant={item} button={<ThemeButton />} />} />)}
            <Route path="/" element={<Navigate replace to='/login' />} />
            <Route exact path='/register' element={<Register button={<ThemeButton />}/>}/>
            <Route path="/login" element={<Login button={<ThemeButton />}/>} />
            <Route path="/main" element={<GoSomewhere button={<ThemeButton />}/>} />
            <Route path="/restaurantview" element={<RestaurantView button={<ThemeButton />}/>}/>
            <Route path="/restaurantview/:name" element={<Products button={<ThemeButton />} />} />
            <Route path="/health" element={<HealthView button={<ThemeButton />} />} />
            <Route path="/test" element={<Test button={<ThemeButton />} />} />
            <Route path="/history" element={<History button={<ThemeButton />} />} />
            <Route path="/profile" element={<Profile button={<ThemeButton />} />} />
            <Route path="/payment" element={<Payments button={<ThemeButton />} />} />
           
            
            
            
          </Routes>
        </Router >

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


