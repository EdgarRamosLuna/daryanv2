import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTotalReportsBySupplier } from "../../../api/daryan.api";
import { toast } from "sonner";
import ReportsTable from "./ReportsTable";

const SupplierDetails = ({ nIdSupplier }) => {
  const [totalReports, setTotalReports] = useState(0);
  const [reportDetails, setReportDetails] = useState([]);
  useEffect(() => {
    const getReportBySupplier = async () => {
      try {
        const response = await getTotalReportsBySupplier(nIdSupplier);
        const { error: errorDb, message, data: dataResponse } = response.data;
        if (typeof errorDb !== "boolean") {
          toast.error("Ocurrio un error intentalo mas tarde");
        } else {
          setTotalReports(dataResponse?.length);
          setReportDetails(dataResponse);
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
    <Grid>
      <Grid>
        <ReportsTable data={reportDetails} totalReports={totalReports}/>
     
      </Grid>
    </Grid>
  );
};

export default SupplierDetails;
