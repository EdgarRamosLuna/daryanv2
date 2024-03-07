import { Grid, Typography } from "@mui/material";
import React from "react";
import ClientsTable from "./ClientsTable";
import { useTranslation } from "react-i18next";

const SupplierClients = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
        flexDirection:'column'
      }}
    >
      <Typography>{t('Usuarios')}</Typography>
      <Grid sx={{width:'100%'}} >
        <ClientsTable data={data}/>
      </Grid>
    </Grid>
  );
};

export default SupplierClients;
