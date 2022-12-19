import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "_styles/MuiStyledComponents";
//import { rows } from "_components/debug/_mockrows";

type IHeader = {
  field: string;
  headerName: string;
};
type Item = {
  date_beginning: string;
  date_end: string;
  step_name: string;
  step_type: string;
  step_skipped: string | boolean;
};

const columns: IHeader[] = [
  { field: "date_beginning", headerName: "Время начала" },
  {
    field: "date_end",
    headerName: "Дата окончания",
  },
  {
    field: "step_name",
    headerName: "Название шага",
  },
  {
    field: "step_type",
    headerName: "Тип шага",
  },
  {
    field: "step_skipped",
    headerName: "Шаг пропущен",
  },
];

const rows: Item[] = [
  {
    date_beginning: "Dec. 7, 2022, 7:53 p.m.",
    date_end: "Dec. 7, 2022, 7:57 p.m.",
    step_name: "Фото ДО начала работы",
    step_type: "Фото",
    step_skipped: "Нет",
  },
  {
    date_beginning: "Dec. 7, 2022, 7:53 p.m.",
    date_end: "Dec. 7, 2022, 7:57 p.m.",
    step_name: "Фото ПОСЛЕ работы",
    step_type: "Фото",
    step_skipped: "Нет",
  },
  {
    date_beginning: "Dec. 7, 2022, 7:53 p.m.",
    date_end: "Dec. 7, 2022, 7:57 p.m.",
    step_name: "Фото ценников и OOS менее 10шт",
    step_type: "Фото",
    step_skipped: "Нет",
  },
  {
    date_beginning: "Dec. 7, 2022, 7:53 p.m.",
    date_end: "Dec. 7, 2022, 7:57 p.m.",
    step_name: "Комментарий",
    step_type: "Комментарий",
    step_skipped: "Нет",
  },
];

export function Steps() {
  const theme = useTheme();
  function getStyleFor(row: Item, colfield: string) {
    if (colfield == "availability") {
      if (row[colfield as keyof Item] == "Есть в отчете") {
        return {
          //boxSizing:'border-box',
          color: theme.palette.success.main, //"green",
          //boxShadow:"inset 0 -2px 0px "  + theme.palette.success.light,
        };
      }
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((item, index) => (
              <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
                {item.headerName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={"row" + i}>
              {columns.map((col: IHeader, index) => (
                <StyledTableCell sx={getStyleFor(row, col.field)}>
                  {row[col.field as keyof typeof row]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/*
{col.field}
                    {row.shop}
                    {row["shop"]}
                    */
//!!row[col.field as keyof Item] || "-"
//!!
// Solution 1: When the type of the object is known
//const temp = someObj[field as keyof ObjectType]
// Solution 2: When the type of the object is not known
// const temp = someObj[field as keyof typeof someObj]
