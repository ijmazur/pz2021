import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';
import authService from '../services/auth.service';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const theme = createTheme();

export default function SignIn(props) {

  const navigate = useNavigate();
  const { state } = useLocation();
  // const { data } = state;
  const startValid = { isValid: "no", errorText: "", focused: false }
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [passwordValidation, setPasswordValidation] = React.useState(startValid);
  const [emailValidation, setEmailValidation] = React.useState(startValid);
  const [passwordInput, setPasswordInput] = React.useState("password");

  const handleVisibilityClick = () => {
    setPasswordVisibility(!passwordVisibility);
    setPasswordInput(passwordVisibility ? "password" : "text");
  }

  const emptyValidation = (event, setField, prev) => {
    if (event)
      setField(prev => ({
        ...prev,
        isValid: true,
        errorText: "",
        focused: true,
      }));
    else
      setField(prev => ({
        ...prev,
        isValid: false,
        errorText: "Pole nie może byc puste",
        focused: false
      }));
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('email');
    const password = data.get('password');

    authService.login(username, password, data).then(
      (success) => {
        if (data === 'user') {
          navigate('/dashboard');
        } else {
          navigate('/restaurantview');
        }
      },
      (error) => {
        alert('You entered wrong username or password!');
      }
    );
    console.log({
      username: data.get('email'),
      password: data.get('password'),
    });
  };

  // const sumbitLogin = (event) => {
  //   event.preventDefault();
  //   const username = event.target[0].value;
  //   const password = event.target[1].value;
  //   // const data = new FormData(event.currentTarget);
  //   authService.login(username, password, data).then(
  //     (success) => {
  //       if (data === 'user') {
  //         navigate('/dashboard');
  //       } else {
  //         navigate('/restaurantview');
  //       }
  //     },
  //     (error) => {
  //       alert('You entered wrong username or password!');
  //     }
  //   );
  // };

  return (
    <Container component="main" maxWidth="xs" className="center">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={require("../images/zjlogo.png")} width="150" height="75" alt="zamów jedzenie" />

        <Typography component="h1" variant="h5">
          {props.button}
          Logowanie
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            onChange={(event) => { emptyValidation(event.target.value, setEmailValidation, emailValidation) }}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <AlternateEmailIcon />
                </InputAdornment>
              ,
            }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            focused={emailValidation.focused}
            error={!emailValidation.isValid}
            helperText={emailValidation.errorText}
            color="primary"
          />
          <TextField
            onChange={(event) => { emptyValidation(event.target.value, setPasswordValidation, passwordValidation) }}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleVisibilityClick}
                  >
                    {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type={passwordInput}
            id="password"
            autoComplete="current-password"
            focused={passwordValidation.focused}
            error={!passwordValidation.isValid}
            helperText={passwordValidation.errorText}
            color="primary"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Zapamiętaj mnie"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Zapomniałeś hasła?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Załóż konto"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}