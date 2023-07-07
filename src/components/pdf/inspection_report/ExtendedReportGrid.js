import React from 'react';

const ExtendedReportGrid = () => (
  <div style={{ gridColumn: "span 11" }}>
    <div
      className=""
      style={{
        display: "grid",
        gridTemplateColumns: "141px 2fr 2fr 2fr 150px 260px 1fr 100px 100px",
        border: "1px solid",
        boxSizing: "border-box",
        alignContent: "center",
        gridTemplateRows: "40px",
        borderLeft: "2px solid",
      }}
    >
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        PLANTA / FACILITY
      </div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        PROVEEDOR / SUPPLIER
      </div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        text
      </div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        FECHA / DATE
      </div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        text
      </div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No. DE REPORTE / REPORT
      </div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        text
      </div>
      <div
        className="row-item"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "0",
        }}
      >
        text
      </div>
    </div>
  </div>
);

export default ExtendedReportGrid;
