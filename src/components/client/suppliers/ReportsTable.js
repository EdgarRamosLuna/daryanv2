import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";


export default function ReportsDataGrid({ data, labels }) {
  const { t } = useTranslation();
  const { lang: globalLang } = useContext(LanguageContext);
  // Convertir las etiquetas en columnas para DataGrid
  const columns = [
    {
      field: "part_name",
      headerName: t("reports.part_name_label"),
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "part_number",
      headerName: t("reports.part_number_label"),
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalInp",
      headerName: t("Total inspeccionado"),
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalNG",
      headerName: "Total NG",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalOK",
      headerName: "Total Ok",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalRework",
      headerName: t("Total Retrabajo"),
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalScrap",
      headerName: "Total Scrap",
      width: 150,
      headerAlign: "center",
      align: "center",
    },

  ];

  // Asegurarse de que cada fila tenga un id único para DataGrid
  const rows = data.map((row, index) => ({
    id: index, // Puedes usar row.id_report si es único para cada fila
    ...row,
  }));
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnSelector
        disableRowsSelector
        localeText={
          globalLang === "es"
            ? esES.components.MuiDataGrid.defaultProps.localeText
            : ""
        }
      />
    </Box>
  );
}
