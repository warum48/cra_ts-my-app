import React, {useState} from "react";
import {Paper, Stack, Typography, Button} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Select, { 
    //ValueType, 
    ActionMeta }  from 'react-select';
import { colourOptions } from '_components/debug/_mockadvsel';

const options = [
    { value: 1, label: "One" },
    { value: 2, label: "two" },
    { value: 3, label: "three" }
  ];
  
  type Option = typeof options;

export const Filters = () => {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState<any>(null);

    const handleChange = (
        option: any, //Option, //readonly Option[],
        actionMeta: any// ActionMeta<Option>
      ) => {
        console.log("Option", option);
        setSelectedOption(option);
      };

      const clearAll = () => {
        setSelectedOption(null);
      }

    return(
    <Paper sx={{ ml: 2, p: 2 }}>
            <Stack spacing={2}>
              {/*<StackHeader>Отфильтровать по: </StackHeader>*/}
              <Typography variant="subtitle2" >Отфильтровать по:</Typography>
              {/*<FilterSelect label={"Статус"} />
              <FilterSelect label={"Источник"} />
              <FilterSelect label={"Задача"} />
  <FilterSelect label={"Регион"} />*/}
 <Select
       //defaultValue={options[0] }
        onChange={handleChange}
        options={options}
        value={selectedOption}
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
{ selectedOption &&      
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
}
            </Stack>
          </Paper>
    )
}

//https://github.com/SiwakornSitti/react-select-typescript-example/blob/master/src/App.tsx

