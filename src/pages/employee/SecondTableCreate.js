import React, { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { Table } from "../../styles/Styles";
import DatePickerInput from "../../components/DateInput";
import CustomInput from "./utils/CustomInput";

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
    divsSamplingTableInsp,
    setDivsSamplingTableInsp,
  } = useContext(MainContext);

  const handleInputChange = (divId, inputIndex, newValue) => {
    setDivs((prevDivs) => {
      const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
      // Ensure that the div is found
      if (divToUpdateIndex === -1) {
        console.error("Div not found!");
        return prevDivs; // Return the previous state
      }

      const updatedDiv = { ...prevDivs[divToUpdateIndex] };

      // Check if values exists on updatedDiv
      if (!updatedDiv.values) {
        console.error("Values property not found on div");
        return prevDivs; // Return the previous state
      }

      updatedDiv.values[inputIndex] = newValue;

      const updatedDivs = [...prevDivs];
      updatedDivs[divToUpdateIndex] = updatedDiv;
      return updatedDivs;
    });

    const updatedSamplingTable = divs.map((divItem) => {
      // Obtiene el item correspondiente de divsSamplingTableInsp
      const originalItem = divsSamplingTableInsp.find(
        (item) => item.id === divItem.id
      );

      // Check if the originalItem exists and has the values property
      if (!originalItem || !originalItem.values) {
        console.error(
          `Original item not found or doesn't have values property for id: ${divItem.id}`
        );
        return null; // or handle this differently based on your application's needs
      }

      // Check if divItem has the values property
      if (!divItem.values) {
        console.error(
          `divItem doesn't have values property for id: ${divItem.id}`
        );
        return null; // or handle this differently
      }

      return {
        id: divItem.id,
        values: [
          originalItem.values[0], // id se mantiene igual
          divItem.values[3], // lote se sincroniza desde divs
          divItem.values[4], // serial se sincroniza desde divs
          divItem.values[5], // total insp se sincroniza desde divs
          divItem.values[6], // nuevo valor se sincroniza desde divs
          ...originalItem.values.slice(5), // El resto de los valores se mantienen sin cambios
        ],
      };
    });

    // Filter out any nulls (or whatever you chose as the placeholder for problematic items)
    const filteredUpdatedSamplingTable = updatedSamplingTable.filter(
      (item) => item !== null
    );

    setDivsSamplingTableInsp(filteredUpdatedSamplingTable);
  };

  useEffect(() => {
    //console.log(divs);
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

  const handleDate = (name, date, id, index) => {
    handleInputChange(id, index, date);
  };

  const handleDeleteRow = (index) => {
    setNumFilas((prev) => prev - 1);
    setDivs((prev) => prev.filter((d, i) => i !== index));
  };

  const handleEnter = useCallback((filaId, currentIndex) => {
    const nextInput = document.getElementById(
      `input-${filaId + 1}-${3}`
    );
    nextInput && nextInput.focus();
  }, []);

  return (
    <Table>
      <table>
        <thead>
          <tr>
            {titulosColumnas.map((titulo, i) =>
              i === 0 ? (
                <th key={i + "stThead"}>
                  <span className="btn-table-cont">
                    <i
                      className="fa-solid fa-trash"
                      onClick={
                        divs.length - 1 !== 0
                          ? () => handleDeleteRow(divs.length - 1)
                          : () => {
                              return;
                            }
                      }
                    ></i>
                    <i
                      className="fa-solid fa-circle-plus"
                      onClick={() => agregarFila(numColumnas)}
                    ></i>{" "}
                  </span>
                </th>
              ) : (
                <th key={i + "stThead"}>{titulo}</th>
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
        <tbody>
          {divs.map((fila, indexFilas) => (
            <tr key={fila.id}>
              {fila.values.map((valor, i) =>
                i === 0 || i === fila.values.length - 1 ? (
                  <td key={i + "stTbody"}>
                    {i === 0 &&
                      fila.id !== 1 &&
                      indexFilas === divs.length - 1 && <></>}
                    {i === fila.values.length - 1 &&
                      fila.values.length > 15 && (
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => eliminarColumna(fila.id)}
                        ></i>
                      )}
                  </td>
                ) : i === 1 ? (
                  <td key={i + "tbody"} className="table-center">
                    {fila.id}
                  </td>
                ) : (
                  <td key={i + "tbody"}>
                    {i === 2 ? (
                      <>
                        <DatePickerInput
                          id={fila.id}
                          name=""
                          index={i}
                          value={valor}
                          setDate={handleDate}
                        />
                      </>
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
