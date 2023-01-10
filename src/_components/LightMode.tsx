import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setColorSet } from "_redux/visualThemeSlice";
import { RootState } from "_redux/ReduxWrapper";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Paper } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { GlobalContext } from "_context/ContextGlobal";
import { graphqlSync } from "graphql";

interface IColor {
  name: string;
  bgcolor: string;
}
const ColorModeIcon = ({ name, bgcolor }: IColor) => {
  const dispatch = useDispatch();
  const size = "15px";
  return (
    <IconButton
      sx={{ mr: -1 }}
      onClick={() => dispatch(setColorSet(name))}
      color="inherit"
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: size,
          border: '1px solid gray',
          background: bgcolor,
        }}
      ></Box>
    </IconButton>
  );
};

export function LightMode() {
  const { themeMode, colorSet } = useSelector(
    (state: RootState) => state.colorTheme
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const { colorMode, getColorMode, fontSize, setFontSize } = React.useContext(GlobalContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      
      <IconButton
        sx={{ ml: 1, fontSize:12, backgroundColor: '#99999911'}}
        onClick={()=>setFontSize('small')}
        color="inherit"
      >
        Aa
      </IconButton>
      <IconButton
        sx={{ ml: 1, mr: 2 , fontSize:16, backgroundColor:'#dddddd11'}}
        onClick={()=>setFontSize('large')}
        color="inherit"
      >
       Aa
      </IconButton>
      <ColorModeIcon
        name="fresh"
        bgcolor={getColorMode("fresh").buttonGradient}
      />
      <ColorModeIcon
        name="strong"
        bgcolor={getColorMode("strong").buttonGradient}
      />
      <ColorModeIcon
        name="classic"
        bgcolor={getColorMode("classic").buttonGradient}
      />
      <ColorModeIcon
        name="pink"
        bgcolor={getColorMode("pink").buttonGradient}
      />
      <ColorModeIcon
        name="purple"
        bgcolor={getColorMode("purple").buttonGradient}
      />
      
      <ColorModeIcon
        name="black"
        bgcolor={getColorMode("black").buttonGradient}
      />
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  );
}
