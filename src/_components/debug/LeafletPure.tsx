import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import L from 'leaflet';

/*import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'*/
//import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import Grid from "@mui/material/Grid";
import { panel_bg, StyledTableCell, StyledTableRow } from "_styles/jsstyles";
import "_styles/leaflet.css";
import { Heading, ItemInfo, ItemName } from "_styles/MuiStyledComponents";

export function LeafletPure() {
  const theme = useTheme();
  React.useEffect(()=>{
    var map = L.map('map').setView([51.505, -0.09], 13);
  },[])
  return (
    
          <Box sx={{ width: '100%', height: "600px", px: 2 }} id='map'>
            
          </Box>
        
  );
}
