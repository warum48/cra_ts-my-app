import { styled, useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { url } from 'inspector';


//const theme = useTheme();

/*export const bluegreen_bg = {
  background: "linear-gradient(90deg,#0098d7 1.2%,#3caa42 90.53%)",
};
export const bluegreen_bg_vert = {
  background: "linear-gradient(180deg,#0098d7 1.2%,#3caa42 90.53%)",
};
export const bluegreen_bg_130_dark = {
  background: "linear-gradient(130deg,#016e9d 35.2%,#36993b 90.53%)",
};
export const panel_bg_light = {
  background: "white",
};
export const panel_bg_dark = {
  background: "rgba(255,255,255,0.3)",
};*/
export const panel_bg = {
  dark: { background: "rgba(255,255,255,0.1)" },
  light: { background: "white" }
};
export const grayLines = {
  '&:after': {
    //zIndex: '-1',
    pointerEvents:'none',
    content:'" "',
    top:'0px',
    display: 'block',
    position:'absolute',
    width:'100%',
    height:'100%',
    backgroundRepeat:'no-repeat',
    backgroundPosition: '50% 100%',
    backgroundImage:'url(http://neurolab.mcbs.group/local/templates/neurolab/assets/images/svg/s-technology-bg-lines.svg)'
  }
 /* &:after {
    content: "\\f077";
    font-family: FontAwesome;
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 40px;
    color: #fff;
  } */
  //
};

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
   //   font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.5rem;
   // letter-spacing: 0.01071em;
   // display: table-cell;
  //  vertical-align: inherit;
    //border-bottom: 1px solid rgba(224, 224, 224, 1);
    //text-align: left;
    //padding: 16px;
    //color: rgba(0, 0, 0, 0.87);
    //white-space: nowrap;
`
//------footer------    
export const Footer = styled(Box)`
font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.5rem;
`

