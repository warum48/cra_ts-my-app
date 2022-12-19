import React from "react";
//------------------------context----------------
import { GlobalContext } from "_context/ContextGlobal";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export const DebugCodeBox = styled(Box)`
  /*display: flex;*/
  //background-color: rgb(0, 153, 255);
  background-color:#dddddd55;
  border: 1px gray solid;
  //align-items: center;
  //justify-content: flex-start;
  //border-radius: 10px;
  padding: 10px 10px;
  word-wrap: break-word;
  //fontSize: "10px" 
  font-size: 10px;
`;

interface DebuggerProps {
  children?: React.ReactNode;
  //isCode: boolean;
  code: string;
  [x: string]: any;
}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const DebugBox = ({ children, code = "", ...props }: DebuggerProps) => {
  let query = useQuery();
  const debug = query.get("debug");
  const { isDebug } = React.useContext(GlobalContext);

  if (isDebug && debug) {
    return (
      <>
        {code ? (
          <DebugCodeBox {...props}>
            
              <code>{code}</code>
            
          </DebugCodeBox>
        ) : (
          <Box {...props}>{children}</Box>
        )}
      </>
    );
  } else {
    return <></>;
  }
};
