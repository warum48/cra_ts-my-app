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
//import { Interface } from "readline";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { LoadingBox, CodeError } from "_styles/MuiStyledComponents";
import { filtersVar, searchInputVar, startDateVar, endDateVar } from "_apollo/state";
//import { filtersVar } from "_apollo/state";
import { useReactiveVar } from "@apollo/client";
import { formatDate } from "_components/UTILS";
import { errorTransformator} from "_apollo/errors"
//import { useQuery, gql } from "@apollo/client";
//import { useLazyQuery } from "@apollo/client";

type IHeader = {
  field: string;
  headerName: string;
  func?: ({}:any | string ) => string;
  funcComplex?: (dataAr:any[], num:number ) => string;
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
  { field: "id", headerName: "ID" },
  {
    field: "taskId",
    headerName: "Задача",
  },
  {
    field: "dateStart",
    headerName: "Начало",//"Дата начала    ",
    func: st => formatDate(st)//dayjs(st).format('YYYY-MM-DD HH:mm:ss')//tz("Europe/Moscow") //locale('ru-ru').format(
  },
  {
    field: "dateEnd",
    headerName: "Завершение",//"Дата завершения",
    func: st => formatDate(st)//dayjs(st).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    //field: "userId",
    field: "user",
    headerName: "Сотрудник",
    func: ob=>ob?.surname + " " + ob?.name
  },
  {
    field: "store",//"storeId",
    headerName: "Магазин",
    func: ob=>ob?.address
  },
  {
    field: "source",
    headerName: "Источник",
  },
  {
    field: "status",
    headerName: "Статус",
    funcComplex: (dataAr:any[], num:number ) => dataAr[num-1].description
  },
];

/* interface IRDTable{
  pageNumber:number
} */

