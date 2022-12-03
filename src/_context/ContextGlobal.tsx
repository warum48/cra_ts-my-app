import React, { createContext, useState, useEffect } from "react";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

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

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
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
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalContext.Provider>
  );
};
