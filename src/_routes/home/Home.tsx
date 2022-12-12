import React, { useRef, useEffect } from "react";
import {
  useLocation,
  Outlet,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ReportDetails from "_routes/reports/details/ReportDetails";
import Information from "_routes/reports/details/components/Information";
import { Typography } from "@mui/material";
import { bluegreen_bg } from "_styles/jsstyles";

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //height: calc(100vh - 112px);
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  //background-image: url('http://neurolab.mcbs.group/local/templates/neurolab/assets/images/svg/s-mp-one-img-bg.svg');
`;

export const Home = () => {
  const theme = useTheme();

  useEffect(() => {
    console.log("home");
  }, []);

  return (
    <>
      {/*<Box sx={{height:'1300px'}}></Box>
      Home (детали репорта здесь только для тестов / быстрого доступа)*/}
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
              sx={{ color: '#ffffff',  boxShadow: 0, ...bluegreen_bg}}
              //onClick={() => setIsLoggedIn(true)}
            >
              К отчетам
            </Button>
            </Box>
      </Container>
      {/*<
      <ReportDetails/>
      Information/>*/}
    </>
  );
};
