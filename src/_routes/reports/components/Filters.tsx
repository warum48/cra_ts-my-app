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
  SingleValue,
} from "react-select";
import { DebugBox } from "_components/debug/DebugBox";
import { useQuery, gql } from "@apollo/client";
import { StyledButton } from "_styles/MuiStyledComponents";
import { ALL_FILTERS } from "_apollo/queries";

interface ISelectLabel {
  text: string;
}

const SelectLabel = ({ text }: ISelectLabel) => {
  const theme = useTheme();
  return (
    <Typography
      variant="subtitle2"
      sx={{
        lineHeight: "100%",
        pb: 1,
      }}
    >
      {text}
    </Typography>
  );
};

/*const options = [
  { value: 1, label: "One" },
  { value: 2, label: "two" },
  { value: 3, label: "three" },
];

type Option = typeof options;*/

export const Filters = () => {
  const { debug } = useParams();
  console.log("debug", debug);
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const filtersVar_re = useReactiveVar(filtersVar);


  const { loading, error, data } = useQuery(ALL_FILTERS);

  //-------------reducer object----------------------
  interface FilterState {
    status: SingleValue<{ value: number; label: string }> | undefined;
    source: SingleValue<{ value: number; label: string }> | undefined;
    taskId: SingleValue<{ value: number; label: string }> | undefined;
    regionId: SingleValue<{ value: number; label: string }> | undefined;
  }

  interface IGQLitem {
    source?: string;
    description: string;
    status?: string;
    id?: string;
    name?: string;
  }

  const defFiltersState = {
    status: undefined,
    source: undefined,
    taskId: undefined,
    regionId: undefined,
  };

  const [filters, setFilters] = useReducer(
    (filters: FilterState, newState: Partial<FilterState>) => ({
      ...filters,
      ...newState,
    }),
    defFiltersState
  );

  useEffect(() => {
    let tempFiltersOb: any = {}; //TODO add ttype from var
    let k: keyof typeof filters;
    for (k in filters) {
      console.log("k", k);
      console.log("fk", filters[k]);
      if (filters[k] && filters[k]?.value) {
        //tempFiltersOb[k]=filters[k].label;
        tempFiltersOb[k] = filters[k]?.value;
      }
    }
    filtersVar(tempFiltersOb);
    console.log("--ue--filters", filters);
  }, [filters]);

  //--------------------------------------------------

  const handleChange = (
    option: any, //Option, //readonly Option[],
    actionMeta: any // ActionMeta<Option>
  ) => {
    console.log("Option", option);
    setSelectedOption(option);
  };

  const clearAll = () => {
    setFilters(defFiltersState);
  };

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      {data && (
        <Stack spacing={2}>
          {/*
        <Typography variant="subtitle2">?????????????????????????? ????:</Typography>
        */}

          <Box>
            <SelectLabel text={"????????????:"} />
            <Select
              isClearable={true}
              onChange={(e) => setFilters({ status: e })} //.value
              //options={options}
              options={data.getTeStatus.statusesList.map(
                ({ status, description }: IGQLitem) => ({
                  value: status,
                  label: description,
                })
              )}
              placeholder="..."
              value={filters.status || null}
              classNamePrefix={
                theme.palette.mode === "dark"
                  ? "react-select-dark"
                  : "react-select"
              }
            />
          </Box>

          <Box>
            <SelectLabel text={"????????????????:"} />
            <Select
              isClearable={true}
              placeholder="..."
              onChange={(e) => setFilters({ source: e })} //.value
              options={data.getTeSources.sourcesList.map(
                ({ source, description }: IGQLitem) => ({
                  value: source,
                  label: description,
                })
              )}
              value={filters.source || null}
              classNamePrefix={
                theme.palette.mode === "dark"
                  ? "react-select-dark"
                  : "react-select"
              }
            />
          </Box>

          <Box>
            <SelectLabel text={"????????????:"} />
            <Select
              isClearable={true}
              placeholder="..."
              onChange={(e) => setFilters({ taskId: e })} //.value
              //options={options}
              options={data.getTasksNames.tasksNamesList.map(
                ({ id, name }: IGQLitem) => ({ value: id, label: name })
              )}
              value={filters.taskId || null}
              classNamePrefix={
                theme.palette.mode === "dark"
                  ? "react-select-dark"
                  : "react-select"
              }
            />
          </Box>

          <Box>
            <SelectLabel text={"????????????:"} />
            <Select
              isClearable={true}
              placeholder="..."
              onChange={(e) => setFilters({ regionId: e })} //.value
              //options={options}
              options={data.getRegions.regionsList.map(
                ({ id, name }: IGQLitem) => ({ value: id, label: name })
              )}
              value={filters.regionId || null}
              classNamePrefix={
                theme.palette.mode === "dark"
                  ? "react-select-dark"
                  : "react-select"
              }
            />
          </Box>

          {(filters.status ||
            filters.taskId ||
            filters.source ||
            filters.regionId) && (
              <StyledButton
              variant="contained"
              //sx={{
              //  color: "#ffffff",
              //  boxShadow: 0,
              //  background: theme.palette.common.buttonGradient,
              //}}
              onClick={clearAll}
            >
              ???????????????? ??????????????
            </StyledButton>
          )}
          <DebugBox code={JSON.stringify(filters)} />
          <DebugBox code={"apollo state: " + JSON.stringify(filtersVar_re)} />
        </Stack>
      )}
    </Paper>
  );
};


