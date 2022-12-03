import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";

import { ReduxWrapper } from "_redux/ReduxWrapper";
import { GlobalProvider } from "_context/ContextGlobal";
import { Home } from "_routes/Home";
//-----------------------TYPES-------------------------
import { RoutesTypes } from "_types/TYPES";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ReduxWrapper>
    <GlobalProvider>
    <StyledEngineProvider injectFirst>
            <BrowserRouter>
              <Routes>
              <Route path="/" element={<App />}>
                  <Route path={RoutesTypes.Home} element={<Home />} />
                  </Route>
                  </Routes>
            </BrowserRouter>
          </StyledEngineProvider>
    </GlobalProvider>
  </ReduxWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
