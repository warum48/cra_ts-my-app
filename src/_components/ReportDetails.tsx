import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { panel_bg } from "_styles/jsstyles";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { rows } from "_components/debug/_mockrows";
import "_styles/mui.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Information from "_components/ReportDetails/Information";
import Empty from "_components/ReportDetails/Empty";
import { Assortment } from "_components/ReportDetails/Assortment";
import { Steps} from "_components/ReportDetails/Steps";

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
          <Typography>{children}</Typography>
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
      component: <Empty/>
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
      component: <Empty/>
    }
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "50px" }}>
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
            <Tab label={item.name} {...a11yProps(index)} sx={{fontSize:'12px'}}/>
          ))}
        </Tabs>
      </Box>

      {Object.entries(reportDetailsTabs).map(([key, item], index) => (
        <TabPanel value={value} index={index}>
            
          {item.component}
        </TabPanel>
      ))}

    </Box>
  );
}
