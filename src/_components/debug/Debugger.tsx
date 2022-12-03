import React from "react";
//------------------------context----------------
import { GlobalContext } from "_context/ContextGlobal";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
export const DebugBox = styled(Box)`
  /*display: flex;*/
  background-color: rgb(0, 153, 255);
  /*height: 70px;*/
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 12px;
`;

interface DebuggerProps {
  children: React.ReactNode;
  [x: string]: any;
}

export const Debugger = ({ children, ...props }: DebuggerProps) => {
  const { isDebug } = React.useContext(GlobalContext);
  return <>{isDebug && <DebugBox {...props}>{children}</DebugBox>}</>;
};
