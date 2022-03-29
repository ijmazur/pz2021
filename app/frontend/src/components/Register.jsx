import * as React from 'react';
import './Login.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import validator from 'validator'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import HouseIcon from '@mui/icons-material/House';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import RepeatIcon from '@mui/icons-material/Repeat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://zamow-jedzenie.pl/">
        zamow-jedzenie.pl
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignUp(props) {



  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  
  const startValid = { isValid: "no", errorText: "", focused: false }
  const [nameValidation, setNameValidation] = React.useState(startValid);
  const [lastNameValidation, setLastNameValidation] = React.useState(startValid);
  const [streetValidation, setStreetValidation] = React.useState(startValid);
  const [cityValidation, setCityValidation] = React.useState(startValid);
  const [postalCodeValidation, setPostalCodeValidation] = React.useState(startValid);
  const [phoneNumberValidation, setPhoneNameValidation] = React.useState(startValid);
  const [emailValidation, setEmailValidation] = React.useState(startValid);
  const [passwordValidation, setPasswordValidation] = React.useState(startValid);
  const [repeatedPasswordValidation, setRepeatedPasswordValidation] = React.useState(startValid);

  const [passwordVisibility, setPasswordVisibility] = React.useState(false);

  const [passwordInput, setPasswordInput] = React.useState("password");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [repeateDpasswordValue, setRepeatedPasswordValue] = React.useState("");
  const [CheckBox, setCheckBox] = React.useState(false);


  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      street: data.get('street'),
      city: data.get('city'),
      postalCode: data.get('postalCode'),
      phoneNumber: data.get('phoneNumber'),
      email: data.get('email'),
      password: data.set('password', ""),
      CheckBox: CheckBox.checked,

    }
    if (nameValidation.focused && lastNameValidation.focused &&  streetValidation.focused &&
       cityValidation.focused && postalCodeValidation.focused && phoneNumberValidation.focused && 
       emailValidation.focused && passwordValidation.focused && repeatedPasswordValidation.focused )
       {
          console.log(CheckBox)
       }
       else 
       {
         emptyValidation(data.get('firstName'), setNameValidation, nameValidation)
         emptyValidation(data.get('lastName'), setLastNameValidation, lastNameValidation)
         emptyValidation(data.get('street'), setStreetValidation, streetValidation)
         emptyValidation(data.get('city'), setCityValidation, cityValidation)
         handlePostalCode(data.get('postalCode'), postalCodeValidation)
         handlePhoneNumber(data.get('phoneNumber'), phoneNumberValidation)
         handleEmail(data.get('email'), emailValidation)
         handlePassword(data.get('password'), passwordValidation)
         event.preventDefault();
        }
  
  };

  const handlePhoneNumber = (event, prev) => {
    const onlyNums = event.replace(/[^0-9]/g, '');
    if (onlyNums.length === 0) {
      setPhoneNameValidation(prev => ({
          ...prev,
          isValid: false,
          errorText: "Pole nie może być puste",
          focused: false
        }));
      setPhoneNumber(onlyNums);
    }
    else if (onlyNums.length < 9) {
      setPhoneNameValidation(prev => ({
          ...prev,
          isValid: false,
          errorText: "Za krótki numer telefonu",
          focused: false
        }));
      setPhoneNumber(onlyNums);
    } 
    else if (onlyNums.length === 9) {
      const number = onlyNums.replace(
        /(\d{3})(\d{3})(\d{3})/,
        '$1 $2 $3'
      );
      setPhoneNumber(number);
      setPhoneNameValidation(prev => (
        {
          ...prev,
          isValid: true,
          errorText: "",
          focused: true
        }));
    }
  }

  const handlePostalCode = (event, prev) => {
    const onlyNums = event.replace(/[^0-9]/g, '');
    if (onlyNums.length === 0) 
    {
      emptyValidation(event, setPostalCodeValidation, prev);
      setPostalCode(onlyNums);
    }
    else if (onlyNums.length < 5) 
    {
      setPostalCodeValidation(prev => ({
          ...prev,
          isValid: false,
          errorText: "Za krótki kod pocztowy",
          focused: false
        }));
      setPostalCode(onlyNums);
    }
     else if (onlyNums.length === 5) {
      const number = onlyNums.replace(
        /(\d{2})(\d{3})/,
        '$1-$2'
      );
      setPostalCodeValidation(prev => ( {
          ...postalCodeValidation,
          isValid: true,
          errorText: "",
          focused: true
        }));
      setPostalCode(number);
    }
  }

  const handleEmail = (event, prev) => {
    var email = event;
    if (event === "")
      emptyValidation(event, setEmailValidation, prev);
    else if (validator.isEmail(email)) 
    {
      setEmailValidation(prev => ({
          ...prev,
          isValid: true,
          errorText: "",
          focused: true
        }));
    } 
    else 
    {
      setEmailValidation(prev => ({
          ...prev,
          isValid: false,
          errorText: "Niepoprawny email",
          focused: false
        }));
    }
  }
  const handlePassword = (event, prev) => {
    if (event === "") 
    {
      emptyValidation(event, setPasswordValidation, prev);
      setRepeatedPasswordValue("")
    }
    else if (validator.isStrongPassword(event, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setPasswordValidation(prev => (
        {
          ...prev,
          isValid: true,
          errorText: "",
          focused: true
        }));
    } 
    else 
    {
      setPasswordValidation(prev => ( {
          ...prev,
          isValid: false,
          errorText: "Słabe hasło. Wymagane: długość minimum 8 znaków, " +
            "minimum jedna mała litera, minimum jedna duża litera, minimum jedna cyfra, minimu jeden znak specjalny",
          focused: false
        }));
    }
    setPasswordValue(event)
    arePasswordsequal(event, repeateDpasswordValue);
  }

  const handleRepeatedPassword = (event) => {
    setRepeatedPasswordValue(event.target.value)
    arePasswordsequal(event.target.value, passwordValue);
  }

  const arePasswordsequal = (password1, password2) => {
    if (password1 === password2) {
      setRepeatedPasswordValidation(repeatedPasswordValidation => (
        {
          ...repeatedPasswordValidation,
          isValid: true,
          errorText: "",
          focused: true
        }))
    }
    else {
      setRepeatedPasswordValidation(repeatedPasswordValidation => (
        {
          ...repeatedPasswordValidation,
          isValid: false,
          errorText: "Hasła nie są takie same",
          focused: false
        }))
    }
  }

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

  return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={require("../images/zjlogo.png")} width="150" height="75" alt="zamów jedzenie"/>
          
          <Typography component="h1" variant="h5">
            {props.button}
            Zarejestruj się
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(event) => emptyValidation(event.target.value, setNameValidation, nameValidation)}
                  error={!nameValidation.isValid}
                  helperText={nameValidation.errorText}
                  color={'success'}
                  focused={nameValidation.focused}
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                  label="Imię"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <PersonAddIcon />
                      </InputAdornment>
                    ,
                  }}
                  onChange={(event) => emptyValidation(event.target.value, setLastNameValidation, lastNameValidation)}
                  error={!lastNameValidation.isValid}
                  helperText={lastNameValidation.errorText}
                  color={lastNameValidation.isValid ? "success" : "error"}
                  focused={lastNameValidation.focused}
                  id="lastName"
                  label="Nazwisko"
                  name="lastName"
                  autoComplete="family-name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <HouseIcon />
                      </InputAdornment>
                    ,
                  }}
                  onChange={(event) => emptyValidation(event.target.value, setStreetValidation, streetValidation)}
                  error={!streetValidation.isValid}
                  helperText={streetValidation.errorText}
                  focused={streetValidation.focused}
                  color="success"
                  autoComplete="street"
                  name="street"
                  id="street"
                  label="Ulica i numer lokalu"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  onChange={(event) => emptyValidation(event.target.value, setCityValidation, cityValidation)}
                  error={!cityValidation.isValid}
                  helperText={cityValidation.errorText}
                  focused={cityValidation.focused}
                  color="success"
                  id="city"
                  label="Miejscowość"
                  name="city"
                  autoComplete="city"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <LocalPostOfficeIcon />
                      </InputAdornment>
                    ,
                  }}
                  onChange={(event) => { handlePostalCode(event.target.value, postalCodeValidation) }}
                  error={!postalCodeValidation.isValid}
                  helperText={postalCodeValidation.errorText}
                  focused={postalCodeValidation.focused}
                  color="success"
                  value={postalCode}
                  id="postalCode"
                  label="Kod pocztowy"
                  name="postalCode"
                  autoComplete="postalCode"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>

                <TextField
                  InputProps={{
                    startAdornment:
                      <InputAdornment position="start">
                        +48
                      </InputAdornment>,
                    endAdornment:
                      <InputAdornment position="end">
                        <AddIcCallIcon />
                      </InputAdornment>
                    ,
                  }}
                  onChange={(event) => { handlePhoneNumber(event.target.value, phoneNumberValidation) }}
                  error={!phoneNumberValidation.isValid}
                  helperText={phoneNumberValidation.errorText}
                  focused={phoneNumberValidation.focused}
                  color="success"
                  value={phoneNumber}
                  id="phoneNumber"
                  label="Numer telefonu"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ,
                  }}
                  onChange={(event) => { handleEmail(event.target.value, emailValidation) }}
                  error={!emailValidation.isValid}
                  helperText={emailValidation.errorText}
                  focused={emailValidation.focused}
                  color="success"
                  id="email"
                  label="Adres Email"
                  name="email"
                  autoComplete="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
                  onChange={(event) => { handlePassword(event.target.value, passwordValidation) }}
                  error={!passwordValidation.isValid}
                  helperText={passwordValidation.errorText}
                  focused={passwordValidation.focused}
                  color="success"
                  name="password"
                  label="Hasło"
                  type={passwordInput}
                  id="password"
                  autoComplete="new-password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <RepeatIcon />
                      </InputAdornment>
                  }}
                  onChange={(event) => { handleRepeatedPassword(event, repeatedPasswordValidation) }}
                  error={!repeatedPasswordValidation.isValid}
                  helperText={repeatedPasswordValidation.errorText}
                  focused={repeatedPasswordValidation.focused}
                  disabled={!passwordValue}
                  color="success"
                  name="password"
                  label="Powtórz hasło"
                  type={passwordInput}
                  value={repeateDpasswordValue}
                  id="password"
                  autoComplete="new-password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="success" />}
                  label="Chcę otrzymywać e-mailem informacje o kodach promocyjnych"
                  onChange = {event => {setCheckBox({checked: event.target.checked})}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zarejestruj się
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Masz już konto? Zaloguj się
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  )
}
