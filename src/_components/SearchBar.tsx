import * as React from 'react';
import { styled, alpha , useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { bluegreen_bg, panel_bg } from '_styles/jsstyles';

const Search = styled(Box)(({ theme }) => ({
  position: 'relative',
  display:'flex',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth:'500px',
  
  //my:4,
  //margin: '10px 0',
  ...panel_bg[theme.palette.mode]
  /*
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },*/
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    //padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    /*[theme.breakpoints.up('md')]: {
      width: '20ch',
    },*/
  },
}));

export default function SearchBar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);



  

  return (
    <Box 
    sx={{ 
        display: 'flex', 
        maxHeight:'90px',
        my:2
   // flexGrow: 1 
}}
    >
      
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button
              type="submit"
              variant="contained"
              sx={{ color: '#ffffff', 
               //...bluegreen_bg,
               background: theme.palette.common.buttonGradient,
              }}
              //just placeholder:
              //onClick={() => setIsLoggedIn(true)}
            >
              Искать
            </Button>
          
          {/*<Box 
          //sx={{ flexGrow: 1 }} 
/>*/}
          
    </Box>
  );
}
