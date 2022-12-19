import React, { useRef, useEffect } from "react";
import {
  Link,
} from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const Home = () => {
  const theme = useTheme();

  useEffect(() => {
    console.log("home");
  }, []);

  return (
    <>
      <Container>
        <Box sx={{pb:'70px', textAlign: "center",}}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: theme.typography.fontWeightLight,
            textAlign: "center",
            pb:4,
          }}
        >
          Добро пожаловать <br />в раздел клиента "Сюрвеер"
        </Typography>
        <Button
              type="submit"
              variant="contained"
              component={Link}
              to="/reports"
              sx={{ color: '#ffffff',  boxShadow: 0, background: theme.palette.common.buttonGradient,}}
            >
              К отчетам
            </Button>
            </Box>
      </Container>
    </>
  );
};
