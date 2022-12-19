import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "_styles/leaflet.css";

export function LeafletPure() {
  const theme = useTheme();
  const [refresher, setRefresher] = React.useState(0);
  const mapref = React.useRef<HTMLDivElement>(null);
  const mapa = React.useRef<any>(null);
  React.useEffect(() => {
    var map = L.map("mapka").setView([13.364047, 103.860313], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var myIcon = L.icon({
      iconUrl: "https://client.shop-survey.ru/static/map/images/green.png",
      /*iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: 'my-icon-shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]*/
    });

    L.marker([13.364, 103.860353], { icon: myIcon }).addTo(map);
  }, []); //refresher
  return (
    <>
      <Box sx={{ width: "100%", height: "600px" }}>
        <div id="mapka" ref={mapref}></div>
      </Box>
    </>
  );
}
