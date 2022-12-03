import React, { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";



const AnimContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 112px);
  /*height: 100%;*/
  box-sizing: border-box;
  font-family: var(--font_bold_header);
  font-size: 50px;
  line-height: 50px;
  color: violet;
  overflow: hidden;
  /*color: theme.palette.primary.main;*/
`;



//https://greensock.com/forums/topic/21217-stagger-animation-with-react-functional-components/
export const Home = () => {
  useEffect(() => {
    console.log('homeee');
  }, []); 
console.log('homeee');
  return (
    <>
      {/*<AnimContainer className="animCont">
        home comp
        
  </AnimContainer>*/}
      <Button variant="contained">home button</Button>
    </>
  );
};
