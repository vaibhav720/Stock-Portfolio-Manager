import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import first from "../asset/main_page/first_image.png"
import second from "../asset/main_page/advance_chart.png"
import third from "../asset/main_page/company_RSI.png"
import fourth from "../asset/main_page/company_wise_news.png"
import fifth from "../asset/main_page/indecs.png"
import sixth from "../asset/main_page/indicators.png"
import seventh from "../asset/main_page/insider_trading_details.png"
import eight from "../asset/main_page/line_chart.png"
import nine from "../asset/main_page/market_new.png"
import tenth from "../asset/main_page/ohlc_chart.png"
import eleven from "../asset/main_page/portfolio.png"
import twelve from "../asset/main_page/smart_tools.png"
import thirteen from "../asset/main_page/stock_list.png"
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright';
import {  createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from "@mui/material/Container";
import DynamicImage from './DynamicImage';
const drawerWidth = 240;
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


const itemData=[
    {
        img:first,
        title:"Watch List",
        description:"Your personalized Watch List",
        color:"light"
    },
    {
        img:second,
        title:"Advance Chart of every company",
        description:"Advance charts with tool tips",
        color:"dark"
    },
    {
        img:third,
        title:"Every companies RSI report",
        description:"RSI report of many companies",
        color:"light"
    },
    {
        img:fourth,
        title:"Multiple News sources",
        description:"Get news of each and every company",
        color:"light"
    },
    {
        img:fifth,
        title:"Providing you with index",
        description:"providing index",
        color:"light"
    },
    {
        img:sixth,
        title:"Different indicators",
        description:"Supporting different indicators",
        color:"dark"
    },
    {
        img:seventh,
        title:"Important transaction details",
        description:"Get details of important transaction of the companies.",
        color:"light"
    },
    {
        img:eight,
        title:"Line chart",
        description:"Advance line charts",
        color:"dark"
    },
    {
        img:nine,
        title:"World news",
        description:"Get news from many companies like bloomberg, BBC and etc",
        color:"light"
    },
    {
        img:tenth,
        title:"OHLC charts",
        description:"OHLC chart of every companies",
        color:"dark"
    },
    {
        img:eleven,
        title:"Your personal portfolio",
        description:"managing your portfolio",
        color:"light"
    },
    {
        img:twelve,
        title:"Smart Tools",
        description:"Test your ideas with smart tools",
        color:"dark"
    },
    {
        img:thirteen,
        title:"Stock listing of the companies",
        description:"Get all listed companies in US stock market",
        color:"light"
    },
];

function Main() {
    const history = useNavigate();
    const [darkMode,setDarkMode]=React.useState(createTheme({
      palette: {
        mode: 'dark',
      },
    }));
    function register(){
        history('/signup')
    }

    function login(){
        history('/login')
    }

    function handleClick(){
      console.log(darkMode);
      if(darkMode.palette.mode==="light")
      {
        setDarkMode(createTheme({
          palette: {
            mode: 'dark',
          },
        }));
      }
      else
      {
        setDarkMode(createTheme());
      }
    }
  return (
    <ThemeProvider theme={darkMode}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        
      <AppBar position="absolute">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Portfolio Manager
          </Typography>
          <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked onClick={handleClick}/>}
        
      />
          <Button color="inherit" onClick={register}> Register</Button>
          <Button color="inherit" onClick={login}> Login</Button>
        </Toolbar>
      </AppBar>
      <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto"
          }}
        ><Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

        {itemData.map((item,index) => (
        <DynamicImage key={index} data={item}/>
        ))}
    
    <Copyright  sx={{ pt: 4 }} />
    </Container>
        </Box>
    </Box>
    </ThemeProvider>
  )
}

export default Main
