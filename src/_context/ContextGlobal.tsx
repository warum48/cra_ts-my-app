import React, { createContext, useState, useEffect } from "react";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//import { useSelector, useDispatch } from "react-redux";

//----------types------------

interface IContext {
  isDebug: boolean;
  colorMode: { toggleColorMode: () => void; }//string;
}

export const GlobalContext = createContext({} as IContext);

type Props = {
  children?: React.ReactNode;
};

//--------------component-----------

export const GlobalProvider = ({ children }: Props) => {
  const [isDebug, setIsDebug] = useState(false);

  //-----color mode
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const themeLight = createTheme({
    
    palette: {
      mode: 'light',
      background: {
        default: "#efefef"
      },
      //primary: {
       // main: '#ff4400',
        //main: "linear-gradient(to right, tomato, cyan)",
     // },
    }
  });
  
  const themeDark = createTheme({
    
    palette: {
      mode: 'dark',
      background: {
        default: "#1a1b24"
      },
      text: {
        primary: "#ffffff"
      }
    }
  });

  const theme = React.useMemo(
    () =>
     /* createTheme({
        palette: {
          mode,
        },
      }),*/
    mode == 'light' ? themeLight : themeDark,
    [mode]
  );

  //------end color mode

  useEffect(() => {}, []); //TODO find a way to init once on dict change and onload

  //}

  const value = {
    isDebug,
    colorMode
  };

  return (
    <GlobalContext.Provider value={value}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        {children}</ThemeProvider>
    </GlobalContext.Provider>
  );
};
