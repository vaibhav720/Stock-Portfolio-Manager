
import React from 'react';
import {useEffect} from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../Firebase';
import { useAuth } from '../contexts/AuthContext';
const columns : GridColDef[] = [
  { field: "name", headerName: "Company Name" },
  { field: "date", headerName: "date" },
  { field: "Buy", headerName: "Buy" },
  { field: "Remove", headerName: "Remove" },
  {
    field: "Today",
    headerName: "Today"
  },
  {
    field: "Percent",
    headerName: "Percent"
  }
];
let co = 1;


export default function UserList() {
  
const [rows: GridRowsProp,setRows] =React.useState([]);
  const [quarterlyReports, setQuarterlyReports] = React.useState([]);
  const tem=[];
  const {currentUser, logout} = useAuth();
  async function fetchData() {
        const washingtonRef = doc(db, "Users", currentUser.email);
        const docSap= await getDoc(washingtonRef);
        const TemData=docSap.data(); 
        const pData = TemData.Stock;
        console.log(docSap.data());
        setQuarterlyReports(pData);
        console.log(pData);
        for (var key in quarterlyReports) {
          if (!quarterlyReports.hasOwnProperty(key)) continue;
          const ab = {
              id:co,
              col1:pData[key].name,
              col2:pData[key].date,
              col3:pData[key].name,
              col4:pData[key].name,
              col5:pData[key].name,
          }
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}