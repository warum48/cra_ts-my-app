import * as React from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "_context/ContextGlobal";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
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
import SmartToyIcon from "@mui/icons-material/SmartToy";
//import { grayLines } from "_styles/jsstyles";
import { RoutesTypes } from "_types/TYPES";
import { Button, Paper, Typography } from "@mui/material";
import { StyledButton } from "_styles/MuiStyledComponents";
import LogoutIcon from '@mui/icons-material/Logout';
import Person2Icon from '@mui/icons-material/Person2';

let menuCategories = [
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
    active: false,
    route: RoutesTypes.Reports,
  },
  {
    id: "Экспорт данных",
    icon: <DownloadIcon />,
    children: [
      {
        id: "Выполнение задач",
        //icon: <SettingsIcon />,
        active: false,
        route: RoutesTypes.Execution,
      }, //Execution,
      {
        id: "Изображения",
        //icon: <TimerIcon />,
        route: RoutesTypes.Pictures,
      },
    ],
  },
];

const debugCategories = [
  {
    id: "Debug",
    icon: <SmartToyIcon />,
    children: [
      { id: "GraphQL query", active: false, route: RoutesTypes.Debug_GQL }, //Execution,
      { id: "GraphQL lazy", route: RoutesTypes.Debug_LazyGQL },
      { id: "Lazy GQL Select", route: RoutesTypes.Debug_LazySelect },
      { id: "Leaflet pure", route: RoutesTypes.Debug_LeafletPure },
    ],
  },
];

interface IMenuCategory {
  id: string;
  icon: React.ReactElement;
  children?: { id: string; active?: boolean; route: RoutesTypes }[];
  route?: any;
  active?: boolean;
}

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
  const theme = useTheme();
  const { isDebug, setIsDebug } = React.useContext(GlobalContext);
  //let categories:IMenuCategory[] = [];
  const [categories, setCategories] = React.useState<IMenuCategory[]>([]);

  React.useEffect(() => {
    if (isDebug) {
      setCategories([...menuCategories, ...debugCategories]);
    } else {
      setCategories([...menuCategories]);
    }
  }, [isDebug]);

  return (
    <Drawer variant="permanent" {...other}>
      <Box
        className="gray_lines"
        sx={{
          //bgcolor: '#101F33' ,
          height: "100%",
          paddingTop: "30px",
          textAlign: "left",
          //...bluegreen_bg_130_dark,
          background: theme.palette.common.mainGradientBg_135,
          //...grayLines,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            component="img"
            sx={{
              display: "block",
              height: 27,
              //150,
              marginBottom: "30px",
              //marginLeft: "30px",
              //textAlign:'center'

              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt="logo"
            //src="/surlogo_white.png"
            src="https://client.shop-survey.ru/static/admin/img/logo-w.png"
          />
          <List disablePadding>
            {categories.map(({ id, children, active, icon, route }) => (
              <Box key={id}>
                <ListItem
                  disablePadding
                  key={id}
                  //sx={{ paddingBottom: children ? "2px" : 2, px: 0 }}
                >
                  <ListItemButton
                    selected={active}
                    sx={{
                      ...item,
                      m: 0,
                      px: 3,
                      marginBottom: children ? "2px" : 2,
                      opacity: !!route ? "1  !important" : "0.6 !important",
                      fontSize: theme.typography.body2.fontSize,
                    }}
                    component={Link}
                    to={route || "/"}
                    disabled={!route}
                  >
                    <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
                      {" "}
                      {icon}
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#fff" }}>
                      <Typography variant="body2">{id}</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                {children?.map(({ id: childId, active, route }) => (
                  <ListItem disablePadding key={childId}>
                    <ListItemButton
                      selected={active}
                      sx={item}
                      component={Link}
                      to={route || "/"}
                    >
                      <ListItemText sx={{ marginLeft: "40px", color: "#fff" }}>
                        <Typography variant="body2">{childId}</Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
                {/*<Divider sx={{ mt: 2 }} />*/}
              </Box>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            //p:2,
            m: 3,
            position: "relative",
            bottom: 0,
          }}
        >
          {/*<Paper sx={{ 
          width:'100%', height:'100%',
          position:'absolute',
          zIndex:0,
          //p:2, 
         // m:3,
        opacity:.8}}></Paper>*/}
          <Box
            sx={{
              top: 0,
              m: 0,
              my: 1,
              zIndex: 10,
              position: "relative",
              display: "flex",
              flexDirection:'column',
              flexWrap: "wrap",
              //justifyContent: 'flex-start',//"center",
              alignItems:'center',
              fontSize: theme.typography.body2.fontSize,
            }}
          >
            
            <Box
              sx={{
                //mr: 1,
                display:'flex',
                mb: 1,
                color: "white",
                textAlign:'center',
                fontSize: theme.typography.body2.fontSize,
              }}
            >
             <Person2Icon fontSize="small" sx={{mr:1}}/> test@test.ru 
            </Box>
            
            <Box>
              {/*<LogoutIcon fontSize="small" sx={{mr:1}}/>*/}
            <Button size="small" variant="outlined" sx={{ color: 'white', fontSize: "11px", px:1.2 , mx:.5, minWidth:'10px'}}>
              
              Выйти
            </Button>
            <Button variant="outlined" size="small" sx={{ color: 'white', fontSize: "11px", px:1.2, mx:.5 }}>
              
              Сменить пароль
            </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
//https://github.com/mui/material-ui/blob/master/docs/src/pages/premium-themes/paperbase/Navigator.js
