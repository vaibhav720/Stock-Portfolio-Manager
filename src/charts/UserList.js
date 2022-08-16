
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
import { useNavigate } from 'react-router-dom';
import Title from "../Dashboard/Title";
import axios from 'axios';
export default function UserList() {
  const history = useNavigate();
  const columns : GridColDef[] = [
  
    { field: "name", headerName: "Company Name", flex: 1 },
    { field: "Symbol", headerName: "Symbol", flex: 1 },
    {
      field: "Today",
      headerName: "Today", flex: 1
    },
    {
      field: "Percent",
      headerName: "Percent"
    },
    {
      field: 'Add ',
      headerName: 'Add',
      sortable: false,
      renderCell: (params) => {
        const Add = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
      
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
            //console.log(thisRow)
            history('/addStock',{state:thisRow});
          return 
        };
  
        return <Button onClick={Add} variant="contained" color="success">Add</Button>;
      },
    },
    {
      field: 'Remove ',
      headerName: 'Remove',
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
  
        return <Button  onClick={Remove} variant="outlined" color="error">Remove</Button>;
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
            console.log(thisRow);
            history('/dashboard',{state:thisRow});
          return 
        };
  
        return <Button onClick={Details} ><Icon sx={{ color: green[500] }}>add_circle</Icon></Button>;
      },
    },
  ];
  let co = 1;
  
  
const [rows: GridRowsProp,setRows] =React.useState([]);
  const [quarterlyReports, setQuarterlyReports] = React.useState([]);
  const tem=[];
  const {currentUser, logout} = useAuth();
  async function fetchData() {
        const washingtonRef = doc(db, "Users", currentUser.email);
        const docSap= await getDoc(washingtonRef);
        const TemData=docSap.data(); 
        const pData = TemData.Stock;
        //console.log(docSap.data());

        //console.log(pData);
        for (var key in pData) {
          if (!pData.hasOwnProperty(key)) continue;
          let newData=[]
          const url="https://finnhub.io/api/v1/quote?symbol=".concat(pData[key].symbol,"&token=c94i99aad3if4j50rvn0")
          await axios.get(url).then(res => {
          const pData = res.data;
          newData.push(pData);
          
        }).catch(err=>{
          console.log(err);
        })
           console.log(newData)

          const aa="";
          const ab = {
              id:pData[key].symbol,
              name:pData[key].name,
              Symbol:pData[key].symbol,
              Today:newData[0]["c"],
              Percent:newData[0]["dp"],
          }
         // console.log(pData[key].name)
          tem.push(ab);

          co++;
        }
        //console.log("rows");
        
        setRows(tem);
       // console.log(tem);
      };
    
    useEffect(() => {
      fetchData()
      }, [])

     
  
  return (
    <React.Fragment>
      <Title>Watch List</Title>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns}  rowBuffer={3} />
    </div>
    </React.Fragment>
    
  );
}