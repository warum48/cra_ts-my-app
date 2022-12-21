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
      { id: "Изображения", 
      //icon: <TimerIcon />, 
      route: RoutesTypes.Pictures },
    ]
  }
  
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
    ]
  }
]

interface IMenuCategory{
  id:string,
  icon:React.ReactElement,
  children?:{id:string, active?:boolean, route:RoutesTypes}[],
  route?:any,
  active?:boolean 
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
  const { isDebug, setIsDebug} = React.useContext(GlobalContext);
  //let categories:IMenuCategory[] = [];
  const [categories, setCategories] = React.useState<IMenuCategory[]>([])

  React.useEffect(()=>{
  if(isDebug){
    setCategories([...menuCategories, ...debugCategories])
  }else{
    setCategories([...menuCategories])
  }
  },[isDebug])

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
          src="/surlogo_white.png"
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
                  }}
                  component={Link}
                  to={route || "/"}
                  disabled={!route}
                >
                  <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
                    {" "}
                    {icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
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
