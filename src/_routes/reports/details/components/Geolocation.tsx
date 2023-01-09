import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import Grid from "@mui/material/Grid";
import { panel_bg, } from "_styles/MuiStyledComponents";
import "_styles/leaflet.css";
import { Heading, ItemInfo, ItemName } from "_styles/MuiStyledComponents";
import { LeafletPure } from "_components/LeafletPure";
import {
  gql,
  useQuery,
  useLazyQuery,
  useReactiveVar,
  useMutation,
} from "@apollo/client";
import { GEO_TE_BYID } from "_apollo/queries"
import { currentTEIDVar } from "_apollo/state";


interface IProps{
  points?: number[][]
}
export function Geolocation(
  //{points}:IProps
  ) {
  const theme = useTheme();
  const { loading, error, data } = useQuery(GEO_TE_BYID,{
    variables: {id:currentTEIDVar()}
  });
  return (
    <Paper sx={{ width: "100%",  ...panel_bg[theme.palette.mode] }}>
      {data &&
      <Grid container spacing={0}>
        {/** */}
        <Grid item xs={3}>
          <ItemName>Расстояние до магазина:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{data.getTasksExecutionsById?.distance}</ItemInfo>
        </Grid>

        <Grid item xs={12}>
          <LeafletPure points={[[data.getTasksExecutionsById?.latitude, data.getTasksExecutionsById?.longitude],[data.getTasksExecutionsById?.store?.latitude, data.getTasksExecutionsById?.store?.longitude]]}/>
          
          
        </Grid>
        <Grid item xs={3}>
          <ItemName>Долгота:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{data.getTasksExecutionsById?.longitude}</ItemInfo>
        </Grid>
        <Grid item xs={3}>
          <ItemName>Широта:</ItemName>
        </Grid>
        <Grid item xs={9}>
          <ItemInfo>{data.getTasksExecutionsById?.latitude}</ItemInfo>
        </Grid>
      </Grid>
}
    </Paper>
  );
}
