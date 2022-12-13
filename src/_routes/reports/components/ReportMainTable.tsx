import * as React from "react";
import {
  useLocation,
  Outlet,
  //Link,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "_styles/jsstyles";
import { rows } from "_components/debug/_mockrows";
import Pagination from "@mui/material/Pagination";
import { useQuery, gql } from '@apollo/client';

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
  function getStyleFor(row: Item, colfield: string) {
    if (colfield == "status") {
      if (row[colfield as keyof Item] == "Проверен") {
        return {
          //boxSizing:'border-box',
          color: theme.palette.success.main, //"green",
          boxShadow: "inset 0 -2px 0px " + theme.palette.success.light,
        };
      } else if (row[colfield as keyof Item] == "Завершен") {
        return {
          color: theme.palette.primary.dark,
        };
      } else if (row[colfield as keyof Item] == "Начат") {
        return {
          color: theme.palette.text.secondary,
        };
      } else if (
        row[colfield as keyof Item] == "Временный отказ" ||
        row[colfield as keyof Item] == "Отказано"
      ) {
        return {
          color: theme.palette.error.main,
          boxShadow: "inset 0 -2px 0px " + theme.palette.error.light,
        };
      }
    }
  }

  return (
    <Box>
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
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                
                {columns.map((col: IHeader, index) => (
                  <>
                    {/*<StyledTableCell>{row.shop}</StyledTableCell>*/}
                    <StyledTableCell sx={getStyleFor(row, col.field)}>
                      {col.field == "id" || col.field == "task" ? (
                        <Link
                          component={RouterLink}
                          //to={"/reports/" + row[col.field as keyof typeof row]}
                          to={"/reports/" + row['id']}
                          sx={{ color: theme.palette.text.primary,
                            textDecorationColor:theme.palette.text.primary
                          }}
                        >
                          {row[col.field as keyof typeof row]}
                        </Link>
                      ) : (
                        row[col.field as keyof typeof row] || "-"
                      )}
                    </StyledTableCell>
                  </>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          py: 2,
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Pagination count={10} />
      </Box>
    </Box>
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
