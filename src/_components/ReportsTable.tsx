import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { panel_bg } from '_styles/jsstyles';
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { rows } from "_components/debug/_mockrows"; 
import "_styles/mui.css";

/*
{
            "id": 4453565,
            "task": "Выкладка мороженое ЧЛ",
            "date_beginning": "Dec. 7, 2022, 10:03 a.m.",
            "date_end": "-",
            "worker": "Светлана Брижань",
            "shop": "ЦБ-00068643 - Пятерочка Регионы - 355040 Ставропольский край г.Ставрополь Доваторцев ул 39",
            "device": "Айфон",
            "status": "Начат"
        },
        */

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

/*
        2021-01-08
        Work around MUI DataGrid issue that sets `height: 0px;` when autoHeight is enabled 
        https://github.com/mui-org/material-ui-x/issues/604
        
        Get the first div (which is the MUI datagrid element) and clear the 0px CSS height style
        */
       /* const gridWrapperRef = React.useRef<HTMLDivElement>(null);
        React.useLayoutEffect(() => {
            const gridDiv = gridWrapperRef.current;
            if (gridDiv){
                const gridEl: HTMLDivElement = gridDiv.querySelector('div')!;
                gridEl.style.height = '';
            }
        });*/


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
