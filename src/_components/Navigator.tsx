import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';

import HomeIcon from '@mui/icons-material/Home';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { bluegreen_bg, bluegreen_bg_130_dark, bluegreen_bg_vert } from '_styles/jsstyles';

/*const categories = [

{
    id: 'Home',
    icon: <PublicIcon /> ,
    active: true,

},

  {
    id: 'Отчеты по задачам',
    icon: <PublicIcon /> ,
    
  },
  {
    id: 'Экспорт данных',
    icon: <PublicIcon /> ,
    children: [
      { id: 'Analytics', icon: <SettingsIcon />, active:false },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];
*/

const categories = [
    {
      id: 'Home',
      icon: <HomeIcon /> ,
      active: true,
    },
    {
        id: 'Отчеты по задачам',
        icon: <PublicIcon /> ,
        active: true,
      },
    {
      id: 'Экспорт данных',
      icon: <PublicIcon /> ,
      children: [
        { id: 'Выполнение задач', icon: <SettingsIcon />, active: false },
        { id: 'Изображения', icon: <TimerIcon /> },

      ],
    },
  ];


const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export function Navigator(props:any) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other} >
        <Box sx={{ 
            //bgcolor: '#101F33' , 
            height:'100%', paddingTop:'30px', textAlign:'left',
            ...bluegreen_bg_130_dark
            //background: 'linear-gradient(180deg,#014f71 1.2%,#3caa42 90.53%)'
            //background: 'linear-gradient(130deg,#014f71 35.2%,#36993b 96.53%)'
            //background: 'linear-gradient(130deg,#026189 35.2%,#36993b 96.53%)'
            //background: 'linear-gradient(130deg,#016e9d 35.2%,#36993b 96.53%)'
            }}>
        <Box
        component="img"
        sx={{
          height: 37,
          width: 150,
          marginBottom:'30px',
          marginLeft:'30px'
        }}
        alt="logo"
        src="./surlogo_white.png" 
      />
      <List disablePadding >
       {/*} <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Paperbase
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Project Overview</ListItemText>
  </ListItem>*/}
       {/* {categories.map(({ id, icon, children }) => (
          <Box key={id}>
            <ListItem sx={{ py: 2, px: 3, color: '#fff' }}>
            <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText sx={{  }}>{id}</ListItemText>
      </ListItem>
            {children?.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
           
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}*/}
        {categories.map(({ id, children, active, icon }) => (
          <Box key={id} >
            <ListItem sx={{ py: children ? '2px' : 1 , px: 3 }}>
            <ListItemIcon sx={{ color: '#fff', minWidth:'50px' }}> {icon}</ListItemIcon>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children?.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  
                  <ListItemText sx={{ marginLeft:'50px'}}>{childId}</ListItemText>
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