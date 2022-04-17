import * as React from 'react';

import {useRef, useState,useEffect} from 'react'
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { rows } from './indData';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import TablePagination from '@mui/material/TablePagination';
import Title from './Title';
import axios from "axios";




function preventDefault(event) {
  event.preventDefault();
}

export default function Stocks() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <Title>Stock Listing with symbol</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Display Symbol</TableCell>
            <TableCell>figi</TableCell>
            <TableCell>MIC</TableCell>
            <TableCell>shareClassFIGI</TableCell>
            
            <TableCell>type</TableCell>
            <TableCell>Add in watch list</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow >
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.displaySymbol}</TableCell>
              <TableCell>{row.figi}</TableCell>
              <TableCell>{row.mic}</TableCell>
              <TableCell>{row.shareClassFIGI}</TableCell>
              
              <TableCell>{row.type}</TableCell>
              <TableCell><IconButton aria-label="fingerprint" color="success">
        <Fingerprint />
      </IconButton>
</TableCell>
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