import React, { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { StyledForm, Table } from "../../styles/Styles";

import SecondTableCreate from "./SecondTableCreate";
import SecondTableCreate3 from "./SecondTableCreate3";
const Create3 = () => {
  const { data, setData } = useContext(MainContext);
  //console.log(data);

  const handleSelect = (e, type) => {
    setData({
      ...data,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
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
        <SecondTableCreate3 />
      </div>

      
    </>
  );
};

export default Create3;
