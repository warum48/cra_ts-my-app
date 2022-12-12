import React, { useRef, useEffect } from "react";
//------MUI-----
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
//------COMPONENTS----
import SearchBar from "_components/SearchBar";
import ReportsTable from "_components/ReportsTable";
import ReportMainTable from "_components/ReportMainTable";
import FilterSelect from "_components/FilterSelect";
import Stack from "@mui/system/Stack";
import { StackHeader } from "_styles/jsstyles";

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //height: calc(100vh - 112px);
  /*height: 100%;*/
  box-sizing: border-box;
`;

export const Reports = () => {
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
          <Paper sx={{ ml: 2, p: 2 }}>
            <Stack spacing={2}>
              {/*<StackHeader>Отфильтровать по: </StackHeader>*/}
              <Typography variant="subtitle2" >Отфильтровать по:</Typography>
              <FilterSelect label={"Статус"} />
              <FilterSelect label={"Источник"} />
              <FilterSelect label={"Задача"} />
              <FilterSelect label={"Регион"} />
            </Stack>
          </Paper>
        </Grid>
        {/*<Grid item xs={12}>
          <Divider sx={{ mt: 4 }} />
          <Typography>Reports End</Typography>
  </Grid>*/}
      </Grid>
    </>
  );
};
