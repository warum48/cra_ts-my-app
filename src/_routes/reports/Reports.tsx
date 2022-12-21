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
        <Grid item md={9} xs={12} order={{ xs: 3, md: 2 }}>
          <ReportMainTable />
        </Grid>
        <Grid item md={3} xs={12} order={{ xs: 2, md: 3 }} sx={{ pl: {md:2, xs:0}, pb:{md:0, xs:2}}}>
          <Filters />
        </Grid>
        
      </Grid>
    </>
  );
};


