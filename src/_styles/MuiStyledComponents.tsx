import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Link, Paper, Typography } from "@mui/material";

export const panel_bg = {
  dark: { background: "rgba(255,255,255,0.1)" },
  light: { background: "white" },
};

interface IChildren {
  children?: JSX.Element;
}
interface IText {
  text?: string;
  onClick?:()=>void
}

//--------------TABLE in DETAILS (Info.tsx,  ...)
export const Heading = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
  //fontSize: "1rem",//"16px",
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightRegular,
}));

export const ItemInfo = styled(Box)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //...theme.typography.body2,
  padding: theme.spacing(2),
  //fontSize: '14px',//theme.typography.body2.fontSize, //"0.875rem",//"14px",
  fontSize: theme.typography.body2.fontSize,
  textAlign: "left",
  //color: theme.palette.text.secondary,
}));

export const ItemName = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  //fontSize: '14px',//theme.typography.body2.fontSize, //"0.875rem",//"14px",
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

//------------------STYLED BUTTON----------
interface IColor {
  theme: any;
  //_color:"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
}
export const StyledButton = styled(Button)(
  ({
    theme,
  }: //_color = 'primary'
  IColor) => ({
    color: "#ffffff",
    boxShadow: theme.shadows[0],//"0",
    background: theme.palette.common.buttonGradient,
    /*':hover': {
    color: theme.palette[_color].main,
    backgroundColor: 'white',
  },*/
  })
);

//------------table-----------
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //backgroundColor: theme.palette.common.black,
    //color: theme.palette.common.white,
    //backgroundColor: theme.palette.common.white,
    //color: theme.palette.common.black,
    backgroundColor: panel_bg[theme.palette.mode],
    fontSize: theme.typography.body2.fontSize
    //!!makes button-like
    //textTransform: 'uppercase',
    //color:theme.palette.text.secondary,

    //color: theme.palette.common.black,
    //fontSize:'12px'
  },
  [`&.${tableCellClasses.body}`]: {
    //fontSize: '0.875rem'//13,
    //fontSize:10
    fontSize: theme.typography.body2.fontSize,
    overflowWrap: 'break-word'
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//------stack-------
export const StackHeader = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.875rem',
  lineHeight: '1.5rem',
}));
export const StackRow = styled(Box)`
  gap: 10px;
  display: flex;
  align-items: center;
`;

//-------dateFilter------------
export const DateItem = ({ text, onClick }: IText) => {
  return (
    <Paper
    // {...props}
    onClick={onClick}
      sx={{ p: 1, display: "inline-block", mr: "1px", mb: "1px", pt: 0, pb: "4px", cursor:'pointer', textTransform: 'capitalize' }}
      elevation={0}
    >
      <Link 
      //variant="caption"
      variant="body2"
      >{text}</Link>
    </Paper>
  );
};

//------footer------
export const Footer = styled(Box)`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
`;

//-----------------errors-------------

export const LoginError = ({ text }: IText) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="caption" color="error.main">
        {text}
      </Typography>
    </Box>
  );
};

export const CodeError = ({ text }: IText | any) => {
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="caption" color="error.main">
        {text}
      </Typography>
    </Box>
  );
};

export const LoadingBox = () => {
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <Typography variant="caption">Загрузка ...</Typography>
    </Box>
  );
};
