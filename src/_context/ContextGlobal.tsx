import React, { createContext, useState, useEffect } from "react";
import { RootState } from "_redux/ReduxWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from '@mui/material';
import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//import App from './App';

const client = new ApolloClient({
  uri: "https://flyby-gateway.herokuapp.com/",
  cache: new InMemoryCache(),
});

//import { useSelector, useDispatch } from "react-redux";

//----------types------------

interface IContext {
  isDebug: boolean;
  colorMode: { toggleColorMode: () => void }; //string;
  getColorMode: (colorSet:string) => {mainGradientBg_135:string, buttonGradient:string}
}

export const GlobalContext = createContext({} as IContext);

type Props = {
  children?: React.ReactNode;
};

//--------------component-----------

export const GlobalProvider = ({ children }: Props) => {
  const { themeMode, colorSet } = useSelector(
    (state: RootState) => state.colorTheme
  );
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

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          common:{
          mainGradientBg_135:'yellow',
          mainGradientBg_90:'red',
          }
            // palette values for light mode
           /* primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },*/
          }
        : {
            // palette values for dark mode
            /*primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },*/
          }),
    },
  });

  //TODO: useMemo
  const getColorMode = (colorSet: string) => {
      
    /*colorSet === 'strong'
        ? {
            mainGradientBg_135:'linear-gradient(to right bottom, #007fff, #0059b2 120%)',//'blue',
            //mainGradientBg_90:'red',
            buttonGradient:'linear-gradient(to right bottom, #007fff, #007fff 180%)',
          }
        :{
          mainGradientBg_135:"linear-gradient(130deg,#016e9d 35.2%,#36993b 90.53%)",
          //mainGradientBg_90:"linear-gradient(90deg,#016e9d 35.2%,#36993b 90.53%)",
          buttonGradient:"linear-gradient(90deg,#0098d7 1.2%,#3caa42 90.53%)",
        }*/
        if (colorSet === 'strong'){
        return {
            mainGradientBg_135:'linear-gradient(to right bottom, #007fff, #0059b2 120%)',//'blue',
            buttonGradient:'linear-gradient(to right bottom, #007fff, #007fff 180%)',
          }
        }
        else if (colorSet === 'fresh'){
          return{
          mainGradientBg_135:"linear-gradient(130deg,#016e9d 35.2%,#36993b 90.53%)",
          buttonGradient:"linear-gradient(90deg,#0098d7 1.2%,#3caa42 90.53%)",
        }
      }
        else if (colorSet === 'classic'){
          return{
          mainGradientBg_135:"linear-gradient(130deg, #20304b , #1e293b 90.53%)",
          buttonGradient:"linear-gradient(90deg,#206bc4 1.2%,#206bc4 90.53%)",
        }
      }else{
        return {
          mainGradientBg_135:'linear-gradient(to right bottom, #007fff, #0059b2 120%)',//'blue',
          buttonGradient:'linear-gradient(to right bottom, #007fff, #007fff 180%)',
        }
      }
    };

  const themeLight = createTheme({
    palette: {
      mode: "light",
      background: {
        default: colorSet === 'strong' ? '#f3f6f9' : '#f3f3f3',//"#efefef",
      },
      //primary: {
       // main: '#ff4400',
        //mainGradient: "linear-gradient(to right, tomato, cyan)",
      //},
      common: getColorMode(colorSet)
      //primary: {
      // main: '#ff4400',
      //main: "linear-gradient(to right, tomato, cyan)",
      // },
    },
  });

  const themeDark = createTheme({
    palette: {
      mode: "dark",
     /* background: {
        default: "#1a1b24",
      },
      text: {
        primary: "#ffffff",
      },*/
      common: getColorMode(colorSet)
    },
  });

  const theme = React.useMemo(
    () =>
      /* createTheme({
        palette: {
          mode,
        },
      }),*/
      mode == "light" ? themeLight : themeDark,
    [mode, colorSet]
  );

  //------end color mode

  useEffect(() => {}, []); //TODO find a way to init once on dict change and onload

  //}

  const value = {
    isDebug,
    colorMode, //dark-light
    getColorMode //fresh-strong
  };

  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </GlobalContext.Provider>
    </ApolloProvider>
  );
};
