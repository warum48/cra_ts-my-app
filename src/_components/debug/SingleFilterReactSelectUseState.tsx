import React, { useState, useReducer } from "react";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Select, {
  //ValueType,
  ActionMeta,
} from "react-select";
import { colourOptions } from "_components/debug/_mockadvsel";

const select_styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "normal",
    color: "white",
    backgroundColor: "yellow", //state.data.color,
    fontSize: state.selectProps.myFontSize,
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "yellow",
    color: "yellow", //state.data.color,
    fontSize: state.selectProps.myFontSize,
  }),
};

const options = [
  { value: 1, label: "One" },
  { value: 2, label: "two" },
  { value: 3, label: "three" },
];

type Option = typeof options;

export const Filters = () => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<any>(null);

  //-------------reducer object----------------------
  interface FilterState {
    status:string;
    source:string;
    task:string;
    region:string;
  }

  const [filters, setFilters] = useReducer(
    (filters: FilterState, newState: Partial<FilterState>) => ({
      ...filters,
      ...newState,
    }),
    {
      status:"",
    source:"",
    task:"",
    region:"",
    }
  );





  //--------------------------------------------------

  const handleChange = (
    option: any, //Option, //readonly Option[],
    actionMeta: any // ActionMeta<Option>
  ) => {
    console.log("Option", option);
    setSelectedOption(option);
  };

  const clearAll = () => {
    setSelectedOption(null);
  };

  return (
    <Paper sx={{ ml: 2, p: 2 }}>
      <Stack spacing={2}>
        {/*<StackHeader>Отфильтровать по: </StackHeader>*/}
        <Typography variant="subtitle2">Отфильтровать по:</Typography>
        {selectedOption && <code>debug: {selectedOption?.label}</code>}
        {/*<FilterSelect label={"Статус"} />
              <FilterSelect label={"Источник"} />
              <FilterSelect label={"Задача"} />
  <FilterSelect label={"Регион"} />*/}
        <Select
          //defaultValue={options[0] }
          onChange={handleChange}
         // onChange={(e)=>setFilters({status:e.label})} //.value
          //onChange={(e)=>console.log('e',e)}
          options={options}
          value={selectedOption}
          // styles={select_styles}
          classNamePrefix={
            theme.palette.mode === "dark" ? "react-select-dark" : "react-select"
          }
        />
        {/*
 <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
<Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      /> 
<Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
/>  */}
        {selectedOption && (
          <Button
            variant="contained"
            sx={{
              color: "#ffffff",
              boxShadow: 0,
              background: theme.palette.common.buttonGradient,
            }}
            onClick={clearAll}
          >
            Очистить фильтры
          </Button>
        )}
        <Typography>{JSON.stringify(filters)}</Typography>
      </Stack>
    </Paper>
  );
};

//https://github.com/SiwakornSitti/react-select-typescript-example/blob/master/src/App.tsx
//https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1
