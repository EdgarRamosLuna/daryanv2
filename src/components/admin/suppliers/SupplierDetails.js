import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReportsTable from "./ReportsTable";
import { PieChart } from "../../chart/PieChart";

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


  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
        flexDirection:'column'
      }}
    >
      <Typography>Total de incidencias</Typography>        
      <Grid>        
        <PieChart labels={labels} series={series} />
      </Grid>
      <Grid>
        <ReportsTable data={reportDetails} labels={labelsTables} />
      </Grid>
    </Grid>
  );
};

export default SupplierDetails;
