import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReportsTable from "./ReportsTable";
import { PieChart } from "../../chart/PieChart";
import MuiCard from "../../cards/MuiCard";

const SupplierDetails = ({ nIdSupplier, reportDetails, series }) => {
  const [labels, setLabels] = useState([
    "Total NG",
    "Total OK",
    "Total Retrabajo",
    "Total Scrap",
  ]);
  const [labelsTables, setLabelsTables] = useState([
    "Total inspeccionado",
    "Total NG",
    "Total OK",
    "Total Retrabajo",
    "Total Scrap",
  ]);
  const [show, setShow] = useState(true);

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <MuiCard show={show} setShow={setShow}>
        {show ? (
          <>
            <Typography>Total de incidencias</Typography>
            <PieChart labels={labels} series={series} />
          </>
        ) : (
          ""
        )}
      </MuiCard>
      <Grid>
        <ReportsTable data={reportDetails} labels={labelsTables} />
      </Grid>
    </Grid>
  );
};

export default SupplierDetails;
