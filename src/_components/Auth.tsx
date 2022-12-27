import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { useQuery, gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { StyledButton } from "_styles/MuiStyledComponents";
import { DebugBox } from "./debug/DebugBox";
import { ErrorSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import {GlobalContext} from "_context/ContextGlobal";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

const TEST_PRE_AUTH = gql`
  query MyQuery {
    login(login: "admin@admin.com", password: "1") {
      ... on LoginSuccess {
        __typename
        token
      }
      ... on LoginError {
        __typename
        detail
        statusCode
      }
    }
  }
`;

interface IAuth {
  setIsLoggedIn: (value: boolean) => void; //Dispatch<SetStateAction<<boolean>>
}

type AForm = {
  email: string;
  password: string;
};

export function Auth({ setIsLoggedIn }: IAuth) {
  //const [token, setTokem] = React.useContext(GlobalContext)
  const { token, setToken} = React.useContext(GlobalContext);
  const theme = useTheme();
  //const emailRef = React.useRef<any>(null);
  //const passRef = React.useRef<any>(null);
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const TEST_AUTH = gql`
  query MyQuery {
    login(login: "${email}", password: "${pass}") {
      ... on LoginSuccess {
        __typename
        token
      }
      ... on LoginError {
        __typename
        detail
        statusCode
      }
    }
  }
  `;

  //const { loading, error, data } = useQuery(TEST_AUTH);
  //const [doAuth, { loading, error, data }] = useLazyQuery(TEST_AUTH);
  const [
    doPreAuth,
    { loading: pre_loading, error: pre_error, data: pre_data },
  ] = useLazyQuery(TEST_PRE_AUTH);
  const [doAuth, { loading, error, data }] = useLazyQuery(TEST_AUTH);

  const { control, formState, handleSubmit, watch } = useForm<AForm>({
    mode: "onTouched",
    // mode:'onBlur'
  });

  const onSubmit = (data: AForm) => {
    console.log(data);
    doAuth();
    //setIsLoggedIn(true);
  };

  React.useEffect(() => {
    if (data && data.login?.token) {
      setIsLoggedIn(true);

      setToken(data.login?.token)
      
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Paper
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
          }}
        >
          <Box
            component="img"
            sx={{
              height: (53 / 3) * 2,
              width: (222 / 3) * 2,
            }}
            alt="logo"
            src={
              theme.palette.mode === "dark"
                ? "/surlogo_white.png"
                : "/surlogo.png"
            }
          />

          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                defaultValue={""}
                name="email"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Это поля обязательное",
                  },
                  pattern: {
                    value: /^\S+@\S+$/i, //  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/  ,//
                    message: "Некорректный ввод",
                  },
                }}
                render={({
                  field: { onChange, onBlur, value, ref },
                  //render={({ field: { onChange, onBlur, value, ref } }) => (
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <TextField
                    //{...field}
                    // onChange={onChange}
                    onBlur={onBlur}
                    //value={value}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    //name="email"
                    autoComplete="email"
                    autoFocus
                    error={invalid && isTouched}
                    helperText={error?.message}
                    //ref={emailRef}
                    //defaultValue={''}
                    //value = {email}
                    //onChange={ (e) => {console.log(e.target.value)}}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      onChange(e.target.value);
                    }}
                  />
                )}
              />

              <Controller
                defaultValue={""}
                name="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Надо заполнить",
                  },
                }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    //name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={invalid && isTouched}
                    helperText={error?.message}
                    // ref={passRef}
                    onChange={(e) => {
                      setPass(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    //defaultValue={''}
                  />
                )}
              />
              <DebugBox>
                <Button
                  //type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 0,
                    color: "#ffffff",
                    background: theme.palette.common.buttonGradient,
                  }}
                  onClick={() => setIsLoggedIn(true)}
                >
                  пропустить 
                </Button>

                {/* <StyledButton
                  sx={{
                    mt: 1,
                    mb: 0,
                  }}
                  variant="contained"
                  fullWidth
                  theme={theme}
                  onClick={() => doPreAuth()}
                >
                  Тестовый запрос без входа
                </StyledButton>
                {pre_data && <DebugBox code={JSON.stringify(pre_data)} />} */}

                {/*} <StyledButton
                variant="contained"
                fullWidth
                theme={theme}
                //onClick={()=>console.log('cv', emailRef.current)} //- doesn't work
                onClick={() => console.log("cv", email)}
              >
                log
              </StyledButton>*/}

                
              </DebugBox>

              <StyledButton
                type="submit"
                variant="contained"
                fullWidth
                theme={theme}
                sx={{
                  mt: 1,
                  mb: 0,
                }}
                //onClick={() => doAuth()}
              >
                ВХОД
              </StyledButton>

              {data && <DebugBox code={JSON.stringify(data)} />}
              {error && (
                <>
                  {/*error.map((err, i) => (
              <div>{err.message}</div>
              ))}
              <div>{JSON.stringify(error)}</div>
              <div>{JSON.stringify(error.graphQLErrors[0].message)}</div>*/}
                  <DebugBox code={JSON.stringify(error, null, 3)} />
                </>
              )}
              {(data?.login?.statusCode == 401 ||
                data?.login?.statusCode == 404) && (
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="error.main">
                    {data.login.detail}
                  </Typography>
                </Box>
              )}
            </form>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

//https://stackoverflow.com/questions/70129485/react-hook-form-validation-with-material-ui-textfield-is-not-working
