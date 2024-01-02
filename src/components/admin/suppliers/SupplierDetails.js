import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTotalReportsBySupplier } from "../../../api/daryan.api";
import { toast } from "sonner";
import ReportsTable from "./ReportsTable";
import { PieChart } from "../../chart/PieChart";

const SupplierDetails = ({ nIdSupplier }) => {
  const [reportDetails, setReportDetails] = useState([]);
  const [series, setSeries] = useState([]);
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
  useEffect(() => {
    const getReportBySupplier = async () => {
      try {
        const response = await getTotalReportsBySupplier(nIdSupplier);
        const { error: errorDb, message, data: dataResponse } = response.data;
        if (typeof errorDb !== "boolean") {
          toast.error("Ocurrio un error intentalo mas tarde");
        } else {
          const {
            totalInp,
            totalNG,
            totalOK,
            totalRework,
            totalScrap,
            TotalsByPartName,
          } = dataResponse[0];
          setReportDetails(JSON.parse(TotalsByPartName));
          setSeries([totalNG, totalOK, totalRework, totalScrap]);
        }
        //setTotalReports()
      } catch (error) {
        toast.error("Ocurrio un error intentalo mas tarde");
      }
    };
    getReportBySupplier();
    return () => {};
  }, [nIdSupplier]);

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
        flexDirection:'column'
      }}
    >
      <h1>Total de incidencias</h1>        
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
