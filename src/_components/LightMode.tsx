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
  const { colorMode, getColorMode } = React.useContext(GlobalContext);

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
