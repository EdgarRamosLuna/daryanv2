import { Grid } from "@mui/material";
import React from "react";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";

const PdfChartsExport = ({totalGeneral}) => {
  return (
    <Grid id="myComponent">
      <Chart1
        totalG={totalGeneral}
        colorScale={["tomato", "orange", "gold", "gold", "gold", "gold"]}
      />
      <Chart2
        totalG={totalGeneral}
        colorScale={["tomato", "orange", "gold", "gold", "gold", "gold"]}
      />
    </Grid>
  );
};

export default PdfChartsExport;
