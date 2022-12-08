import React, { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import SearchBar  from '_components/SearchBar';
import ReportsTable from "_components/ReportsTable";
import ReportMainTable from "_components/ReportMainTable";

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
    <Typography variant='h6'>Выберите отчёт по задаче для изменения</Typography>
     <SearchBar/>
     <ReportMainTable/>
    
    <Divider sx={{ mt: 4 }} />
    <Typography>Reports End</Typography> 
    </>
  );
};
