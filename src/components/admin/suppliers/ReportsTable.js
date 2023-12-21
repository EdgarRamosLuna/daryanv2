import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ReportsTable({ data, totalReports }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reporte id</TableCell>
            <TableCell align="center">Numero de parte</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Reportes totales</TableCell>
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
              <TableCell align="center">{row.id_report}</TableCell>
              <TableCell align="center">{row.part_number}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              
              {index === (data.length % 2) - 1 && (
                <TableCell rowSpan={data.length} align="center"> {/* rowSpan se establece al número total de filas */}
                    {totalReports}
                </TableCell>
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
