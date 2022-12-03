import React from 'react';
import logo from './logo.svg';
import './App.css';

//---------------router----------------------
import {
  useLocation,
  Outlet,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import { Box, Button } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
//import Brightness4Icon from "@mui/icons-material/Brightness4";
//import Brightness7Icon from "@mui/icons-material/Brightness7";

//import { GlobalProvider } from "_context/ContextGlobal";
import { GlobalContext } from "_context/ContextGlobal";

function App() {

  const theme = useTheme();
  const {colorMode} = React.useContext(GlobalContext);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
       // borderRadius: 1,
        //p: 3
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <>
          {/*<Brightness7Icon />*/} dark </>
        ) : (
          <>
          {/*<Brightness4Icon />*/} light
          </>
        )}
        
      </IconButton>
      <Button variant="contained">some button</Button>
    </Box>
    <Outlet />
    </div>
  );
}

export default App;
