import * as React from 'react';
import {useEffect} from 'react'
import axios from 'axios';
import NewsCard from '../Cards/NewsCard';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function News(props) {
    const [news,setNews]= React.useState([])
    
    const fetchData = () => {
      const url="https://finnhub.io/api/v1/company-news?symbol=".concat(props.symbol,"&from=2022-03-03&to=2022-04-04&token=c94i99aad3if4j50rvn0")
    axios.get(url).then(res => {
      const pData=res.data;
      //console.log(pData);
      setNews(pData);
    })   
  }
  useEffect(() => {
    fetchData()
    }, [])
  const final = news.map((newsItem, index) => {
    // console.log("Hello ");
  return (
    <Grid item xs={12} md={6} lg={4} key={index}>
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