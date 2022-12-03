import React, { useState, useEffect, useRef } from "react"; //fork
//-------REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  //updateLoopNum,
  //incrementLoopNum,
  //currentDict,
  //getCurLoopNum,
} from "_redux/debug/unpersistableSlice";
import { RootState } from "_redux/ReduxWrapper";
//--------context----------------
import { GlobalContext } from "_context/ContextGlobal";
//--------MUI---------
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const DebugBox = styled(Box)`
  background-color: rgb(0, 153, 255);
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 12px;
`;

export const Unpersist = () => {
  //const { isDebug } = React.useContext(GlobalContext);
  return (
    <div>
      <h2>Test Flux Redux Store</h2>
      <Button>Clear Store</Button>
    </div>
  );
};
