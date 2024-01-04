import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";


export default function ClientsTable({ data }) {
  
  const statusResponses = {
    0:{
      label:'Inactivo',
      color:'error'
    },
    1:{
      label:'Activo',
      color:'success'
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Correo</TableCell>  
            <TableCell align="center">Status</TableCell>  
         
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id_report}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="center">{row.fullname}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
              <Chip label={statusResponses[Number(row?.status)]?.label} color={statusResponses[Number(row?.status)]?.color} variant="outlined" />
              </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
