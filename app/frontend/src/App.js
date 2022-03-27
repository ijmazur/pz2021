import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SignUp from './pages/signUp';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';



const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


function ThemeButton() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <IconButton sx={{ ml: 0 }} onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
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
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router > {/* The Switch decides which component to show based on the current URL.*/}
          <Routes>
            <Route path="/" element={<Navigate replace to='/signUp' />} />
            <Route exact path='/signUp' element={<SignUp
              button={<ThemeButton />}/>}/>
          </Routes>
        </Router >

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
