import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { rows } from "./indData";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import TablePagination from "@mui/material/TablePagination";
import Title from "./Title";
import {
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Stocks() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const history = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { currentUser } = useAuth();

  async function onAdd(props) {
    const washingtonRef = doc(db, "Users", currentUser.email);
    const values = {
      dates: "",
      value: 0,
      quantity: 0,
      name: props.description,
      symbol: props.symbol,
    };
    //console.log(props);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(washingtonRef, {
      Stock: arrayUnion(values),
    });
    history("/watchlist");
  }

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
            <TableCell>symbol</TableCell>
            <TableCell>figi</TableCell>
            <TableCell>MIC</TableCell>
            <TableCell>Add in watch list</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.figi}</TableCell>
                <TableCell>{row.mic}</TableCell>
                <TableCell>
                  <IconButton
                    type="submit"
                    value={row}
                    aria-label="fingerprint"
                    onClick={() => onAdd(row)}
                    color="success"
                  >
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