export default function ReportMainTable() { //{pageNumber}:IRDTable
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
 /* const GET_TE = gql`
  query MyQuery {
    tasksExecutions(filters: {}, pages: {pageNumber: ${page}, limit: 10}) {
      teList {
        dateEnd
        dateStart
        source
        storeId
        userId
        taskId
        status
        id
        user {
          name
          surname
        }
        store {
          address
        }
      }
    }
  }
  `
  const { loading, error, data } = useQuery(GET_TE);
*/

type TFilters = {
  regionId?: number;
   source?: string;
    status?: number;
     taskId?: number;
}

  const GET_TE = gql`
  query MyQuery ($page:Int!, $filters:TeFilters, $search:String, $startDate:Date, $endDate:Date ) {
    getTasksExecutions(filters: $filters, pages: {pageNumber: $page, limit: 100}, search:$search, startDate:$startDate, endDate:$endDate) {
      pagesCount
      earliestDate
      teList {
        dateEnd
        dateStart
        source
        storeId
        userId
        taskId
        status
        id
        user {
          name
          surname
        }
        store {
          address
        }
      }
    }

    getTeStatus {
      statusesList {
        description
        status
      }
    }

    getTasksNames {
      tasksNamesList {
        id
        name
      }
    }

  }
  `
  const filtersVar_re = useReactiveVar(filtersVar);
  const searchInputVar_re = useReactiveVar(searchInputVar);
  const startDatetVar_re = useReactiveVar(startDateVar);
  const endDatetVar_re = useReactiveVar(endDateVar);
  const { loading, error, data } = useQuery(GET_TE,{
    variables: {page: page, filters: filtersVar_re, search:searchInputVar_re, startDate: startDateVar(), endDate:endDateVar()}
  });


  

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

  function getStyleFor_(colfield: string, cellvalue:string) {
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
      } else if (
        cellvalue == "Временный отказ" ||
        cellvalue == "Отказано"
      ) {
        return {
          color: theme.palette.error.main,
          boxShadow: "inset 0 -2px 0px " + theme.palette.error.light,
        };
      }
    }
  }

  function getCellValue(row:any, col:IHeader, dataAr:any[]=[], num:number=0){
    
    if(col.func ){
    return col.func(row[col.field as keyof typeof row])
    }
    if(col.funcComplex ){
      return col.funcComplex(dataAr, num);
      }
    return row[col.field as keyof typeof row] || "-"
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
      <TableContainer component={Paper} sx={{width: {xs:'calc(100vw - 96px)', md:'100%'}}}>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>        
              {columns.map((item, index) => (
                <StyledTableCell sx={{ whiteSpace: "nowrap" }} key={'head'+index}>
                  <Typography variant="button" ></Typography>{item.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          
          {data &&
          <TableBody>
            {/* {rows.map((row) => ( */}
            {data?.getTasksExecutions?.teList.map((row:any, i:number) => (
              <StyledTableRow key={'row'+i}>    
              <>
              <StyledTableCell ><Link
                          component={RouterLink}
                          to={"/reports/" + row['id']}
                          sx={{ color: theme.palette.text.primary,
                            textDecorationColor:theme.palette.text.primary
                          }}
                        >{row.id}</Link></StyledTableCell>
              <StyledTableCell sx={{maxWidth:'120px'}}>{data.getTasksNames.tasksNamesList.find((x:any) => x.id === row.taskId).name}</StyledTableCell>
              <StyledTableCell sx={{minWidth:'110px'}}>{formatDate(row.dateStart)}</StyledTableCell>
              <StyledTableCell >{formatDate(row.dateEnd)}</StyledTableCell>
              <StyledTableCell >{row.user?.name + " " + row.user?.surname}</StyledTableCell>
              <StyledTableCell sx={{maxWidth:'180px'}}>{row.store?.address}</StyledTableCell>
              <StyledTableCell >{row.source}</StyledTableCell>
              <StyledTableCell sx={getStyleFor_("status", data.getTeStatus.statusesList[row.status-1].description)} >{data.getTeStatus.statusesList[row.status-1].description}</StyledTableCell>

              
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
}
        </Table>
        {error && <CodeError text={errorTransformator(error)}/>}
          {loading && <LoadingBox/>}
      </TableContainer>
{/*       <Box>{JSON.stringify(data?.tasksExecutions?.teList)}</Box>
 */}      <Box
        sx={{
          display: "flex",
          py: 2,
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        { data && 
        <Pagination count={data.getTasksExecutions?.pagesCount} page={page} onChange={handleChange} />
        }
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

//https://lightrun.com/answers/trojanowski-react-apollo-hooks-how-to-handle-dynamic-variables-in-usequery
//https://stackoverflow.com/questions/66808806/how-to-use-dynamic-graphql-string-from-separate-page-in-component-react-reac

//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2OTczMTMsInN1YiI6eyJsb2dpbiI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkX2hhc2giOiJwYmtkZjJfc2hhMjU2JDM5MDAwMCRwaEF4Zk9OUWQ4RldwNFhXV2JuTHFVJHI2QWxxQ2djSnF3N0Rsd3E5cnREYkNHS292dXVFWkhRdnRwcGxQRXFtVkk9In19.DkDM4dqwj55PXi7GZGVN6pZe4DefNbeXfRDA0BIPl_0"}

//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzE2OTczMTMsInN1YiI6eyJsb2dpbiI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkX2hhc2giOiJwYmtkZjJfc2hhMjU2JDM5MDAwMCRwaEF4Zk9OUWQ4RldwNFhXV2JuTHFVJHI2QWxxQ2djSnF3N0Rsd3E5cnREYkNHS292dXVFWkhRdnRwcGxQRXFtVkk9In19.DkDM4dqwj55PXi7GZGVN6pZe4DefNbeXfRDA0BIPl_0"}

/*
{
  "data": {
    "getTasksExecutions": {
      "earliestDate": "2022-09-01",
      "teList": [
        {
          "id": 4279176
        },
        {
          "id": 4279080
        },
        {
          "id": 4279223
        },
        {
          "id": 4279215
        },
        {
          "id": 4279168
        },
        {
          "id": 4402367
        },
        {
          "id": 4279035
        },
        {
          "id": 4462125
        },
        {
          "id": 4279227
        },
        {
          "id": 4279246
        }
      ]
    }
  }



  "data": {
    "getTasksExecutions": {
      "earliestDate": "2022-12-08",
      "teList": [
        {
          "latitude": 64.52359,
          "longitude": 40.6199125
        },
        {
          "latitude": 51.7263388,
          "longitude": 39.2044669
        },
        {
          "latitude": 55.9375251,



          query MyQuery {
  getTasksExecutions(
    pages: {pageNumber: 10, limit: 10}
    filters: {}
    startDate: "2022-12-08"
    endDate: "2022-12-31"
  ) {
    earliestDate
    teList {
      latitude
      longitude
    }
  }
}


query MyQuery {
  getTasksExecutions(
    pages: {pageNumber: 10, limit: 10}
    filters: {taskId: 10, status: 10, source: "", regionId: 10}
    startDate: "2022-12-08"
    endDate: "2022-12-31"
  ) {
    earliestDate

  }
}


query MyQuery {
  getTasksExecutions(
    pages: {pageNumber: 10, limit: 10}
    filters: {taskId: 10, status: 10, source: "", regionId: 10}
    startDate: "2022-12-08"
    endDate: "2022-12-31"
  ) {
    earliestDate

  }
}


query MyQuery {
  getTasksExecutions(
    pages: {pageNumber: 10, limit: 10}
    filters: {taskId: 10, status: 10, source: "", regionId: 10}
    startDate: "2022-12-08"
    endDate: "2022-12-31"
  ) {
    earliestDate

  }
}
}*/