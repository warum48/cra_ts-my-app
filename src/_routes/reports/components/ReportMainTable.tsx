import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { TabHeaderSorter } from "./TabHeaderSorter";
import { useQuery, gql } from "@apollo/client";
//import { Interface } from "readline";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { LoadingBox, CodeError } from "_styles/MuiStyledComponents";
import {
  filtersVar,
  searchInputVar,
  startDateVar,
  endDateVar,
  ascSortByVar,
  descSortByVar,
} from "_apollo/state";
//import { filtersVar } from "_apollo/state";
import { useReactiveVar } from "@apollo/client";
import { formatDate } from "_components/UTILS";
import { errorTransformator } from "_apollo/errors";
import { GET_TE } from "_apollo/queries";
//import { useQuery, gql } from "@apollo/client";
//import { useLazyQuery } from "@apollo/client";

type IHeader = {
  field: string;
  headerName: string;
  canSort?: boolean;
  sortFieldName?: string;

  func?: ({}: any | string) => string;
  funcComplex?: (dataAr: any[], num: number) => string;
  // func?: (any)=>string;
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

/* const columns: IHeader[] = [
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
]; */

const columns: IHeader[] = [
  { field: "id", headerName: "ID", canSort: true, sortFieldName: "teId" },
  {
    field: "taskId",
    headerName: "Задача",
    canSort: true,
  },
  {
    field: "dateStart",
    headerName: "Начало", //"Дата начала    ",
    canSort: true,
    //func: (st) => formatDate(st), //dayjs(st).format('YYYY-MM-DD HH:mm:ss')//tz("Europe/Moscow") //locale('ru-ru').format(
  },
  {
    field: "dateEnd",
    headerName: "Завершение", //"Дата завершения",
    canSort: true,
    //func: (st) => formatDate(st), //dayjs(st).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    //field: "userId",
    field: "user",
    headerName: "Сотрудник",
    canSort: true,
    //func: (ob) => ob?.surname + " " + ob?.name,
  },
  {
    field: "store", //"storeId",
    headerName: "Магазин",
    //func: (ob) => ob?.address,
  },
  {
    field: "sourceDescription",
    headerName: "Источник",
    canSort: true,
    sortFieldName: "source"
  },
  {
    //field: "status",
    field: "statusDescription",
    headerName: "Статус",
    //funcComplex: (dataAr: any[], num: number) => dataAr[num - 1].description,
  },
];

/* interface IRDTable{
  pageNumber:number
} */

export default function ReportMainTable() {
  //{pageNumber}:IRDTable
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  type TFilters = {
    regionId?: number;
    source?: string;
    status?: number;
    taskId?: number;
  };

  //TODO:think about _re
  //const filtersVar_re = useReactiveVar(filtersVar);
  const searchInputVar_re = useReactiveVar(searchInputVar);
  const ascSortBy_re = useReactiveVar(ascSortByVar);
  const descSortBy_re = useReactiveVar(descSortByVar);
  const startDatetVar_re = useReactiveVar(startDateVar);
  const endDatetVar_re = useReactiveVar(endDateVar);
  //it's possible to use var() or _re variables, but you should define reactive vars to rerender
  const { loading, error, data } = useQuery(GET_TE, {
    variables: {
      page: page,
      filters: filtersVar(),
      search: searchInputVar(), //_re,//
      startDate: startDateVar(),
      endDate: endDateVar(),
      ascSortBy: ascSortByVar(),
      descSortBy: descSortByVar(),
    },
  });

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

  function getStyleFor_(colfield: string, cellvalue: string) {
    if (colfield == "status") {
      if (cellvalue == "Проверен") {
        return {
          //boxSizing:'border-box',
          color: theme.palette.success.main, //"green",
          boxShadow: "inset 0 -2px 0px " + theme.palette.success.light,
        };
      } else if (cellvalue == "Завершен") {
        return {
          color: theme.palette.primary.dark,
        };
      } else if (cellvalue == "Начат") {
        return {
          color: theme.palette.text.secondary,
        };
      } else if (cellvalue == "Временный отказ" || cellvalue == "Отказано") {
        return {
          color: theme.palette.error.main,
          boxShadow: "inset 0 -2px 0px " + theme.palette.error.light,
        };
      }
    }
  }

  function getCellValue(
    row: any,
    col: IHeader,
    dataAr: any[] = [],
    num: number = 0
  ) {
    if (col.func) {
      return col.func(row[col.field as keyof typeof row]);
    }
    if (col.funcComplex) {
      return col.funcComplex(dataAr, num);
    }
    return row[col.field as keyof typeof row] || "-";
  }

  /* function getValue(row:any, col:IHeader){  
    if(col.func){
      return (col.func(row[col.field]))
    }
    

     if(col.field.indexOf('.') != -1){
      var compPath = col.field.split('.');
      //return (row[compPath[0] as keyof typeof row ][compPath[1] as any ] )
      return (row[compPath[0]][compPath[1]] )
     }
     return (row[col.field as keyof typeof row] )
  }*/

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ width: { xs: "calc(100vw - 96px)", md: "100%" } }}
      >
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <StyledTableCell
                  sx={{ whiteSpace: "nowrap" }}
                  key={"head" + index}
                >
                  {/*<Typography variant="button"></Typography>*/}
                  {item.canSort ? (
                    <TabHeaderSorter
                      headerName={item.headerName}
                      field={item.field}
                      sortFieldName={item.sortFieldName}
                    />
                  ) : (
                    item.headerName
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          {data && (
            <TableBody>
              {/* {rows.map((row) => ( */}
              {data?.getTasksExecutions?.teList.map((row: any, i: number) => (
                <StyledTableRow key={"row" + i}>
                  <>
                    <StyledTableCell>
                      <Link
                        component={RouterLink}
                        to={"/reports/" + row["id"]}
                        sx={{
                          color: theme.palette.text.primary,
                          textDecorationColor: theme.palette.text.primary,
                        }}
                      >
                        {row.id}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell sx={{ maxWidth: "120px" }}>
                      {
                        data.getTasksNames.tasksNamesList.find(
                          (x: any) => x.id === row.taskId
                        ).name
                      }
                    </StyledTableCell>
                    <StyledTableCell sx={{ minWidth: "110px" }}>
                      {formatDate(row.dateStart)}
                    </StyledTableCell>
                    <StyledTableCell>{formatDate(row.dateEnd)}</StyledTableCell>
                    <StyledTableCell>
                      {row.user?.name + " " + row.user?.surname}
                    </StyledTableCell>
                    <StyledTableCell sx={{ maxWidth: "180px" }}>
                      {row.store?.address}
                    </StyledTableCell>
                    <StyledTableCell>{row.sourceDescription}</StyledTableCell>
                    <StyledTableCell
                      sx={getStyleFor_(
                        "status",
                        data.getTeStatus.statusesList[row.status - 1]
                          .description
                      )}
                    >
                      {
                        data.getTeStatus.statusesList[row.status - 1]
                          .description
                      }
                    </StyledTableCell>

                    {/*

                {columns.map((col: IHeader, index) => (
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
                        <>
                        {
                        !col.func ?
                        row[col.field as keyof typeof row] || "-"
                        : col.func(row[col.field as keyof typeof row]
                        )
                        }
                        
                        </>
                      )}
                      </StyledTableCell>
                ))}
                */}
                  </>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {error && <CodeError text={errorTransformator(error)} />}
        {loading && <LoadingBox />}
      </TableContainer>
      {/*       <Box>{JSON.stringify(data?.tasksExecutions?.teList)}</Box>
       */}{" "}
      <Box
        sx={{
          display: "flex",
          py: 2,
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        {data && (
          <Pagination
            count={data.getTasksExecutions?.pagesCount}
            page={page}
            onChange={handleChange}
          />
        )}
      </Box>
    </Box>
  );
}
