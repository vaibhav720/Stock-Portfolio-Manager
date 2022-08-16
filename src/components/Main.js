import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
const itemData=[
    {
        img:first,
        title:"Your personalized Watch List"
    },
    {
        img:second,
        title:"Advance Chart of every company"
    },
    {
        img:third,
        title:"Every companies RSI report"
    },
    {
        img:fourth,
        title:"Multiple News sources"
    },
    {
        img:fifth,
        title:"Providing you with index"
    },
    {
        img:sixth,
        title:"Different indicators"
    },
    {
        img:seventh,
        title:"Important transaction details"
    },
    {
        img:eight,
        title:"Line chart"
    },
    {
        img:nine,
        title:"World news"
    },
    {
        img:tenth,
        title:"OHLC charts"
    },
    {
        img:eleven,
        title:"Your personal portfolio"
    },
    {
        img:twelve,
        title:"Smart Tools"
    },
    {
        img:thirteen,
        title:"Stock listing of the companies"
    },
];

function Main() {
    const history = useNavigate();
    function register(){
        history('/signup')
    }

    function login(){
        history('/login')
    }
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Portfolio Manager
          </Typography>
          <Button color="inherit" onClick={register}> Register</Button>
          <Button color="inherit" onClick={login}> Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <ImageList >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  )
}

export default Main
