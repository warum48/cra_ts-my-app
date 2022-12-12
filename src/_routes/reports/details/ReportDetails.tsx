import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { bluegreen_bg, panel_bg } from "_styles/jsstyles";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { rows } from "_components/debug/_mockrows";
import "_styles/mui.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Information from "_routes/reports/details/components/Information";
import Empty from "_components/Empty";
import { Assortment } from "_routes/reports/details/components/Assortment";
import { Steps } from "_routes/reports/details/components/Steps";
import { Info } from "_routes/reports/details/components/Info";
import { Geolocation } from "_routes/reports/details/components/Geolocation";
import Button from "@mui/material/Button";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

/*const columns: GridColDef[] = [
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
*/

export default function ReportDetails() {
  //const mql = window.matchMedia('(max-width: 1000px)');
  //const smallScreen = mql.matches;

  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const reportDetailsTabsNamesAr = [
    "Информация",

    "Шаги и задачи",
    "Изображения",
    "Анкеты",
    "Ассортимент магазина",
    "Причины отсутствия товаров",
    "Геолокация",
  ];

  /*const reportDetailsTabs = {
    info: {
      name: "Информация",
    },
    steps: {
      name: "Шаги и задачи",
    },
    pictures: {
      name: "Изображения",
    },
    ankets: {
      name: "Анкеты",
    },
    assortment: {
      name: "Ассортимент магазина",
    },
    absence_reasons: {
      name: "Причины отсутствия товаров",
    },
    geolocation: {
      name: "Геолокация",
    },
  };*/

  const reportDetailsTabs = {
    info: {
      name: "Информация",
      component: <Info/>
    },
    steps: {
      name: "Шаги и задачи",
      component: <Steps/>
    },
    pictures: {
      name: "Изображения",
      component:<Empty/>
    },
    ankets: {
      name: "Анкеты",
      component: <Empty/>
    },
    assortment: {
      name: "Ассортимент магазина",
      component: <Assortment/>
    },
    absence_reasons: {
      name: "Причины отсутствия товаров",
      component: <Empty/>
    },
    geolocation: {
      name: "Геолокация",
      component: <Geolocation/>
    }
  };

  return (
    <Box sx={{ width: "100%", mb:3 }}>
      {/*<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {reportDetailsTabsNamesAr.map((item, index) => (
            <Tab label={item} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {reportDetailsTabsNamesAr.map((item, index) => (
        <TabPanel value={value} index={index}>
          {item}
        </TabPanel>
      ))}*/}

<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          //variant={smallScreen ? 'scrollable' : 'standard'}
          variant="scrollable"
        >
          {Object.entries(reportDetailsTabs).map(([key, item], index) => (
            <Tab key={'tab'+key} label={item.name} {...a11yProps(index)} sx={{fontSize:'12px'}}/>
          ))}
        </Tabs>
      </Box>

      {Object.entries(reportDetailsTabs).map(([key, item], index) => (
        <TabPanel 
        value={value} 
        index={index}
        key={'panel'+key}
        >
            
          {item.component}
        </TabPanel>
      ))}

<Box sx={{pt:2}}>
<Button
              type="submit"
              variant="contained"
              sx={{ color: '#ffffff',  boxShadow: 0, ...bluegreen_bg}}
              //onClick={() => setIsLoggedIn(true)}
            >
              Сохранить
            </Button>
            <Button
              type="submit"
              variant="outlined"
              sx={{mx:2, ...panel_bg[theme.palette.mode]}}
              //onClick={() => setIsLoggedIn(true)}
            >
              Сохранить и продолжить редактирование
            </Button>
            </Box>

    </Box>
  );
}
