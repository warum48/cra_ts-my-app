import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { StyledButton } from "_styles/MuiStyledComponents";
import { DebugBox } from "./debug/DebugBox";
import { Typography } from "@mui/material";
import { GlobalContext } from "_context/ContextGlobal";

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
  const [refresher, setRefresher] = React.useState(0);
  const { token, setToken } = React.useContext(GlobalContext);
  const theme = useTheme();
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
    /*   setTimeout(()=>{
       // setRefresher(refresher+1)
       //@ts-ignore
       document.getElementById('password').click();
       
      },1000)

      var evt = new MouseEvent("click", {
        view: window,
        clientX: 0
      });
      window.dispatchEvent(evt);
      let iterations = 0;
  
      const interval:any = setInterval(() => {
        const value = `${pass}`;//this.inputs.email.value;
        console.log('value', value);
        // plain js alternative:
         //const value:any = document.getElementById("password").value;
        if (!!value || iterations > 20) {
          console.log(value);
          return clearInterval(interval);
        }
  
        iterations++;
        console.log("not found -> repeat");
      }, 100);*/
  }, []);

  React.useEffect(() => {
    if (data && data.login?.token) {
      setIsLoggedIn(true);
      setToken(data.login?.token);
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
                ? "https://dev.nahab.info/aerovadim/surveer/surlogo_white.png" //"/surlogo_white.png"
                : "https://client.shop-survey.ru/static/admin/img/logo.png" //"/surlogo.png"
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
                defaultValue={pass || ""}
                name="password"
                key={"reffresh" + refresher}
                //autoComplete="new-password"
                //value={pass}
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
                    //autoFocus
                    //name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    //autoComplete="current-password"
                    autoComplete="new-password"
                    //autoComplete="off"
                    error={invalid && isTouched}
                    helperText={error?.message}
                    // ref={passRef}
                    onChange={(e) => {
                      setPass(e.target.value);
                      field.onChange(e.target.value);
                    }}
                    //InputLabelProps={{ shrink: true }}
                    //value={pass }
                    //defaultValue={''}
                    //key={'reffresh'+refresher}
                    //key="Confirmation Code"
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


