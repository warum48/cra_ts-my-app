import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { panel_bg } from "_styles/MuiStyledComponents";

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: "500px",
  ...panel_bg[theme.palette.mode],
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    //padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    /*[theme.breakpoints.up('md')]: {
      width: '20ch',
    },*/
  },
}));

export default function SearchBar() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        maxHeight: "90px",
        my: 2,
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Button
        type="submit"
        variant="contained"
        sx={{
          color: "#ffffff",
          background: theme.palette.common.buttonGradient,
        }}
      >
        Искать
      </Button>
    </Box>
  );
}
