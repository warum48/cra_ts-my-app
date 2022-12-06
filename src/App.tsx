import React from 'react';
import logo from './logo.svg';
import './App.css';

//---------------router----------------------//
import {
  useLocation,
  Outlet,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

//----------mui
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from "@mui/material/IconButton";
import { Box, Button } from "@mui/material";
import {  ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
//import Brightness4Icon from "@mui/icons-material/Brightness4";
//import Brightness7Icon from "@mui/icons-material/Brightness7";

//import { GlobalProvider } from "_context/ContextGlobal";
//---------
import { GlobalContext } from "_context/ContextGlobal";
import {LightMode} from "_components/LightMode";
import {Navigator} from "_components/Navigator";
import {Header} from "_components/Header";

function App() {
  const theme = useTheme();
  const drawerWidth = 256;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //const theme = useTheme();
  //const {colorMode} = React.useContext(GlobalContext);


  return (
    <>
    {/*<div className="App">*/}
      {/*<Box
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
          dark </>
        ) : (
          <>
           light
          </>
        )}
        
      </IconButton>
      <Button variant="contained">some button</Button>
    </Box>
        */}
   {/*     <LightMode/>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </div>
      
    <Outlet />
      */}
    
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/*<CssBaseline />*/}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, 
            //bgcolor: '#eaeff1' 
            }}>
           {/* <Content /> */}
           content
          </Box>
          <Box component="footer" sx={{ p: 2, 
            //bgcolor: '#eaeff1' 
            }}>
            {/*<Copyright />*/}
          </Box>
        </Box>
      </Box>
    
    
    {/*</div>*/}
    </>
  );
}

export default App;
