
import React from 'react';
import {useEffect} from 'react'
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../Firebase';
import { useAuth } from '../contexts/AuthContext';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Alert from '@mui/material/Alert';
import Title from "../Dashboard/Title";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function UserPortfolio() {
  const history = useNavigate();
  const columns : GridColDef[] = [
  
    { field: "name", headerName: "Company Name", flex: 1 },
    { field: "Date", headerName: "date", flex: 1 },
    {
      field: "Symbol",
      headerName: "Symbol", flex: 1
    },
    {
      field: "Quantity",
      headerName: "Quantity", flex: 1
    },
    {
      field: "Value",
      headerName: "Value"
    },
    {
        field:"Today",
        headerName:"Today"
    },
    {
        field:"Gain",
        headerName:"Gain"
    },
    {
      field: 'Sell ',
      headerName: 'Sell',
      sortable: false,
      renderCell: (params) => {
        const Remove = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
  
          return alert(JSON.stringify(thisRow.name, null, 4));
        };
  
        return <Button  onClick={Remove} variant="outlined" color="error">Sell</Button>;
      },
    },
    {
      field: 'Details',
      headerName: 'Details',
      sortable: false,
      renderCell: (params) => {
        const Details = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
            history('/dashboard',{state:thisRow});
          return ;
        };
  
        return <Button onClick={Details} ><Icon sx={{ color: green[500] }}>add_circle</Icon></Button>;
      },
    },
  ];
  let co = 1;
  
  const [quotesData,setQuotesData] = React.useState({}) ;
        const fetchData2 = (props) => {
          console.log(props)
          const url="https://finnhub.io/api/v1/quote?symbol=".concat(props.symbol,"&token=c94i99aad3if4j50rvn0")
            axios.get(url).then(res => {
            const pData = res.data;
            setQuotesData(pData);
            
          }).catch(err=>{
            console.log(err);
          })
        }
        
  
const [rows: GridRowsProp,setRows] =React.useState([]);
  const [quarterlyReports, setQuarterlyReports] = React.useState([]);
  const tem=[];
  const {currentUser, logout} = useAuth();
  async function fetchData() {
        const washingtonRef = doc(db, "Stocks", currentUser.email);
        const docSap= await getDoc(washingtonRef);
        const TemData=docSap.data(); 
        const pData = TemData.Add;
        console.log(docSap.data());

        console.log(pData);
        for (var key in pData) {
          if (!pData.hasOwnProperty(key)) continue;
          const aa=new Date(pData[key].dates/1000);
          let newData=[]
          const url="https://finnhub.io/api/v1/quote?symbol=".concat(pData[key].symbol,"&token=c94i99aad3if4j50rvn0")
          await axios.get(url).then(res => {
          const pData = res.data;
          newData.push(pData);
          
        }).catch(err=>{
          console.log(err);
        })
           console.log(newData)
            let quantity=parseInt(pData[key].quantity);
            let value=parseInt(pData[key].value);
            let calculation=quantity*(newData[0]["c"]-value);
            let date=new Date(pData[key].dates/1000)
            let DateFormat = date.getDate()+" "+date.getMonth()+" "+date.getFullYear();
          const ab = {
              id:co,
              name:pData[key].name,
              date:DateFormat,
              Symbol:pData[key].symbol,
              Quantity:pData[key].quantity,
              Value:pData[key].value,
              Today:newData[0]["c"],
              Gain:calculation,
          }
          console.log(pData[key].name)
          tem.push(ab);

          co++;
        }
        console.log("rows");
        
        setRows(tem);
        console.log(tem);
      };
    
    useEffect(() => {
      fetchData()
      }, [])

     
  
  return (
    <React.Fragment>
      <Title>Portfolio</Title>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns}  rowBuffer={3} />
    </div>
    </React.Fragment>
  );
}