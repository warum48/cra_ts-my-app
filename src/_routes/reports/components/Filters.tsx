import React, { useState, useReducer, useEffect } from "react";
//------apollo--
import { filtersVar } from "_apollo/state";
import { useReactiveVar } from "@apollo/client";
//------mui-----
import { Paper, Stack, Typography, Button, Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Select, {
  //ValueType,
  ActionMeta,
  SingleValue
} from "react-select";
import { DebugBox } from "_components/debug/DebugBox";
import { useQuery, gql } from '@apollo/client';


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
  const filtersVar_re = useReactiveVar(filtersVar);

  const SOURCES_FILTER = gql`
  query SourcesFilterQuery {
    getTeSources {
      sourcesList {
        source
        description
      }
    }
  }
  `
  const STATUS_FILTER = gql`
  query StatusFilterQuery {
    getTeStatus {
      statusesList {
        description
        status
      }
    }
  }
`
const { loading:loading_sources, error:error_sources, data:data_sources } = useQuery(SOURCES_FILTER);


  //-------------reducer object----------------------
  interface FilterState {
    /* objects are types of react-select items*/
    /*status: string;
    source: string;
    task: string;
    region: string;*/
    status: SingleValue<{ value: number; label: string; }> | undefined
    source: SingleValue<{ value: number; label: string; }> | undefined
    taskId: SingleValue<{ value: number; label: string; }> | undefined
    regionId: SingleValue<{ value: number; label: string; }> | undefined
  }

  interface IGQLitem{
    source:string;
    description:string;
  }

  const defFiltersState = {
    /*status: "",
    source: "",
    task: "",
    region: "",*/
    status: undefined,
    source: undefined,
    taskId: undefined,
    regionId: undefined,
  }

  const [filters, setFilters] = useReducer(
    (filters: FilterState, newState: Partial<FilterState>) => ({
      ...filters,
      ...newState,
    }),
    defFiltersState
  );

  useEffect(()=>{
    let tempFiltersOb:any = {}; //TODO add ttype from var
   /* if(filters.status){
      tempFiltersOb.status=filters.status
    }
    if(filters.region){
      tempFiltersOb.region=filters.region
    }*/
    let k: keyof typeof filters;
    for(k in filters){
      console.log('k',k);
      console.log('fk',filters[k]);
      if(filters[k] && filters[k]?.value ){
        //tempFiltersOb[k]=filters[k].label;
        tempFiltersOb[k] = filters[k]?.value;
      }
    } 
    filtersVar(tempFiltersOb)
    console.log('--ue--filters', filters);
  },[filters])

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
            isClearable={true}
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

{data_sources && 
        <Box>
          <SelectLabel text={"Источник:"} />
          <Select
          isClearable={true}
            onChange={(e) => setFilters({ source: e })} //.value
            //options={options}
            //options={data_sources.teSources.sourcesList}
            //getOptionLabel={option => option.source}
            //getOptionValue={option => option.description} //!! typeError: Property 'description' does not exist on type '{ value: number; label: string; }'.
            options={data_sources.getTeSources.sourcesList.map(({ source, description }:IGQLitem) => ({ value: source, label: description}))}
            value={filters.source || null}
            //value={filters.source}
            classNamePrefix={
              theme.palette.mode === "dark"
                ? "react-select-dark"
                : "react-select"
            }
          />
        </Box>
}

        <Box>
          <SelectLabel text={"Задача:"} />
          <Select
          isClearable={true}
            onChange={(e) => setFilters({ taskId: e })} //.value
            options={options}
            value={filters.taskId || null}
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
          isClearable={true}
            onChange={(e) => setFilters( {regionId: e})} //.value
            options={options}
            value={filters.regionId || null}
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
        {(filters.status || filters.taskId || filters.source || filters.regionId) && (
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
          <DebugBox code={'apollo state: ' + JSON.stringify(filtersVar_re)}/>
      </Stack>
    </Paper>
  );
};

//https://github.com/SiwakornSitti/react-select-typescript-example/blob/master/src/App.tsx
//https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1
