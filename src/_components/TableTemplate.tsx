import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "_styles/MuiStyledComponents";

type IHeader = {
  field: string;
  headerName: string;
  func?: ({}: any | string) => string;
};

interface ITableTemplateProps<Item> {
  rows: Item[];
  columns: any[];
  getStyle?: (
    row: Item,
    colfield: string
  ) => { color: string } | undefined | void;
}

export function TableTemplate<Item>({
  rows,
  columns,
  getStyle = (row, colfield) => console.log("nostyle") ,
}: ITableTemplateProps<Item>) {
  const theme = useTheme();

  //function getValue(row:any, col_field:string){ //Item  //TODO find a way to type compound path
  function getValue(row: any, col: IHeader) {
    if (col.func) {
      return col.func(row[col.field]);
    }

    if (col.field.indexOf(".") != -1) {
      var compPath = col.field.split(".");
      //return (row[compPath[0] as keyof typeof row ][compPath[1] as any ] )
      return row[compPath[0]][compPath[1]];
    }
    return row[col.field as keyof typeof row];
  }

  return (
    <>
    { rows && columns && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((item: IHeader, index) => (
              <StyledTableCell sx={{ whiteSpace: "nowrap" }} key={'head'+index}>
                {item.headerName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, i: number) => (
            <StyledTableRow key={"row" + i}>
              {columns.map((col: IHeader, index) => (
                <StyledTableCell sx={{ ...getStyle(row, col.field) }} key={'col'+i+index}>
                  <>
                    {getValue(row, col)}
                    {/*   row[col.field as keyof typeof row]    */}
                    {/*TODO:
                    row[col.field as keyof typeof row]  // this line breaks row:Item typing, try to fix it
                    Type 'Item[keyof Item]' is not assignable to type 'ReactNode'.
                    TableCell.d.ts(30, 3): The expected type comes from property 'children' which is declared here on type 'IntrinsicAttributes & TableCellProps & MUIStyledCommonProps<Theme>'
                    */}
                  </>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
                  }
                  </>
  );
}
