import * as React from 'react';
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

const TEST_AUTH = gql`
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
`

interface IAuth {
  setIsLoggedIn: (value: boolean) => void; //Dispatch<SetStateAction<<boolean>>
}

type AForm = {
  email: string;
  password: string;
};

export function Auth({ setIsLoggedIn }: IAuth) {
  const theme = useTheme();
  const { loading, error, data } = useQuery(TEST_AUTH);

  const { control, formState, handleSubmit, watch } = useForm<AForm>({
    mode: "onTouched",
    // mode:'onBlur'
  });

  const onSubmit = (data: AForm) => {
    console.log(data);
    setIsLoggedIn(true);
  };

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

          <Box
            sx={{ mt: 1 }}
          >
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
                    value: /^\S+@\S+$/i,
                    message: "Некорректный ввод",
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
                    id="email"
                    label="Email Address"
                    //name="email"
                    autoComplete="email"
                    autoFocus
                    error={invalid && isTouched}
                    helperText={error?.message}
                    //defaultValue={''}
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
                    //defaultValue={''}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "#ffffff",
                  background: theme.palette.common.buttonGradient,
                }}
              >
                Войти
              </Button>
            </form>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

//https://stackoverflow.com/questions/70129485/react-hook-form-validation-with-material-ui-textfield-is-not-working
