import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "_styles/leaflet.css";


interface IProps{
  points: any//number[][] //TODO min 2 elements is required 
  //Argument of type 'number[][]' is not assignable to parameter of type 'LatLngBoundsLiteral'.
  //Type 'number[]' is not assignable to type 'LatLngTuple'.
  //  Target requires 2 element(s) but source may have fewer.ts(2345)
}
export function LeafletPure({points}:IProps) {
  const theme = useTheme();
  const [refresher, setRefresher] = React.useState(0);
  const mapref = React.useRef<HTMLDivElement>(null);
  const mapa = React.useRef<any>(null);
  React.useEffect(() => {
    /*let mapcenter = [];
    if(points.length == 1){
      mapcenter = points[0];
    }*/
   

    var map = L.map("mapka").setView([13.364047, 103.860313], 13);
    if(points.length > 1){
      var bounds = new L.LatLngBounds(points)
      map.fitBounds(bounds);
      var pathLine = L.polyline(points).addTo(map)
    }
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var myIconGreen = L.icon({
      iconUrl: "https://client.shop-survey.ru/static/map/images/green.png",
      iconAnchor: [15, 36],
      /*iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]*/
    });
    var myIconRed = L.icon({
      iconUrl: "https://client.shop-survey.ru/static/map/images/red.png",
      iconAnchor: [15, 36],
    });

    //L.marker([13.364, 103.860353], { icon: myIconGreen }).addTo(map);
    L.marker(points[0], { icon: myIconGreen }).addTo(map);
    if(points[1]){
      L.marker(points[1], { icon: myIconRed }).addTo(map);
    }
  }, []); //refresher
  return (
    <>
      <Box sx={{ width: "100%", height: "600px" }}>
        <div id="mapka" ref={mapref}></div>
      </Box>
    </>
  );
}
