import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReportsTable from "./ReportsTable";
import { PieChart } from "../../chart/PieChart";
import MuiCard from "../../cards/MuiCard";
import { useTranslation } from "react-i18next";

const SupplierDetails = ({ nIdSupplier, reportDetails, series }) => {
  const { t } = useTranslation();
  const [labels, setLabels] = useState([
    "Total NG",
    "Total OK",
    t("Total Retrabajo"),
    "Total Scrap",
  ]);
  const [labelsTables, setLabelsTables] = useState([
    t("Total inspeccionado"),
    "Total NG",
    "Total OK",
    t("Total Retrabajo"),
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
            <Typography>{t('Total de incidencias')}</Typography>
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
