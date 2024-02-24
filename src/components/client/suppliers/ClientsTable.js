import * as React from "react";
import { useDemoData } from "@mui/x-data-grid-generator";
import { DataGrid, esES } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip, Grid } from "@mui/material";
import DataGridMUI from "../../datagrid/DataGridMUI";
import { useTranslation } from "react-i18next";

export default function ClientsTable({ data: rows }) {
  const { t } = useTranslation();
  let id = 1;
  rows.forEach((item) => {
    item.id = id++;
  });
  const statusResponses = {
    0: {
      label: "Inactivo",
      color: "error",
    },
    1: {
      label: "Activo",
      color: "success",
    },
  };
  const columns = [
    {
      field: "fullname",
      headerName: t('clients_section.clientName'),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: t('clients_section.email'),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: t("clients_section.status"),
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { status } = params.row;
        return (
          <>
            <Chip
              label={statusResponses[Number(status)]?.label}
              color={statusResponses[Number(status)]?.color}
              variant="outlined"
            />
          </>
        );
      },
    },
  ];  
  return (
    <Grid sx={{ width: "100%" }}>
      <DataGridMUI rows={rows} columns={columns} />
    </Grid>
  );
}
