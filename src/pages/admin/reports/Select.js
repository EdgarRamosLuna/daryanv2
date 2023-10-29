// Importando las dependencias necesarias de React
import React, { useState, useEffect, useContext } from "react";

import { MainContext } from "../../../context/MainContext";
// Definiendo un componente funcional llamado SelectCustom
const SelectCustom = ({ data, clause, selected }) => {
  // Utilizando el hook useContext para acceder al contexto MainContext
  // y desestructurando setIncType e incType de dicho contexto
  const { setIncType } = useContext(MainContext);

  // Utilizando el hook useEffect para ejecutar lógica cuando el prop 'selected' cambie
  useEffect(() => {
    // Si 'selected' tiene un valor, actualiza el estado de dataC con el valor de 'selected'
    if (selected) {
      setDataC(selected);
    }
  }, [selected]); // Dependencia del efecto: prop 'selected'

  // Definiendo el estado local dataC y su función de actualización setDataC
  // con un valor inicial de cadena vacía
  const [dataC, setDataC] = useState("");

  // Definiendo una función para manejar el cambio en el selector
  const handleChange = (e) => {
    // Obteniendo el valor del elemento seleccionado
    const type = e.target.value;

    // Actualizando el estado del contexto con el nuevo valor seleccionado
    setIncType((prevArray) => {
      const uniqueObjects = new Map(
        prevArray.map((obj) => [JSON.stringify(obj), obj])
      );
      uniqueObjects.set(JSON.stringify({ type, clause }), { type, clause });
      return Array.from(uniqueObjects.values());
    });

    // Actualizando el estado local dataC con el nuevo valor seleccionado
    setDataC(type);
  };

  // Retornando JSX para renderizar un elemento select con opciones dinámicas basadas en el prop 'data'
  return (
    <select value={dataC} onChange={handleChange}>
      <option value="0">Tipo</option>
      {
        // Mapeando a través del array 'data' y retornando un elemento option para cada item
        data.map((item, i) => {
          return (
            <option value={item.value} key={item.value + i}>
              {item.text}
            </option>
          );
        })
      }
    </select>
  );
};

// Exportando el componente SelectCustom como exportación predeterminada
export default SelectCustom;
