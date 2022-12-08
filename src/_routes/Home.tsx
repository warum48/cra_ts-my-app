import React, { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ReportDetails from "_components/ReportDetails";
import Information from "_components/ReportDetails/Information";

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


export const Home = () => {
  useEffect(() => {
    console.log("home");
  }, []);
  
  return (
    <>
     {/*<Box sx={{height:'1300px'}}></Box>
      Home (детали репорта здесь только для тестов / быстрого доступа)*/}
      <ReportDetails/>
      {/*<Information/>*/} 
    </>
  );
};
