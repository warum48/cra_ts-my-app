/*import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { panel_bg } from '_styles/jsstyles';
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { rows } from "_components/debug/_mockrows"; 
import "_styles/mui.css";



const columns: GridColDef[] = [
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
];



export default function ReportsTable() {
    const theme = useTheme();



  return (
    <Box sx={{  width: '100%', marginBottom:'50px' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        hideFooter
        //pageSize={5}
        //rowsPerPageOptions={[5]}
        //checkboxSelection=false
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        sx={{ mb:4, ...panel_bg[theme.palette.mode]}}
      />
    </Box>
  );
}
*/
