import * as React from 'react';

import {useRef, useState,useEffect} from 'react'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Dashboard/Title';
import axios from 'axios';
import NewsCard from '../Cards/NewsCard';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function News( ) {
    const [news,setNews]= React.useState([])
    
    const fetchData = () => {
    axios.get("https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2022-03-03&to=2022-04-04&token=c94i99aad3if4j50rvn0").then(res => {
      const pData=res.data;
      console.log(pData);
      setNews(pData);
    })   
  }
  useEffect(() => {
    fetchData()
    }, [])
  const final = news.map((newsItem, index) => {
    // console.log("Hello ");
  return (
    <Grid item xs={12} md={6} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 450
                    }}
                  >
                    <NewsCard data ={newsItem}/>
                  </Paper>
                </Grid>
  )
  })
  return <>{final}</>;
}