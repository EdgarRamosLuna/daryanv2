import React, { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { StyledPdfReport } from "./StylesPdf";
import styled from "styled-components";
import ReportGrid from "./inspection_report/ReportGrid";
const InspectionReport = () => {
    const [pdfBase64, setPdfBase64] = useState("");

    const printDocument = () => {
        try {
            const input = document.getElementById("divToPrint");
            const pdf = new jsPDF("l", "mm", [500, 216]);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            html2canvas(input, { scale: 1 }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const imgProps = pdf.getImageProperties(imgData);
                let heightLeft = imgProps.height;

                let position = 0;

                while (heightLeft >= 0) {
                    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
                    heightLeft -= pdfHeight;
                    position += pdfHeight;
                    // Make sure the loop breaks after adding all the necessary images
                    if (position >= imgProps.height) break;
                    if (heightLeft > 0) {
                        pdf.addPage();
                    }
                }

                const pdfBase64 = pdf.save("datauristring");
                setPdfBase64(pdfBase64);
            });
        } catch (error) {
            console.error(error);
        }
    };
  
  return (
    <StyledPdfReport>
      <div className="container" id="divToPrint">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 83%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
            border: "2px solid",
            borderBottom: "0",
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              borderRight: "2px solid",
            }}
          >
            <img
              src="/assets/img/logo.png"
              alt="Daryan Saltillo"
              style={{
                width: "200px",
              }}
            />
          </div>

          <div>REPORTE DE INSPECCION / INSPECTION REPORT</div>
        </div>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
        <ReportGrid/>
      
      </div>
    </StyledPdfReport>
  );
};

export default InspectionReport;
