import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import Grid from "@mui/material/Grid";
import { panel_bg, } from "_styles/MuiStyledComponents";
import "_styles/leaflet.css";
import { Heading, ItemInfo, ItemName } from "_styles/MuiStyledComponents";

export function Geolocation() {
  const theme = useTheme();
  return (
    <Paper sx={{ width: "100%",  ...panel_bg[theme.palette.mode] }}>
      <Grid container spacing={0}>
        {/** */}
        <Grid item xs={3}>
          <ItemName>Расстояние до магазина:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>4504021</ItemInfo>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ height: "600px",px: 2 }}>
            <MapContainer
              center={[13.364047, 103.860313]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
              <Marker position={[51.505, -0.09]}>
              </Marker>
            </MapContainer>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Долгота:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>4504021</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Широта:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>4504021</ItemInfo>
        </Grid>
      </Grid>
    </Paper>
  );
}
