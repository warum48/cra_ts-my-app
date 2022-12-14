import React from "react";
import logo from "./logo.svg";
//import "./App.css";

//---------------router----------------------//
import {
  useLocation,
  Outlet,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

//----------mui
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Typography, Divider } from "@mui/material";

import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
//import Brightness4Icon from "@mui/icons-material/Brightness4";
//import Brightness7Icon from "@mui/icons-material/Brightness7";

//import { GlobalProvider } from "_context/ContextGlobal";
//---------
import { GlobalContext } from "_context/ContextGlobal";
import { LightMode } from "_components/LightMode";
import { Navigator } from "_components/Navigator";
import { Header } from "_components/Header";
import { GoToTop } from "_components/GoToTop";

function App() {
  const theme = useTheme();
  const drawerWidth = 256;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //const theme = useTheme();
  //const {colorMode} = React.useContext(GlobalContext);
  //
  /*
    */

  return (
    <>
   {/*} <Box 
    className="_bgimage" 
    component="img"
    sx={{
      height: 'auto',
      width: '100%',
      zIndex:-1,
      position:'absolute',
      top:0,
      overflow:'hidden'
    }}
    src="http://neurolab.mcbs.group/local/templates/neurolab/assets/images/svg/s-mp-one-img-bg.svg"
    >
  </Box>*/}
    
    
    <Box
     className={theme.palette.mode === 'light' ? "main_bgimage" :''}
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      
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
          sx={{ display: { sm: "block", xs: "none" } }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header onDrawerToggle={handleDrawerToggle} />
        <Box
        
          component="main"
          sx={{
            flex: 1,
            ///////py: 6, px: 4,
            py: 2,
            px: 2,
            my: 0,
            mx: 4,
          }}
        >
          {/* <Content /> */}

          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, mx: 4 }}>

          {/*<Divider sx={{ mr:'25px'}} />*/}
          <GoToTop/>
          <Typography variant="caption">
            © ООО "УК "Бизнес Решения", 2022. Все права защищены.
          </Typography>

          {/*<Copyright />*/}
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default App;
