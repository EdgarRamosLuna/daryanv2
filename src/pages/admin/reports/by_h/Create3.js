import React, { useContext, useState } from "react";


import SecondTableCreate3 from "./SecondTableCreate3";
import SecondTableCreate4 from "./SecondTableCreate4";
import { MainContext } from "../../../../context/MainContext";

const Create3 = ({divs, setDivs, reportType, divsR4, setDivsR4, setDivsSamplingTableInsp}) => {
  const { data, setData, numFilasReportByH,  } = useContext(MainContext);
  const handleSelect = (e, type) => {
    setData({
      ...data,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
console.log(divsR4)
  
  return (
    <>
      <div className="container c3">
        <div className="title">
          <h3>Tabla de muestreo</h3>
          <p>
          TABLA DE MUESTREO (EL SUPERVISOR, LIDER Y/O ENCARGADO DEL TURNO DEBE DE RE-INSPECCIONAR UN 20% DE TODO EL MATERIAL LIBERADO).
          </p>
          <br />
          
        </div>
        
      </div>
      <div className="container c4">
        {reportType === "insp" && <SecondTableCreate3 divs={divs} setDivs={setDivs} />}
        {reportType === "byh" && <SecondTableCreate4 divs={divsR4} setDivs={setDivsR4} />}
        
      </div>

      
    </>
  );
};

export default Create3;
