import * as React from 'react';
import {useEffect} from 'react'
import Typography from '@mui/material/Typography';
import Title from '../Dashboard/Title';
import axios from 'axios';


export default function Quotes(props) {
        const [quotesData,setQuotesData] = React.useState({}) ;
        const fetchData = () => {
          const url="https://finnhub.io/api/v1/quote?symbol=".concat(props.symbol,"&token=c94i99aad3if4j50rvn0")
            axios.get(url).then(res => {
            const pData = res.data;
            setQuotesData(pData);
            
          }).catch(err=>{
            console.log(err);
          })
        }
        useEffect(() => {
          fetchData()
          }, [])
          
      

  return (
    <React.Fragment>
      <Title>Quotes</Title>
      <Typography component="p" variant="h5">
        Current: {quotesData["c"]}
      </Typography>
      <Typography component="p" variant="h6">
        Change: {quotesData["d"]}
      </Typography>
      <Typography component="p" variant="h6">
        Percent: {quotesData["dp"]}
      </Typography>
      <Typography component="p" variant="h6">
        Previous: {quotesData["pc"]}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        High {quotesData["h"]}
      </Typography>
      
    </React.Fragment>
  );
}