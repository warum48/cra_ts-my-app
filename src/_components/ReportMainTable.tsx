import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "_styles/jsstyles";
import { rows } from "_components/debug/_mockrows";

/*function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich Ice cream sandwich Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
*/

/*const columns  = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'task',
    headerName: 'Задача',
    minWidth: 200,
    flex:1,
    //editable: true,
    //headerClassName: 'super-app-theme--header',
  },
  {
    field: 'date_beginning',
    headerName: 'Дата начала',
    width: 180,
    //editable: true,
  },
  {
    field: 'date_end',
    headerName: 'Дата завершения',
   // type: 'number',
    width: 180,
    //editable: true,
  },
  {
    field: 'worker',
    headerName: 'Сотрудник',
    //description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
   // valueGetter: (params: GridValueGetterParams) =>
   //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'shop',
    headerName: 'Магазин',
    //type: 'number',
    minWidth: 110,
    flex:5
    //editable: true,
  },
  {
    field: 'source',
    headerName: 'Источник',
    //type: 'number',
    width: 110,
    //editable: true,
  },
  {
    field: 'status',
    headerName: 'Статус',
   // type: 'number',
    width: 110,
    //editable: true,
  },
];*/
/*type Item = {
    field: string,
    headerName: string,
}*/
type IHeader = {
  field: string;
  headerName: string;
};
type Item = {
  id: number | string;
  task: string;
  date_beginning: string;
  date_end: string;
  worker: string;
  shop: string;
  source: string;
  status: string;
};

const columns: IHeader[] = [
  { field: "id", headerName: "ID" },
  {
    field: "task",
    headerName: "Задача",
  },
  {
    field: "date_beginning",
    headerName: "Дата начала    ",
  },
  {
    field: "date_end",
    headerName: "Дата завершения",
  },
  {
    field: "worker",
    headerName: "Сотрудник",
  },
  {
    field: "shop",
    headerName: "Магазин",
  },
  {
    field: "source",
    headerName: "Источник",
  },
  {
    field: "status",
    headerName: "Статус",
  },
];




export default function ReportDetailsTable() {

  const theme = useTheme();
  function getStyleFor(row:Item, colfield:string){
  
    if(colfield == "status"){
      if(row[colfield as keyof Item] == "Проверен"){
        return {
          //boxSizing:'border-box',
          color:theme.palette.success.main, //"green",
          boxShadow:"inset 0 -2px 0px "  + theme.palette.success.light,
        }
      }else if(row[colfield as keyof Item] == "Завершен"){
        return {
          color:theme.palette.primary.dark
        }
      }else if(row[colfield as keyof Item] == "Начат"){
        return {
          color:theme.palette.text.secondary
        }
      }else if(row[colfield as keyof Item] == "Временный отказ"){
        return {
          color:theme.palette.error.main,
          boxShadow:"inset 0 -2px 0px "  + theme.palette.error.light,
        }
      }
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/*}
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell>Calories</StyledTableCell>
            <StyledTableCell>Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell>Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell>Protein&nbsp;(g)</StyledTableCell>
  */}
            {columns.map((item, index) => (
              <StyledTableCell sx={{whiteSpace: "nowrap"}}>{item.headerName}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.calories}</StyledTableCell>
              <StyledTableCell>{row.fat}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
              <StyledTableCell sx={{color:'red'}}>{row.protein}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
              <StyledTableCell>{row.carbs}</StyledTableCell>
          <StyledTableCell>{row.carbs}</StyledTableCell> */}
              {columns.map((col: IHeader, index) => (
                <>
                  {/*<StyledTableCell>{row.shop}</StyledTableCell>*/}
                  <StyledTableCell
                  sx={ getStyleFor(row, col.field) }
                  >
                    
                    {row[col.field as keyof typeof row] || "-"}
                  </StyledTableCell>
                </>
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
