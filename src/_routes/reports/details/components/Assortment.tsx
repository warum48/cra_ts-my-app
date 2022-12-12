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
//import { rows } from "_components/debug/_mockrows";


type IHeader = {
  field: string;
  headerName: string;
};
type Item = {
  product: string;
  availability: string;
  amount: string | number;
  faces: string | number;
};

const columns: IHeader[] = [
  { field: "product", 
    headerName: "Товар" },
  {
    field: "availability",
    headerName: "Наличие",
  },
  {
    field: "amount",
    headerName: "Количество",
  },
  {
    field: "faces",
    headerName: "Фейсы",
  }
];
/*
Москов.лакомка во взбит.шокол/глазури 80гр*30	Есть в отчете	17	0.67
Рожок пломбир Радуга четырехслойное 110гр	Есть в отчете	36	1.0
Эскимо Веселый Кактус пломбир МАЛИНОВЫЙ с наполнителем в глазури с кусоч.малины 80гр	Есть в отчете	-	0.25
Эскимо Российское пломб/молоч.шок.80гр*40	Есть в отчете	10	0.25
*/

export const rows: Item[] = [
    {
        product:"Москов.лакомка во взбит.шокол/глазури 80гр*30",
        availability: "Есть в отчете",
        amount: 17,
        faces: 0.67
      },
      {
        product:"Эскимо Веселый Кактус пломбир МАЛИНОВЫЙ с наполнителем в глазури с кусоч.малины 80гр",
        availability: "Есть в отчете",
        amount: '-',
        faces: 0.67
      },
      {
        product:"Москов.лакомка во взбит.шокол/глазури 80гр*30",
        availability: "Есть в отчете",
        amount: 17,
        faces: 0.67
      },
      {
        product:"Москов.лакомка во взбит.шокол/глазури 80гр*30",
        availability: "Есть в отчете",
        amount: '-',
        faces: 0.67
      }
    ]




export function Assortment() {

  const theme = useTheme();
  function getStyleFor(row:Item, colfield:string){
  
    if(colfield == "availability"){
      if(row[colfield as keyof Item] == "Есть в отчете"){
        return {
          //boxSizing:'border-box',
          color:theme.palette.success.main, //"green",
          //boxShadow:"inset 0 -2px 0px "  + theme.palette.success.light,
        }
      }
      /*else if(row[colfield as keyof Item] == "Завершен"){
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
      }*/
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((item, index) => (
              <StyledTableCell sx={{whiteSpace: "nowrap"}}>{item.headerName}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <StyledTableRow key={'row'+i}>
              {columns.map((col: IHeader, index) => (
                
                  <StyledTableCell
                  sx={ getStyleFor(row, col.field) }
                  >
                    
                    {row[col.field as keyof typeof row] }
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
