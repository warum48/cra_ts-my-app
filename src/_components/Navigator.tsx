import * as React from "react";
import {
  useLocation,
  Outlet,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";

import HomeIcon from "@mui/icons-material/Home";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import {
  bluegreen_bg,
  bluegreen_bg_130_dark,
  bluegreen_bg_vert,
  grayLines,
} from "_styles/jsstyles";
import { RoutesTypes } from "_types/TYPES";

/*const navItems = [
    { name: "Home", route: "/" },
    { name: "Play", route: RoutesTypes.Play + "/" + currentDictSelector.id },
    { name: "Dictonaries", route: RoutesTypes.Dictonaries }
    //{ name: "TestTone", route: RoutesTypes.TestTone }
  ];*/

const categories = [
  {
    id: "Home",
    icon: <HomeIcon />,
   //active: true,
    route: "/",
  },
  {
    id: "Отчеты по задачам",
    icon: <InsertDriveFileIcon />,
    //active: true,
    active:false,
    route: RoutesTypes.Reports,
  },
  {
    id: "Экспорт данных",
    icon: <DownloadIcon />,
    children: [
      { id: "Выполнение задач", icon: <SettingsIcon />, active: false },
      { id: "Изображения", icon: <TimerIcon /> },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export function Navigator(props: any) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      {/*<Box
        sx={{
          //bgcolor: '#101F33' ,
          position:absolute
          height: "100%",
          //paddingTop: "30px",
        }}
      ></Box>*/}
      <Box
        sx={{
          //bgcolor: '#101F33' ,
          height: "100%",
          paddingTop: "30px",
          textAlign: "left",
          ...bluegreen_bg_130_dark,
          ...grayLines,
          //background: 'linear-gradient(180deg,#014f71 1.2%,#3caa42 90.53%)'
          //background: 'linear-gradient(130deg,#014f71 35.2%,#36993b 96.53%)'
          //background: 'linear-gradient(130deg,#026189 35.2%,#36993b 96.53%)'
          //background: 'linear-gradient(130deg,#016e9d 35.2%,#36993b 96.53%)'
        }}
      >
        <Box
          component="img"
          sx={{
            height: 37,
            width: 150,
            marginBottom: "30px",
            marginLeft: "30px",
          }}
          alt="logo"
          src="./surlogo_white.png"
        />
        <List disablePadding>
          {categories.map(({ id, children, active, icon, route }) => (
            <Box key={id}>
              <ListItem 
              disablePadding key={id}
              //sx={{ paddingBottom: children ? "2px" : 2, px: 0 }}
              >
                <ListItemButton selected={active} sx={{ ...item, m:0 , px:3, marginBottom: children ? "2px" : 2  }}
                 component={Link} to={route || '/'}
                 >
                  <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
                    {" "}
                    {icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
                </ListItemButton>
              </ListItem>
              {children?.map(({ id: childId, icon, active }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemText sx={{ marginLeft: "40px" }}>
                      {childId}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              {/*<Divider sx={{ mt: 2 }} />*/}
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
//https://github.com/mui/material-ui/blob/master/docs/src/pages/premium-themes/paperbase/Navigator.js
