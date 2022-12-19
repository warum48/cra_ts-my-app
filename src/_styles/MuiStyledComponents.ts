import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const panel_bg = {
  dark: { background: "rgba(255,255,255,0.1)" },
  light: { background: "white" }
};

//--------------TABLE in DETAILS (Info.tsx, ReportMainTable.tsx ...)
export const Heading = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(2),
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
  textAlign: "left",
  //color: theme.palette.text.secondary,
}));

export const ItemName = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "left",
  fontSize: "14px",
  fontWeight: theme.typography.fontWeightBold,
}));


//------------------STYLED BUTTON----------
interface IColor {
  theme: any,
  //_color:"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
}
export const StyledButton = styled(Button)(({ theme,
  //_color = 'primary' 
}: IColor) => ({
  color: "#ffffff",
  boxShadow: '0',
  background: theme.palette.common.buttonGradient,
  /*':hover': {
    color: theme.palette[_color].main,
    backgroundColor: 'white',
  },*/
}));



//------------table-----------
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //backgroundColor: theme.palette.common.black,
    //color: theme.palette.common.white,
    //backgroundColor: theme.palette.common.white,
    //color: theme.palette.common.black,
    backgroundColor: panel_bg[theme.palette.mode],
    //color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//------stack-------
export const StackHeader = styled(Box)`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5rem;
`
export const StackRow = styled(Box)`
    gap: 10px;
    display: flex;
    align-items: center;


  `
//------footer------    
export const Footer = styled(Box)`
font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
`
