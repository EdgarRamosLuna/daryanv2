import React, { useState } from "react";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import { Document, Page, Image, PDFDownloadLink } from "@react-pdf/renderer";

import html2canvas from "html2canvas";
import { Button, Grid } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { pdf } from "@react-pdf/renderer";

const PdfCharts = ({ imageUrl }) => (
  <Document>
    <Page size="A4">
      <Image src={imageUrl} />
    </Page>
  </Document>
);

const Charts = ({ totalGeneral, setIsDownloading, isDownloading }) => {
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
  return (
    <>
      <Grid id="myComponent" display={"flex"}>
        {isDownloading && (
          <div href="/app/admin" className="logo">
            <img src="/assets/img/logo.png" alt="Daryan Saltillo" />
          </div>
        )}
        <Chart1
          totalG={totalGeneral}
          colorScale={["tomato", "orange", "gold", "gold", "gold", "gold"]}
        />
        <Chart2
          totalG={totalGeneral}
          colorScale={["tomato", "orange", "gold", "gold", "gold", "gold"]}
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
        Descargar PDf
      </Button>
    </>
  );
};

export default Charts;
