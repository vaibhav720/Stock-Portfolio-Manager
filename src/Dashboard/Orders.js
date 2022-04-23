import * as React from 'react';
import {useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Title from './Title';
import axios from "axios";

export default function Orders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [rows,setRows]= React.useState([]);
  const fetchData = () => {
  axios.get("https://finnhub.io/api/v1/stock/insider-transactions?symbol=AAPL&token=c94i99aad3if4j50rvn0").then(res=>{
    const pData= res.data;
    console.log(pData);
    setRows(pData["data"]);
  })
}
useEffect(() => {
    fetchData()
}, [])
  return (
    <React.Fragment>
      <Title>Inside Transaction</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell>share</TableCell>
            <TableCell>change</TableCell>
            <TableCell>filingDate</TableCell>
            <TableCell>transactionDate</TableCell>
            
            <TableCell>transactionCode</TableCell>
            <TableCell>transactionPrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.share}</TableCell>
              <TableCell>{row.change}</TableCell>
              <TableCell>{row.filingDate}</TableCell>
              <TableCell>{row.transactionDate}</TableCell>
              
              <TableCell>{row.transactionCode}</TableCell>
              <TableCell>{row.transactionPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </React.Fragment>
  );
}