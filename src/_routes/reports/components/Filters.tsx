import React, { useState, useReducer } from "react";
import { Paper, Stack, Typography, Button, Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Select, {
  //ValueType,
  ActionMeta,
  SingleValue
} from "react-select";
import { DebugBox } from "_components/debug/DebugBox";


interface ISelectLabel {
  text: string;
}

const SelectLabel = ({ text }: ISelectLabel) => {
  const theme = useTheme();
  return (
    <Typography variant="overline" sx={{ lineHeight: "100%" }}>
      {text}
    </Typography>
  );
};

const options = [
  { value: 1, label: "One" },
  { value: 2, label: "two" },
  { value: 3, label: "three" },
];

type Option = typeof options;

export const Filters = () => {
  const {debug} = useParams();
  console.log('debug',debug);
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<any>(null);

  //-------------reducer object----------------------
  interface FilterState {
    /*status: string;
    source: string;
    task: string;
    region: string;*/
    status: SingleValue<{ value: number; label: string; }> | undefined
    source: SingleValue<{ value: number; label: string; }> | undefined
    task: SingleValue<{ value: number; label: string; }> | undefined
    region: SingleValue<{ value: number; label: string; }> | undefined
  }

  const defFiltersState = {
    /*status: "",
    source: "",
    task: "",
    region: "",*/
    status: undefined,
    source: undefined,
    task: undefined,
    region: undefined,
  }

  const [filters, setFilters] = useReducer(
    (filters: FilterState, newState: Partial<FilterState>) => ({
      ...filters,
      ...newState,
    }),
    defFiltersState
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
    //setSelectedOption(null);
    setFilters(defFiltersState);
  };

  return (
    <Paper 
    sx={{ 
      //ml: 2, 
      //maxWidth:'604px',
      p: 2 }}
    >
      <Stack spacing={2}>
        {/*
        <Typography variant="subtitle2">Отфильтровать по:</Typography>
        */}

        <Box>
          <SelectLabel text={"Статус:"} />
          <Select
            //label={"Статус"}
            //defaultValue={options[0] }
            //onChange={handleChange}
            //onChange={(e) => setFilters({ status: e?.label })} //.value
            onChange={(e) => setFilters({ status: e })} //.value
            //onChange={(e)=>console.log('e',e)}
            options={options}
            // value={selectedOption}
            //value={options.find((x) => x.label === filters.status)}
            value={filters.status|| null}
            //value={filters.status}
            // styles={select_styles}
            classNamePrefix={
              theme.palette.mode === "dark"
                ? "react-select-dark"
                : "react-select"
            }
          />
        </Box>

        <Box>
          <SelectLabel text={"Источник:"} />
          <Select
            onChange={(e) => setFilters({ source: e })} //.value
            options={options}
            value={filters.source || null}
            //value={filters.source}
            classNamePrefix={
              theme.palette.mode === "dark"
                ? "react-select-dark"
                : "react-select"
            }
          />
        </Box>

        <Box>
          <SelectLabel text={"Задача:"} />
          <Select
            onChange={(e) => setFilters({ task: e })} //.value
            options={options}
            value={filters.task || null}
            classNamePrefix={
              theme.palette.mode === "dark"
                ? "react-select-dark"
                : "react-select"
            }
          />
        </Box>

        <Box>
          <SelectLabel text={"Регион:"} />
          <Select
            onChange={(e) => setFilters( {region: e})} //.value
            options={options}
            value={filters.region || null}
            classNamePrefix={
              theme.palette.mode === "dark"
                ? "react-select-dark"
                : "react-select"
            }
          />
        </Box>

          
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
        {/*selectedOption && (*/}
        {(filters.status || filters.task || filters.source || filters.region) && (
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
         
       {/*} <Typography sx={{ wordWrap: "break-word", fontSize: "10px" }}>
          <code>{JSON.stringify(filters)}/debug:{ debug }</code>
          </Typography> */}
          <DebugBox code={JSON.stringify(filters)}/>
      </Stack>
    </Paper>
  );
};

//https://github.com/SiwakornSitti/react-select-typescript-example/blob/master/src/App.tsx
//https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1
