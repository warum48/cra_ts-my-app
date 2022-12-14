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


export const Execution = () => {
  const theme = useTheme();
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
  const [selectedOption, setSelectedOption] = React.useState<any>(null);

  const handleChangeTasks = (
    option: any, //Option, //readonly Option[],
    actionMeta: any // ActionMeta<Option>
  ) => {
    console.log("Option", option);
    setSelectedOption(option);
  };

  const options = [
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
    alignItems:'center'
  };

  return (
    <>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Экспорт выполнения задач</Typography>
        </Grid>
        <Grid item xs={12} sx={gridRowSx}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="subtitle2">Даты:</Typography>
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
        </Grid>
        <Grid item xs={12} sx={gridRowSx}>
          <Typography variant="subtitle2">Задачи:</Typography>
          <Select
            //defaultValue={options[0] }
            onChange={handleChangeTasks}
            options={options}
            value={selectedOption}
            // styles={select_styles}
            classNamePrefix={
              theme.palette.mode === "dark"
                ? "react-select-dark"
                : "react-select"
            }
          />
        </Grid>
        <Grid item xs={12} sx={gridRowSx}>
          <Typography variant="subtitle2">Задачи:</Typography>
          <Select
            //defaultValue={options[0] }
            onChange={handleChangeTasks}
            options={options}
            value={selectedOption}
            // styles={select_styles}
            classNamePrefix={
              theme.palette.mode === "dark"
                ? "react-select-dark"
                : "react-select"
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

/*<SelectAdvanced/>
  <SelectAdvanced/>
  <SelectAdvanced/>
  <SelectAdvanced/>*/

/*
  <Paper sx={{ ml: 2, p: 2 }}>
            <Stack spacing={2}>
              
              <Typography variant="subtitle2" >Отфильтровать по:</Typography>
              <FilterSelect label={"Статус"} />
              <FilterSelect label={"Источник"} />
              <FilterSelect label={"Задача"} />
  <FilterSelect label={"Регион"} />

  <Button
          type="submit"
          variant="contained"
          sx={{
            color: "#ffffff",
            boxShadow: 0,
            background: theme.palette.common.buttonGradient,
          }}
          //onClick={() => setIsLoggedIn(true)}
        >
          Очистить фильтры
        </Button>
            </Stack>
          </Paper>
          */
