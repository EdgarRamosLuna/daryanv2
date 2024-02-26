import React, { useContext, useState } from "react";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import { Document, Page, Image, PDFDownloadLink } from "@react-pdf/renderer";

import html2canvas from "html2canvas";
import { Button, Grid } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { pdf } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../context/MainContext";

const PdfCharts = ({ imageUrl }) => (
  <Document>
    <Page size="A4">
      <Image src={imageUrl} />
    </Page>
  </Document>
);

const Charts = ({ totalGeneral: totalG, setIsDownloading, isDownloading }) => {
  const downloadPdf = async (imageUrl) => {    
    const blob = await pdf(<PdfCharts imageUrl={imageUrl} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "charts.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    const component = document.getElementById("myComponent");
    const canvas = await html2canvas(component);
    const imageUrl = canvas.toDataURL("image/png");
    await downloadPdf(imageUrl);
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };
  const { t } = useTranslation();
  const keys = Object.keys(totalG);
  const { tableFilters } = useContext(MainContext);
  const data = [
    {
      x: 1,
      y: tableFilters[0].total_in !== false ? totalG["total_inspected"] : 0,
      fill: tableFilters[0].total_in !== false ? "yellow": "transparent",
      fillC: tableFilters[0].total_in !== false ? "#000": "transparent",
      label:t("Piezas") + " " + t("Inspeccionado") + ` - ${tableFilters[0].total_in !== false ? totalG["total_inspected"] : 0}`
    },
    {
      x: 2,
      y: tableFilters[0].total_ng !== false ? totalG["total_ng_pieces"] : 0,
      fill: tableFilters[0].total_ng !== false ? "red": "transparent",
      fillC: tableFilters[0].total_ng !== false ? "#000": "transparent",
      label:t("Piezas") + ` NG - ${tableFilters[0].total_ng !== false ? totalG["total_ng_pieces"] : 0}`
    },
    {
      x: 3,
      y: tableFilters[0].total_ok !== false ? totalG["total_ok_pieces"] : 0,
      fill: tableFilters[0].total_ok !== false ? "green": "transparent",
      fillC: tableFilters[0].total_ok !== false ? "#000": "transparent",
      label:t("Piezas")+` OK - ${tableFilters[0].total_ok !== false ? totalG["total_ok_pieces"] : 0}}`
    },
    {
      x: 4,
      y: tableFilters[0].total_rw !== false ? totalG["total_re_work_parts"] : 0,
      fill: tableFilters[0].total_rw !== false ? "orange": "transparent",
      fillC: tableFilters[0].total_rw !== false ? "#000": "transparent",
      label:t("Piezas") +" "+ t("reports.rework_label") + ` - ${tableFilters[0].total_rw !== false ? totalG["total_re_work_parts"] : 0}`
    },
    {
      x: 5,
      y: tableFilters[0].total_sc !== false ? totalG["total_scrap"] : 0,
      fill: tableFilters[0].total_sc !== false ? "gray": "transparent",
      fillC: tableFilters[0].total_sc !== false ? "#000": "transparent",
      label:t("Piezas") +` Scrap - ${tableFilters[0].total_sc !== false ? totalG["total_scrap"] : 0}`
    },
    {
      x: 6,
      y: tableFilters[0].total_wh !== false ? totalG["worked_h"] : 0,
      fill: tableFilters[0].total_wh !== false ? "yellowgreen": "transparent",
      fillC: tableFilters[0].total_wh !== false ? "#000": "transparent",
      label:t("reports.worked_hours_label") + ` - ${tableFilters[0].total_wh !== false ? totalG["worked_h"] : 0}`
    },
  ];
  return (
    <>
      <Grid id="myComponent" display={"flex"}>
        {isDownloading && (
          <div href="/app/admin" className="logo">
            <img src="/assets/img/logo.png" alt="Daryan Saltillo" />
          </div>
        )}
        <Chart1
          totalG={totalG}
          colorScale={["tomato", "orange", "gold", "gold", "gold", "gold"]}
          data={data}
        />
        <Chart2
          totalG={totalG}
          colorScale={["tomato", "orange", "gold", "gold", "gold", "gold"]}
          data={data}
        />
      </Grid>
      <Button
        variant="outlined"
        onClick={handleDownloadPdf}
        endIcon={<CloudDownloadIcon />}
        sx={{
          width: "auto",
          height: "40px",
        }}
      >
        {t("Descargar")} PDF
      </Button>
    </>
  );
};

export default Charts;
