import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { panel_bg, StyledTableCell, StyledTableRow } from '_styles/jsstyles';





export default function Empty() {
    const theme = useTheme();
  return (
    <Box sx={{width:'100%',p:2, ...panel_bg[theme.palette.mode]}}>Компонент в стадии разработки</Box> 
  );
}
