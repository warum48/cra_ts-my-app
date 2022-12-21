import * as React from "react";
import {
  Link as RouterLink,
} from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "_styles/MuiStyledComponents";
import { rows } from "_components/debug/_mockrows";
import Pagination from "@mui/material/Pagination";
import { useQuery, gql } from '@apollo/client';
import { Interface } from "readline";
//import { useQuery, gql } from "@apollo/client";
//import { useLazyQuery } from "@apollo/client";

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


interface IRDTable{
  pageNumber:number
}

export default function ReportDetailsTable({pageNumber}:IRDTable) {
  const GET_TE = gql`
  query MyQuery {
    tasksExecutions(pages: {pageNumber: 1, limit: 10}) {
      teList {
        dateEnd
        dateStart
        source
        storeId
        userId
        taskId
        id
      }
    }
  }
  `
  const { loading, error, data } = useQuery(GET_TE);
  

  /*
  "teList": [
        {
          "dateEnd": "2022-12-01T06:17:38.701260+00:00",
          "dateStart": "2022-12-01T06:11:40.259770+00:00",
          "id": 4421426,
          "storeId": 7804,
          "taskId": 163,
          "userId": 17271
        },
        {
          "dateEnd": "2022-11-09T08:20:33+00:00",
          "dateStart": "2022-11-09T08:01:22.644782+00:00",
          "id": 4299545,
          "storeId": 25199,
          "taskId": 163,
          "userId": 17198
        },*/
  

//-------MUI---------
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
      <TableContainer component={Paper} sx={{width: {xs:'calc(100vw - 96px)', md:'100%'}}}>
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
              <StyledTableRow key={'row'+row.id}>           
                {columns.map((col: IHeader, index) => (
                  <>
                    <StyledTableCell sx={getStyleFor(row, col.field)} key={'col'+index}>
                      {col.field == "id" || col.field == "task" ? (
                        <Link
                          component={RouterLink}
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
      {/*<Box>{JSON.stringify(data)}</Box>*/}
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

{"tasksExecutions":{"__typename":"ListTaskExecution",
"teList":[
{"__typename":"TaskExecution","dateEnd":"2022-12-01T06:17:38.701260+00:00","dateStart":"2022-12-01T06:11:40.259770+00:00","source":"android","storeId":7804,"userId":17271,"taskId":163,"id":4421426},
{"__typename":"TaskExecution","dateEnd":"2022-11-09T08:20:33+00:00","dateStart":"2022-11-09T08:01:22.644782+00:00","source":"android","storeId":25199,"userId":17198,"taskId":163,"id":4299545},
{"__typename":"TaskExecution","dateEnd":"2022-11-04T15:42:08+00:00","dateStart":"2022-11-04T15:29:56.953914+00:00","source":"android","storeId":145091,"userId":20562,"taskId":206,"id":4285377},

*/
