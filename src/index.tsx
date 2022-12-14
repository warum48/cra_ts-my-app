import React from "react";
import ReactDOM from "react-dom/client";
import "_styles/index.css";
import "_styles/mui.css";
import "_styles/reactselect.css";
import App from "./App";
//import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from "@mui/material/styles";
import { Box, Button, Grid, Toolbar } from "@mui/material/";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";

import { ReduxWrapper } from "_redux/ReduxWrapper";
import { GlobalProvider } from "_context/ContextGlobal";
import { Home } from "_routes/home/Home";
import { Reports } from "_routes/reports/Reports";
import { Execution } from "_routes/export/Execution";
import { ExportPictures} from "_routes/export/Pictures";
import { Auth } from "_components/Auth";
import { LightMode } from "_components/LightMode";
//-----------------------TYPES-------------------------
import { RoutesTypes } from "_types/TYPES";
import ReportDetails from "_routes/reports/details/ReportDetails";
import { ApolloTest } from "_components/debug/ApolloTest";
import { ApolloFetchOnClick } from "_components/debug/ApolloFetchOnClick";
import { ApolloLazySelect } from "_components/debug/ApolloLazySelect";
import { LeafletPure } from "_components/LeafletPure";
import { DebugSwitcher } from "_components/debug/DebugSwitcher";

const RootWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs />

              <Grid item>
                <Box sx={{display:'flex'}}>
              {/*<DebugSwitcher/>*/}
                <LightMode />
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
          <Auth setIsLoggedIn={setIsLoggedIn} />
        </>
      ) : (
        <BrowserRouter 
        //basename="/aerovadim/surveer"
        >
          <Routes>
            <Route path="/" element={<App />}>
              <Route path={RoutesTypes.Home} element={<Home />} />
              <Route path={RoutesTypes.Reports} element={<Reports />} />
              <Route
                path={RoutesTypes.Reports + "/:routerTEId"}
                element={<ReportDetails />}
              />
              
              <Route path={RoutesTypes.Execution} element={<Execution />} />
              <Route path={RoutesTypes.Pictures} element={<ExportPictures />} />
              <Route path={RoutesTypes.Debug_GQL} element={<ApolloTest/>} />
              <Route path={RoutesTypes.Debug_LazyGQL} element={<ApolloFetchOnClick/>} />
              <Route path={RoutesTypes.Debug_LazySelect} element={<ApolloLazySelect/>} />
              <Route path={RoutesTypes.Debug_LeafletPure} element={<LeafletPure points={[[13.364047, 103.860313],[13.364047, 103.860313]]}/>} />
            </Route>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ReduxWrapper>
    <GlobalProvider>
      <StyledEngineProvider injectFirst>
        <RootWrapper />
      </StyledEngineProvider>
    </GlobalProvider>
  </ReduxWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
