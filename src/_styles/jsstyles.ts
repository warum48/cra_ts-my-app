import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const bluegreen_bg = {
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
};
export const panel_bg = {
  dark: { background: "rgba(255,255,255,0.1)" },
  light: { background: "white" }
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
