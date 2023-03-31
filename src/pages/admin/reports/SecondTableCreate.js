import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { Table } from "../../../styles/Styles";

export default function SecondTableCreate() {
  const {
    numFilas,
    setNumFilas,
    numColumnas,
    setNumColumnas,
    setTitulosColumnas,
    titulosColumnas,
    agregarColumna,
    agregarFila,
    eliminarColumna,
    eliminarFila,
    divs,
    setDivs,
  } = useContext(MainContext);

  const handleInputChange = (divId, inputIndex, newValue) => {
    setDivs((prevDivs) => {
      const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
      const updatedDiv = { ...prevDivs[divToUpdateIndex] };
      updatedDiv.values[inputIndex] = newValue;
      const updatedDivs = [...prevDivs];
      updatedDivs[divToUpdateIndex] = updatedDiv;
      return updatedDivs;
    });
  };

  return (
    <Table>
      <table>
        <thead>
          <tr>
            {titulosColumnas.map((titulo, i) =>
              i === 0 ? (
                <th>
                  <i
                    className="fa-solid fa-circle-plus"
                    onClick={() => agregarFila(numColumnas)}
                  ></i>
                </th>
              ) : (
                <th key={i}>{titulo}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {divs.map((fila) => (
            <tr key={fila.id}>
              {fila.values.map((valor, i) =>
                i === 0 || i === fila.values.length - 1 ? (
                  <td>
                    {i === 0 && fila.id !== 1 && (
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => eliminarFila(fila.id)}
                      ></i>
                    )}
                  </td>
                ) : i === 1 ? (
                  <td key={i} className="table-center">
                    {fila.id}
                  </td>
                ) : (
                  <td key={i}>
                    <input
                      value={fila.values[i]}
                      onChange={(e) =>
                        handleInputChange(fila.id, i, e.target.value)
                      }
                    />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
}
