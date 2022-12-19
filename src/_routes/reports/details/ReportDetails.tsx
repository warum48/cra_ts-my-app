import * as React from "react";
import Box from "@mui/material/Box";
import { panel_bg } from "_styles/MuiStyledComponents";
import { useTheme } from "@mui/material/styles";
import "_styles/mui.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ReportDetails() {
 const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  /*const reportDetailsTabsNamesAr = [
    "Информация",
    "Шаги и задачи",
    "Изображения",
    "Анкеты",
    "Ассортимент магазина",
    "Причины отсутствия товаров",
    "Геолокация",
  ];*/

  const reportDetailsTabs = {
    info: {
      name: "Информация",
      component: <Info />,
    },
    steps: {
      name: "Шаги и задачи",
      component: <Steps />,
    },
    pictures: {
      name: "Изображения",
      component: <Empty />,
    },
    ankets: {
      name: "Анкеты",
      component: <Empty />,
    },
    assortment: {
      name: "Ассортимент магазина",
      component: <Assortment />,
    },
    absence_reasons: {
      name: "Причины отсутствия товаров",
      component: <Empty />,
    },
    geolocation: {
      name: "Геолокация",
      component: <Geolocation />,
    },
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          //variant={smallScreen ? 'scrollable' : 'standard'}
          variant="scrollable"
        >
          {Object.entries(reportDetailsTabs).map(([key, item], index) => (
            <Tab
              key={"tab" + key}
              label={item.name}
              {...a11yProps(index)}
              sx={{ fontSize: "12px" }}
            />
          ))}
        </Tabs>
      </Box>

      {Object.entries(reportDetailsTabs).map(([key, item], index) => (
        <TabPanel value={value} index={index} key={"panel" + key}>
          {item.component}
        </TabPanel>
      ))}

      <Box sx={{ pt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "#ffffff",
            boxShadow: 0,
            background: theme.palette.common.buttonGradient,
          }}
        >
          Сохранить
        </Button>
        <Button
          type="submit"
          variant="outlined"
          sx={{ mx: 2, ...panel_bg[theme.palette.mode] }}
        >
          Сохранить и продолжить редактирование
        </Button>
      </Box>
    </Box>
  );
}
