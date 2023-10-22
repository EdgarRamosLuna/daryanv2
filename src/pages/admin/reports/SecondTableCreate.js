import React, { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { Table } from "../../../styles/Styles";

import { useRef } from "react";
import DatePickerInputU from "../../../components/DateInputUpdate";
import useThClick from "./useThClick";
import CustomInput from "../../employee/utils/CustomInput";

export default function SecondTableCreate({
  dataC,
  eliminarColumna2,
  agregarColumna,
  divs,
  setDivs,
  agregarFila,
  eliminarFila,
}) {
  const {
    numColumnas,
    titulosColumnas,
    setTotal1,
    setTotal2,
    setTotal3,
    setTotal4,
    setTotal5,
    setTotal6,
    setTotal7,
    setTotal8,
    setTotal9,
    setTotal10,
    setTotal11,
    setTotal12,
    setTotal13,
    setTotal14,
    setDivsSamplingTableInsp,
    divsSamplingTableInsp,
  } = useContext(MainContext);
  const handleInputChange = (divId, inputIndex, newValue) => {
    // 1. Actualizar divs basado en el cambio de entrada
    setDivs((prevDivs) => {
      const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
      const updatedDiv = { ...prevDivs[divToUpdateIndex] };
      updatedDiv.values[inputIndex] = newValue;
      const updatedDivs = [...prevDivs];
      updatedDivs[divToUpdateIndex] = updatedDiv;
      return updatedDivs;
    });

    // 2. Sincronizar divsSamplingTableInsp con divs
    const updatedSamplingTable = divs.map((divItem) => {
      // Obtiene el item correspondiente de divsSamplingTableInsp
      const originalItem = divsSamplingTableInsp.find(
        (item) => item.id === divItem.id
      );
      return {
        id: divItem.id,
        values: [
          originalItem.values[0], // id se mantiene igual
          divItem.values[3], // lote se sincroniza desde divs
          divItem.values[4], // serial se sincroniza desde divs
          divItem.values[5], // total insp se sincroniza desde divs
          ...originalItem.values.slice(4), // El resto de los valores se mantienen sin cambios
        ],
      };
    });
    setDivsSamplingTableInsp(updatedSamplingTable);
  };

  useEffect(() => {
    let newValue1 = 0;
    let newValue2 = 0;
    let newValue3 = 0;
    let newValue4 = 0;
    let newValue5 = 0;
    let newValue6 = 0;
    let newValue7 = 0;
    let newValue8 = 0;
    let newValue9 = 0;
    let newValue10 = 0;
    let newValue11 = 0;
    let newValue12 = 0;
    let newValue13 = 0;
    let newValue14 = 0;

    divs.map((div) => {
      //console.log(div.id)
      const values = div.values;
      values.forEach((value, i) => {
        if (i > 4) {
          //<= values.length - 2
          switch (i) {
            case 5:
              if (value !== "") {
                newValue1 = newValue1 + Number(value);
                setTotal1(newValue1);
              }
              break;
            case 6:
              if (value !== "") {
                newValue2 = newValue2 + Number(value);
                setTotal2(newValue2);
              }
              break;
            case 7:
              if (value !== "") {
                newValue3 = newValue3 + Number(value);
                setTotal3(newValue3);
              }
              break;
            case 8:
              if (value !== "") {
                newValue4 = newValue4 + Number(value);
                setTotal4(newValue4);
              }
              break;
            case 9:
              if (value !== "") {
                newValue5 = newValue5 + Number(value);
                setTotal5(newValue5);
              }
              break;
            case 10:
              if (value !== "") {
                newValue6 = newValue6 + Number(value);
                setTotal6(newValue6);
              }
              break;
            case 11:
              if (value !== "") {
                newValue7 = newValue7 + Number(value);
                setTotal7(newValue7);
              }
              break;
            case 12:
              if (value !== "") {
                newValue8 = newValue8 + Number(value);
                setTotal8(newValue8);
              }
              break;
            case 13:
              if (value !== "") {
                newValue9 = newValue9 + Number(value);
                setTotal9(newValue9);
              }
              break;
            case 14:
              if (value !== "") {
                newValue10 = newValue10 + Number(value);
                setTotal10(newValue10);
              }
              break;
            case 15:
              if (value !== "") {
                newValue11 = newValue11 + Number(value);
                setTotal11(newValue11);
              }
              break;
            case 16:
              if (value !== "") {
                newValue12 = newValue12 + Number(value);
                setTotal12(newValue12);
              }
              break;
            case 17:
              if (value !== "") {
                newValue13 = newValue13 + Number(value);
                setTotal13(newValue13);
              }
              break;
            case 18:
              if (value !== "") {
                newValue14 = newValue14 + Number(value);
                setTotal14(newValue14);
              }
              break;
            default:
              break;
          }
        }
      });
    });
  }, [divs]);

  const [data, setData] = useState([]);
  const [isEClause, setIsEClause] = useState(false);
  const handleDate = (name, date, id, index) => {
    handleInputChange(id, index, date);
  };
  const btnRef = useRef(null);
  const clauses = Number(dataC.report_in.length);

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const formattedDateTime = `${year}-${month}-${day}`;
  const btnDelIncRef = useRef(null);
  const [currentThText, previousThText, handleClick] =
    useThClick(eliminarColumna2);
  const handleEnter = useCallback((filaId, currentIndex) => {
    const nextInput = document.getElementById(`input-${filaId + 1}-${3}`);
    nextInput && nextInput.focus();
  }, []);
  //console.log(previousThText);
  return (
    <Table>
      <table>
        <thead>
          <tr>
            {titulosColumnas.map((titulo, i) =>
              i === 0 ? (
                <th key={i}>
                  <i
                    ref={btnRef}
                    className="fa-solid fa-circle-plus"
                    onClick={() => agregarFila(numColumnas, formattedDateTime)}
                  ></i>
                </th>
              ) : (
                <th>{titulo}</th>
              )
            )}
            {titulosColumnas.at(-1) !== "I" ? (
              <th>
                <i
                  className="fa-solid fa-circle-plus"
                  onClick={agregarColumna}
                ></i>
              </th>
            ) : (
              <th></th>
            )}
          </tr>
        </thead>
        <tbody onClick={handleClick}>
          {divs.map((fila, indx) => (
            <tr key={fila.id}>
              {fila.values.map((valor, i) =>
                i === 0 || i === fila.values.length - 1 ? (
                  <>
                    {i === 0 && fila.id !== 1 ? (
                      <td>
                        {indx === divs.length - 1 && (
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => eliminarFila(fila.id, valor)}
                          ></i>
                        )}
                      </td>
                    ) : (
                      i === 0 && fila.id === 1 && <td></td>
                    )}

                    {i === fila.values.length - 1 &&
                      fila.values.length > 15 && (
                        <td
                          className="fa-solid fa-trash"
                          style={{
                            display: "table-cell",
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                  </>
                ) : i === 1 ? (
                  <td key={i} className="table-center">
                    {fila.id}
                  </td>
                ) : (
                  <td key={i}>
                    {i === 2 ? (
                      valor !== "" ? (
                        <DatePickerInputU
                          id={fila.id}
                          name="date_item"
                          index={i}
                          value={valor}
                          setDate={handleDate}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      <>
                        {i >= 3 && i <= 4 ? (
                          <CustomInput
                          value={valor}
                          onChange={handleInputChange}
                          onEnter={handleEnter} // Pasar el id de la fila y el índice del input a handleEnter
                          id={`input-${fila.id}-${i}`}
                          key={i} // Añadir una key prop es importante cuando se mapea un array a elementos JSX
                          filaId={fila.id}
                          index={i}
                        />
                        ) : (
                          <CustomInput
                            value={valor}
                            onChange={handleInputChange}
                            onEnter={handleEnter} // Pasar el id de la fila y el índice del input a handleEnter
                            id={`input-${fila.id}-${i}`}
                            filaId={fila.id}
                            index={i}
                            key={i} // Añadir una key prop es importante cuando se mapea un array a elementos JSX
                          />
                        )}
                      </>
                    )}
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
