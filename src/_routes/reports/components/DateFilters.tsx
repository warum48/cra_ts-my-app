import React, { useState, useReducer, useEffect } from "react";
//------apollo--

import { gql, useQuery, useReactiveVar } from "@apollo/client";
//------mui-----
import { Paper, Stack, Typography, Button, Box, Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { DateItem } from "_styles/MuiStyledComponents";
import {
  filtersVar,
  searchInputVar,
  startDateVar,
  endDateVar,
  startDateInitValue,
  endDateInitValue,
} from "_apollo/state";
import dayjs from "dayjs";
import { GEO_TE_BYID, GET_EARLIEST_DATE } from "_apollo/queries";
import { DebugBox } from "_components/debug/DebugBox";

//interface day{
//date: Date,
//}
interface IMonth {
  name: string;
  num: number;
  year: number;
}

//const months = ['Декабрь 2022', 'Ноябрь 2022', 'Октябрь 2022', 'Сентябрь 2022']
/*const months = [
  { name: "Декабрь 2022", num: 11, year: 2022 },
  { name: "Ноябрь 2022", num: 10, year: 2022 },
  { name: "Октябрь 2022", num: 9, year: 2022 },
  { name: "Сентябрь 2022", num: 8, year: 2022 },
]; */

function make2digit(num: number) {
  //let outString='';
  if ((num + "").length == 1) {
    //outString =
    return "0" + num;
  } else {
    return num + "";
  }
}

//interface IDinM
function getDaysInMonth(month: number, year: number) {
  console.log("gd");
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    //days.push(new Date(date));
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/*interface IDateFilters{
  fromDate?: string
}
{fromDate}:IDateFilters
*/

export const DateFilters = () => {
  const [showByMonth, setShowByMonth] = useState<boolean>(true); // or by day inside month
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [months, setMonths] = useState<IMonth[]>([])

  const { loading, error, data } = useQuery(GET_EARLIEST_DATE, {
    variables: {
      page: 1,
    },
  });

  React.useEffect(() => {
    if(data){
    let givenDateTime = data.getTasksExecutions.earliestDate; //'2022-05-05';// "2021-01-29T04:22:22.148Z";

    let createdDate = new Date(givenDateTime); //givenDateTime
    createdDate.setDate(1);
    let currentDate = new Date();
    let dateAndYearList = [
      //createdDate.toLocaleString("ru", { month: "long", year: "numeric" }),
      {
        name: createdDate.toLocaleString("ru", {
          month: "long",
          year: "numeric",
        }).replace('г.', ''),
        num: createdDate.getMonth(),
        year: createdDate.getFullYear(),
      },
    ];

    while (
      new Date(createdDate.setMonth(createdDate.getMonth() + 1)) < currentDate
    ) {
      dateAndYearList.unshift(
        //createdDate.toLocaleString("ru", { month: "long", year: "numeric" })
        {
          name: createdDate.toLocaleString("ru", {
            month: "long",
            year: "numeric",
          }).replace('г.', ''),
          num: createdDate.getMonth(),
          year: createdDate.getFullYear(),
        }
      );
    }

    console.log(dateAndYearList);
    setMonths(dateAndYearList);
  }
  }, [data]);

  return (
    <>
      {data && (
        <Box sx={{ mb: 2 }}>
          <DebugBox>{JSON.stringify(data)}</DebugBox>
          {/*<DateItem
              text="Все даты"
              onClick={() => {
                console.log("all");
                endDateVar(endDateInitValue)
                startDateVar(startDateInitValue)
                //setDaysInMonth(getDaysInMonth(month.num, month.year));
                //setShowByMonth(false);
              }}
            />*/}
          {showByMonth ? (
            months.map((month, index) => (
              <DateItem
                key={"month" + index}
                text={month.name}
                onClick={() => {
                  console.log("cl");
                  setDaysInMonth(getDaysInMonth(month.num, month.year));
                  setShowByMonth(false);
                  console.log(
                    "-start-",
                    month.year + "-" + (month.num + 1) + "-" + "01"
                  );
                  console.log(
                    "-end-",
                    month.year +
                      "-" +
                      (month.num + 1) +
                      "-" +
                      getDaysInMonth(month.num, month.year).length
                  );
                  startDateVar(
                    month.year + "-" + make2digit(month.num + 1) + "-" + "01"
                  );
                  endDateVar(
                    month.year +
                      "-" +
                      make2digit(month.num + 1) +
                      "-" +
                      getDaysInMonth(month.num, month.year).length
                  );
                }}
              />
            ))
          ) : (
            <>
              <DateItem
                text={"<< Назад к месяцам"}
                onClick={() => {
                  setShowByMonth(true);
                  endDateVar(endDateInitValue);
                  startDateVar(startDateInitValue);
                }}
              />
              {daysInMonth.map((day, index) => (
                <DateItem
                  key={"day" + index}
                  text={dayjs(day).format("DD.MM")}
                  onClick={() => {
                    console.log(dayjs(day).format("DD.MM"));
                    //startDateVar(day)
                    console.log(
                      "add",
                      dayjs(day).add(1, "day").format("YYYY-MM-DD")
                    );
                    endDateVar(dayjs(day).format("YYYY-MM-DD")); //.add(1, 'day')
                    startDateVar(dayjs(day).format("YYYY-MM-DD"));
                  }}
                />
              ))}
            </>
          )}
        </Box>
      )}
    </>
  );
};
