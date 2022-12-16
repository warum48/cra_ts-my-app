
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
import {Map as LeafletMap} from 'leaflet';

import 'leaflet/dist/leaflet.css'

/*import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'*/
//import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import Grid from "@mui/material/Grid";
import { panel_bg, StyledTableCell, StyledTableRow } from "_styles/jsstyles";
import "_styles/leaflet.css";
import { Heading, ItemInfo, ItemName } from "_styles/MuiStyledComponents";
//const L = require("leaflet");

export function LeafletPure() {
  const theme = useTheme();
  const [refresher, setRefresher] = React.useState(0)
  const mapref = React.useRef<HTMLDivElement>(null);
  const mapa = React.useRef<any>(null);
  React.useEffect(()=>{
   // if(refresher == 0){
    var map = L.map('mapka').setView([13.364047, 103.860313], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: 'https://client.shop-survey.ru/static/map/images/green.png',
    /*iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]*/
});

L.marker([13.364000, 103.860353], {icon: myIcon}).addTo(map);



   // }else*/
   // setTimeout(()=>{
   /* if(refresher == 1){
    //var map = L.map('map').setView([51.505, -0.09], 13);//setView([13.364047, 103.860313], 13);
    if(mapref.current){
        mapa.current = new LeafletMap(mapref.current, {})
    mapa.current.setView([13.364047, 103.860313], 13);
    }
    }else if(refresher == 2){
        mapa.current.setView([13.364047, 100.860313], 13);
    }*/
//},100)
    //setRefresher((prev:number) => prev+1);
  },[refresher])
  return (
    <>
          <Box sx={{ width: '100%', height: "600px"}} >
            <div id='mapka' ref={mapref}></div>
          </Box>
          {/*}
          <button onClick={()=>setRefresher(1)}>refresh1</button>
  <button onClick={()=>setRefresher(2)}>refresh2</button>*/}
          </>
        
  );
}
