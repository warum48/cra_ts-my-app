import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


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

  interface IColor{
    theme:any,
    //_color:"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  }
  export const StyledButton = styled(Button)(({ theme,
     //_color = 'primary' 
    }:IColor) => ({
    color: "#ffffff",
           boxShadow: '0',
           background: theme.palette.common.buttonGradient,
    /*':hover': {
      color: theme.palette[_color].main,
      backgroundColor: 'white',
    },*/
  }));

  export const StackRow = styled(Box)`
    gap: 10px;
    display: flex;
    align-items: center;
  `