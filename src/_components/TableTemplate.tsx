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
};

interface ITableTemplateProps<Item>{
    rows: Item[], 
    columns:any[],
    getStyle: (row: Item, colfield: string) => { color: string; } | undefined
}

export function TableTemplate<Item>({rows, columns, getStyle}:ITableTemplateProps<Item>) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((item:IHeader, index) => (
              <StyledTableCell sx={{whiteSpace: "nowrap"}}>{item.headerName}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:any, i:number) => (
            <StyledTableRow key={'row'+i}>
              {columns.map((col: IHeader, index) => (
                  <StyledTableCell
                  sx={ getStyle(row, col.field) }
                  >              
                    {row[col.field as keyof typeof row] }
                    {/*TODO:
                    row[col.field as keyof typeof row]  // this line breaks row:Item typing, try to fix it
                    Type 'Item[keyof Item]' is not assignable to type 'ReactNode'.
                    TableCell.d.ts(30, 3): The expected type comes from property 'children' which is declared here on type 'IntrinsicAttributes & TableCellProps & MUIStyledCommonProps<Theme>'
                    */}
                  </StyledTableCell>               
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

