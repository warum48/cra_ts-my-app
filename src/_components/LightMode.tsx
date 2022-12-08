import React from 'react';


import IconButton from "@mui/material/IconButton";
import { Box, Button } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
//import Brightness4Icon from "@mui/icons-material/Brightness4";
//import Brightness7Icon from "@mui/icons-material/Brightness7";

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

//import { GlobalProvider } from "_context/ContextGlobal";
import { GlobalContext } from "_context/ContextGlobal";

export function LightMode() {

  const theme = useTheme();
  const {colorMode} = React.useContext(GlobalContext);


  return (
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
      {/*{theme.palette.mode} mode */}
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <DarkModeIcon/>
        ) : (
          <LightModeIcon/>
        )}
        
      </IconButton>
      
    </Box>
      
  );
}

