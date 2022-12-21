import React, { createContext, useState, useEffect } from "react";
import { RootState } from "_redux/ReduxWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { useParams } from "react-router-dom";
//import { createHttpLink } from 'apollo-link-http';
//import App from './App';
const testtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2Mjc2MzcsInN1YiI6eyJsb2dpbiI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkX2hhc2giOiJwYmtkZjJfc2hhMjU2JDE1MDAwMCR1SEs1UFM2TU9NenQkN0xGcTF4T3UveG8rc0ljRE45dm5BL0dZTFNnU0x1Ylkwd2tueUVRVWlucz0ifX0.4rGVmAeL7bARW9yQK3J6UnU1OtfosYXL1n4bAkNF9eE"
let params = new URLSearchParams(document.location.search);
let apolloType = params.get("apollo"); // is the string "Jonathan"

//let apolloServer = "https://f6b4-188-170-78-39.eu.ngrok.io/graphql"//"https://ea34-188-170-78-39.eu.ngrok.io/graphql";
let apolloServer ="https://712e-188-170-77-22.eu.ngrok.io/graphql";
//https://ea34-188-170-78-39.eu.ngrok.io/graphql
if(apolloType == "maintest"){
console.log('main_apollo')
  apolloServer = "https://flyby-gateway.herokuapp.com/";
}
if(apolloType == "surtest"){
  //apolloServer = " https://cors-anywhere.herokuapp.com/https://ea34-188-170-78-39.eu.ngrok.io/graphql";
}

const client = new ApolloClient({
  link: new HttpLink({
      
      uri: apolloServer,
      fetchOptions: {
         mode: 'cors', // no-cors, *cors, same-origin //'*cors'//
      },
      headers: {
        'Authorization': 'Bearer '+testtoken,
        'Access-Control-Allow-Origin':'*'
      }//localStorage.getItem('token'),*/
  }),
  cache: new InMemoryCache(),
});

/*const client = new ApolloClient({
  uri: apolloServer,//"https://flyby-gateway.herokuapp.com/",
  cache: new InMemoryCache(),
  //fetchOptions: {
  //  mode: 'no-cors'
  //}
  //fetchOptions: { mode: 'no-cors' } as HttpLink.Options,
 
    credentials: 'include',
    headers: {
      //authorization: localStorage.getItem('token'),
      //'client-name': 'WidgetX Ecom [web]',
     // 'client-version': '1.0.0'
     'Access-Control-Allow-Origin': '*'
    },
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache"
    },
    
  }
});*/

//----------types------------

interface IContext {
  isDebug: boolean;
  setIsDebug: React.Dispatch<React.SetStateAction<boolean>>;
  colorMode: { toggleColorMode: () => void }; //string;
  getColorMode: (colorSet: string) => {
    mainGradientBg_135: string;
    buttonGradient: string;
  };

  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext({} as IContext);

type Props = {
  children?: React.ReactNode;
};

//--------------component-----------

export const GlobalProvider = ({ children }: Props) => {
  const [token , setToken] = React.useState('')
  const { themeMode, colorSet } = useSelector(
    (state: RootState) => state.colorTheme
  );
  const [isDebug, setIsDebug] = useState(true);
  let { debug } = useParams();

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

  //TODO: useMemo
  const getColorMode = (colorSet: string) => {
    if (colorSet === "strong") {
      return {
        mainGradientBg_135:
          "linear-gradient(to right bottom, #007fff, #0059b2 120%)", //'blue',
        buttonGradient:
          "linear-gradient(to right bottom, #007fff, #007fff 180%)",
      };
    } else if (colorSet === "fresh") {
      return {
        mainGradientBg_135:
          "linear-gradient(130deg,#016e9d 35.2%,#36993b 90.53%)",
        buttonGradient: "linear-gradient(90deg,#0098d7 1.2%,#3caa42 90.53%)",
      };
    } else if (colorSet === "classic") {
      return {
        mainGradientBg_135: "linear-gradient(130deg, #20304b , #1e293b 90.53%)",
        buttonGradient: "linear-gradient(90deg,#206bc4 1.2%,#206bc4 90.53%)",
      };
    } else {
      return {
        mainGradientBg_135:
          "linear-gradient(to right bottom, #007fff, #0059b2 120%)", //'blue',
        buttonGradient:
          "linear-gradient(to right bottom, #007fff, #007fff 180%)",
      };
    }
  };

  const themeLight = createTheme({
    palette: {
      mode: "light",
      background: {
        default: colorSet === "strong" ? "#f3f6f9" : "#f3f3f3", //"#efefef",
      },
      common: getColorMode(colorSet),
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
      common: getColorMode(colorSet),
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


  const value = {
    debug,
    isDebug,
    setIsDebug,
    colorMode, //dark-light
    getColorMode, //fresh-strong
    token,
    setToken
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
