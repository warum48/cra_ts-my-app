import React, { useRef, useEffect } from "react";
//------MUI-----
import { styled, useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
//------COMPONENTS----
import SearchBar from "_components/SearchBar";
import ReportMainTable from "_routes/reports/components/ReportMainTable";
import { Filters } from "./components/Filters";

export const Reports = () => {
  const theme = useTheme();
  useEffect(() => {
    console.log("home");
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Выберите отчёт по задаче для изменения
          </Typography>
          <SearchBar />
        </Grid>
        <Grid item xs={9}>
          <ReportMainTable />
        </Grid>
        <Grid item xs={3}>
          <Filters />
        </Grid>
        
      </Grid>
    </>
  );
};


