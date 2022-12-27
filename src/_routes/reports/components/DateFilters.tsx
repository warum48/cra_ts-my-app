import React, { useState, useReducer, useEffect } from "react";
//------apollo--
import { filtersVar } from "_apollo/state";
import { useReactiveVar } from "@apollo/client";
//------mui-----
import { Paper, Stack, Typography, Button, Box, Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { DateItem } from "_styles/MuiStyledComponents";
import dayjs from 'dayjs';

//interface day{
    //date: Date,
//}

//const months = ['Декабрь 2022', 'Ноябрь 2022', 'Октябрь 2022', 'Сентябрь 2022']
const months = [
  { name: "Декабрь 2022", num: 11, year:2022 },
  { name: "Ноябрь 2022", num: 10, year:2022 },
  { name: "Октябрь 2022", num: 9, year:2022 },
  { name: "Сентябрь 2022", num: 8, year:2022 }
];

//interface IDinM
function getDaysInMonth(month: number, year: number) {
    console.log('gd');
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    //days.push(new Date(date));
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/*
let givenDateTime = '2021-01-29T04:22:22.148Z';

let createdDate = new Date(givenDateTime);
createdDate.setDate(1);
let currentDate = new Date();
let dateAndYearList = [createdDate.toLocaleString('en', { month: 'long', year: 'numeric' })];

while (createdDate.setMonth(createdDate.getMonth() + 1) < currentDate) {
    dateAndYearList.unshift(createdDate.toLocaleString('en', { month: 'long', year: 'numeric' 
    }));
}

console.log(dateAndYearList)
*/

export const DateFilters = () => {
  const [showByMonth, setShowByMonth] = useState<boolean>(true); // or by day inside month
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([])
  return (
    <Box sx={{ mb: 2 }}>

      {showByMonth ? months.map((month, index) => (
        <>
        {/*<Paper
    onClick={()=>{console.log('cl'); setDaysInMonth(getDaysInMonth(month.num, month.year)); setShowByMonth(false)}}
      sx={{ p: 1, display: "inline", mr: "1px", mb: "1px", pt: 0, pb: "4px" }}
      elevation={0}
    >
      <Link variant="caption">{month.name}</Link>
      </Paper>*/}
        
        <DateItem text={month.name} onClick={()=>{console.log('cl'); setDaysInMonth(getDaysInMonth(month.num, month.year)); setShowByMonth(false)}}/>
        </>
      )) :
      <> 
       <DateItem text={'<< Назад к месяцам'} onClick={()=>setShowByMonth(true)}/>{
      daysInMonth.map((day, index) => (
        <DateItem text={dayjs(day).format('DD.MM')} onClick={()=>console.log(dayjs(day).format('DD.MM'))}/>
      ))}
      </>
    }
    </Box>
  );
};
