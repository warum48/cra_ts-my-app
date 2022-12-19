import React, { useRef, useEffect } from "react";
//------MUI-----
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
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
//import { Filters } from "./components/Filters"

export const ExportPictures = () => {
  const theme = useTheme();
  const [valueFrom, setValueFrom] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );
  const [valueTo, setValueTo] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  //const handleChangeFrom = (newValue: Dayjs | null) => {
  //  setValueFrom(newValue);
  //};
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

  

  //--------------styles--------------
  //const gridRowSx = {
  //  gap: "10px",
  //  display: "flex",
  //  alignItems: "center",
  //};

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
              <Select
                //defaultValue={options[0] }
                onChange={handleChangeSteps}
                options={optionsSteps}
                value={selectedOptionSteps}
                // styles={select_styles}
                placeholder={"Выберите задачу           "}
                classNamePrefix={
                  theme.palette.mode === "dark"
                    ? "react-select-dark"
                    : "react-select"
                }
              />
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
