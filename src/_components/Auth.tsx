import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react"; //fork
//-------REDUX
import { useSelector, useDispatch } from "react-redux";
/*import {
  //updateLoopNum,
  //incrementLoopNum,
  //currentDict,
  //getCurLoopNum,
} from "_redux/debug/unpersistableSlice";*/
import { RootState } from "_redux/ReduxWrapper";
//--------context----------------
import { GlobalContext } from "_context/ContextGlobal";
//--------MUI---------
//import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { bluegreen_bg } from "_styles/jsstyles";

{
  /*function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}*/
}

//const theme = createTheme();
//const theme = useTheme();

interface IAuth {
  setIsLoggedIn: (value: boolean) => void; //Dispatch<SetStateAction<<boolean>>
}

export function Auth({ setIsLoggedIn }: IAuth) {
  const theme = useTheme();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //py: 2, px:2,
           // my: 0, mx: 4,
              
            //  bgcolor: '#ffffff'
                
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
        </Avatar> */}

          <Box
            component="img"
            sx={{
              height: 53/3*2,
              width: 222/3*2,
              //maxHeight: { xs: 233, md: 167 },
              //maxWidth: { xs: 350, md: 250 },
            }}
            alt="logo"
            src={
              theme.palette.mode === "dark"
                ? "./surlogo_white.png"
                : "./surlogo.png"
            }
          />

          {/*<Typography component="h1" variant="h5">
            Sign in {theme.palette.mode}
    </Typography>*/}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
/>*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , color: '#ffffff',  ...bluegreen_bg}}
              //just placeholder:
              onClick={() => setIsLoggedIn(true)}
            >
              Войти
            </Button>
            {/*<Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
</Grid>*/}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
