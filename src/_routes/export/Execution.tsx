import React, { useRef, useEffect } from "react";
//------MUI-----
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
//------LIB-----------
import dayjs, { Dayjs } from "dayjs";
//------COMPONENTS----
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/"; //DesktopDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select, {
  //ValueType,
  ActionMeta,
} from "react-select";
import Stack from "@mui/system/Stack";
import { StackRow, StyledButton } from "_styles/MuiStyledComponents";
import AsyncSelect from 'react-select/async';
//import ApolloClient, { gql } from "apollo-boost";
import { useQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
//import { Filters } from "./components/Filters"

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


/*const client = new ApolloClient({
  uri: "https://metaphysics-production.artsy.net",
  cache: new InMemoryCache(),
});

const fetchArtists = async (input: string, cb: any) => {
  if (input && input.trim().length < 3) {
    return [];
  }
  const res = await client.query({
    query: gql`
      query {
        match_artist(term: "${input}") {
          name
          imageUrl
        }
      }
    `
  });

  if (res.data && res.data.match_artist) {
    return res.data.match_artist.map(
      (a: { name: string; imageUrl: string }) => ({
        label: a.name,
        value: a.imageUrl
      })
    );
  }

  return [];
};
*/

export const Execution = () => {
  const theme = useTheme();

//---------apollo select------------
const [artist, setArtist] = React.useState({
  label: "No Name",
  value: "https://dummyimage.com/200x200/000/fff&text=No+Artist"
});

  const [valueFrom, setValueFrom] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );
  const [valueTo, setValueTo] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const handleChangeFrom = (newValue: Dayjs | null) => {
    setValueFrom(newValue);
  };
  const handleChangeTo = (newValue: Dayjs | null) => {
    setValueTo(newValue);
  };
  const [selectedOptionTasks, setSelectedOptionTasks] = React.useState<any>(null);
  const [selectedOptionSteps, setSelectedOptionSteps] = React.useState<any>(null);

  const handleChangeTasks = (
    option: any, //Option, //readonly Option[],
    actionMeta: any // ActionMeta<Option>
  ) => {
    console.log("Option", option);
    setSelectedOptionTasks(option);
  };

  const handleChangeSteps = (
    option: any, //Option, //readonly Option[],
    actionMeta: any // ActionMeta<Option>
  ) => {
    console.log("Option", option);
    setSelectedOptionSteps(option);
  };

  const options = [
    { value: 1, label: "One" },
    { value: 2, label: "two two two two two" },
    { value: 3, label: "three three three three three three three" },
    {value: 4, label: "four four four four four" },
    {value: 5, label: "five five five" },
  ];
  const optionsSteps = [
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" },

  ];

  useEffect(() => {
    console.log("execution");
  }, []);

  //--------------styles--------------
  const gridRowSx = {
    gap: "10px",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Экспорт выполнения задач
      </Typography>
      <Box sx={{ display: "inline-block" }}>
        <Paper sx={{ pt: 3, pb: 2, px: 2 }}>
          <Stack spacing={4}>
            <StackRow>
              <Typography variant="subtitle2">Даты:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                <DesktopDatePicker
                  label="С даты"
                  inputFormat="MM/DD/YYYY"
                  value={valueFrom}
                  onChange={handleChangeTo}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DesktopDatePicker
                  label="по дату"
                  inputFormat="MM/DD/YYYY"
                  value={valueTo}
                  onChange={handleChangeTo}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </StackRow>
            <StackRow>
              <Typography variant="subtitle2">Задачи:</Typography>
              <Box sx={{flexGrow:1}}>
              <Select
              isMulti={true}
                //defaultValue={options[0] }
                onChange={handleChangeTasks}
                options={options}
                value={selectedOptionTasks}
                placeholder={"Выберите шаг задачи"}
                // styles={select_styles}
                classNamePrefix={
                  theme.palette.mode === "dark"
                    ? "react-select-dark"
                    : "react-select"
                }
              />
              </Box>
            </StackRow>
            <StackRow>
              <Typography variant="subtitle2">Задачи:</Typography>
              <Box sx={{flexGrow:1}}>
              {/*<AsyncSelect
          loadOptions={fetchArtists}
          onChange={(opt: any) => setArtist(opt)}
          placeholder="Search an Artist"
          className="select"
              />*/}
              </Box>
            </StackRow>
            <StackRow>
              <StyledButton
                variant="contained"
                theme={theme}
                //sx={{mb:-1}}
                //_color={"inherit"}
                //onClick={clearAll}
              >
                Экспортировать архив
              </StyledButton>
            </StackRow>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};
