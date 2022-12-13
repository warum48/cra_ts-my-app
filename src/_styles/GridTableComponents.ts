import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


/*
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  */
  export const Heading = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(2),
    //padding: "0 20px 0 20px",
    textAlign: "left",
    color: theme.palette.text.secondary,
    fontSize: "16px",
    fontWeight: theme.typography.fontWeightRegular,
  }));
  
  export const ItemInfo = styled(Box)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //...theme.typography.body2,
    padding: theme.spacing(2),
    fontSize: "14px",
    //padding: "0 20px 0 20px",
    textAlign: "left",
    
    //color: theme.palette.text.secondary,
  }));
  
  export const ItemName = styled(Box)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(2),
    //padding: "0 20px 0 20px",
    textAlign: "left",
    //color: theme.palette.text.secondary,
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightBold,
  }));