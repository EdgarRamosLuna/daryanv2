import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTotalReportsBySupplier } from "../../../api/daryan.api";
import { toast } from "sonner";
import ClientsTable from "./ClientsTable";

const SupplierClients = ({ data }) => {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
        flexDirection:'column'
      }}
    >
      <Typography>Usuarios</Typography>
      <Grid sx={{width:'100%'}} >
        <ClientsTable data={data}/>
      </Grid>
    </Grid>
  );
};

export default SupplierClients;
