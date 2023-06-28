import React, { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { Table } from "../../../styles/Styles";

import { useRef } from "react";
import DatePickerInputU from "../../../components/DateInputUpdate";
import useThClick from "./useThClick";

export default function SecondTableCreate({
  dataC,
  eliminarColumna2,
  agregarColumna,
  divs,
  setDivs,
  agregarFila,
  eliminarFila,
  numFilas2,
  numColumnas2
}) {
  const {
    numColumnas,
    titulosColumnas,
    formattedDate,
  } = useContext(MainContext);

  //console.log(numColumnas);

  //console.log(numColumnas);

  /*function handleAddDiv() {
    const newId = divs.length + 1;
    const newValues = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    setDivs([...divs, { id: newId, values: newValues }]);
    const tableWrapper = document.querySelector(".c2");
    const scrollHeight = tableWrapper.scrollHeight;
    const clientHeight = tableWrapper.clientHeight;
    if (scrollHeight > clientHeight) {
      //tableWrapper.scrollTop = scrollHeight - clientHeight;
      setTimeout(() => {
        tableWrapper.scrollTo({ top: scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }*/
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

  useEffect(() => {    
    setDivs((prev) => {
      const filas = [];
      for (let i = 1; i <= numFilas2; i++) {
        filas.push({
          id: i,
          values: Array.from({ length: numColumnas2 }, () => ""),
          // test:'aaaa'
        });
      }
      for (let j = 0; j < filas.length; j++) {
        const fil = filas[j];
        const values = fil.values;
        
        //const keys = Object.keys(dataC.reports_cc[j])
        if (dataC.reports_cc && dataC.reports_cc[j]) {
          const keys = Object.keys(dataC.reports_cc[j]);
          for (let k = 0; k < values.length; k++) {
            switch (k) {
              case 0:
                values[k] = dataC.reports_cc[j][keys[k]];
                break;
              case 1:
                values[k] = dataC.reports_cc[j][keys[k + 1]];
                break;
              case 2:
                const date = dataC.reports_cc[j][keys[k + 1]];
                const fdate = formattedDate(date);
                values[k] = fdate;
                break;
              case 10:
                values[k] = dataC.reports_cc[j]["A"];
                break;
              case 11:
                values[k] = dataC.reports_cc[j]["B"];
                break;
              case 12:
                values[k] = dataC.reports_cc[j]["C"];
                break;
              case 13:
                values[k] = dataC.reports_cc[j]["D"];
                break;
              case 14:
                values[k] = dataC.reports_cc[j]["E"]
                  ? dataC.reports_cc[j]["E"]
                  : "";
                break;
              case 15:
                values[k] = dataC.reports_cc[j]["F"]
                  ? dataC.reports_cc[j]["F"]
                  : "";
                break;
              case 16:
                values[k] = dataC.reports_cc[j]["G"]
                  ? dataC.reports_cc[j]["G"]
                  : "";
                break;
              case 17:
                values[k] = dataC.reports_cc[j]["H"]
                  ? dataC.reports_cc[j]["H"]
                  : "";
                break;
              case 18:
                values[k] = dataC.reports_cc[j]["I"]
                  ? dataC.reports_cc[j]["I"]
                  : "";
                break;
              default:
                values[k] = dataC.reports_cc[j][keys[k + 1]];
                break;
            }
            // if (k === 0) {
            //   //values[k] = dataC.reports_cc[j]['item']
          //   
          //   
            // }
          }
        }
      
      }      
      return filas;
    });
   
  }, [numFilas2, numColumnas2]);
  console.log(divs);
  //const [first, setfirst] = useState(second)
  const [data, setData] = useState([]);
  const [isEClause, setIsEClause] = useState(false);
  const handleDate = (name, date, id, index) => {
    handleInputChange(id, index, date);
  };
  const btnRef = useRef(null);
  const clauses = Number(dataC.report_in.length);
  // useEffect(() => {
  //   for (let p = 0; p < clauses; p++) {
  //     if (p === 2) {
  //       //const updatedState = [...titulosColumnas];
  //       //updatedState[14] = 'E';
  //       //setTitulosColumnas(updatedState);
  //     }
  //     if (p === 3) {
  //       setIsEClause(true);
  //     }
  //     if (p > 3) {
  //       //agregarColumna2();
  //       if (numColumnas < 20) {
  //         agregarColumna2()
  //         // setNumColumnas((prev) => prev + 1);
  //         // setTitulosColumnas((prevTitulos) => {
  //         //   const nextLetter = getNextLetter(prevTitulos);
  //         //   setDbColumns((prev) => [...prev, nextLetter]);
  //         //   //   console.log(nextLetter);
  //         //   const newArr = [...prevTitulos, nextLetter];
  //         //   const arrayCopy = newArr.slice();
  //         //   const penultimate = arrayCopy.slice(-2, -1)[0];
  //         //   // arrayCopy.splice(-2, 1);
  //         //   // arrayCopy.push(penultimate);
  //         //   // const tableWrapper = document.querySelectorAll(".scrollX");

  //         //   // tableWrapper.forEach((element) => {
  //         //   //   const scrollWidth = element.scrollWidth;
  //         //   //   const clientWidth = element.clientWidth;
  //         //   //   if (scrollWidth >= clientWidth) {
  //         //   //     setTimeout(() => {
  //         //   //       element.scrollLeft = scrollWidth;
  //         //   //     }, 200);
  //         //   //   }
  //         //   // });

  //         //   return arrayCopy;
  //         // });
  //       }
  //     }
  //   }
  // }, []);

  //console.log(divs);
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const formattedDateTime = `${year}-${month}-${day}`;
  const btnDelIncRef = useRef(null);
  const [currentThText, previousThText, handleClick] = useThClick(eliminarColumna2);
  
  //console.log(previousThText);
  return (
    <Table>
      <table >
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
            {/* {titulosColumnas.map((titulo, i) => (
              <th>{titulo}</th>
            ))}
            {titulosColumnas.at(-1) !== "I" && (
              <th>
                <i
                  ref={btnRef}
                  className="fa-solid fa-circle-plus"
                  onClick={agregarColumna}
                ></i>
              </th>
            )} */}
            {/* {titulosColumnas.map((titulo, i) =>
              i === 0 ? (
                <th key={i}>
                  <i
                    ref={btnRef}
                    className="fa-solid fa-circle-plus"
                    onClick={() => agregarFila(numColumnas, formattedDateTime)}
                  ></i>
                </th>
              ) : titulosColumnas.length > 15 && i === 14 ? (
                <th key={i}>E</th>
              ) : (
                <th key={i}>{titulo}</th>
              )
            )} */}
            {/*<th>
              <i className="fa-solid fa-circle-plus" onClick={handleAddDiv}></i>
            </th>
            <th>Item</th>
            <th>Fecha</th>
            <th>Lote</th>
            <th>Serie</th>
            <th>Cantidad Inspeccionada</th>
            <th>Piezas NG:</th>
            <th>Piezas Ok:</th>
            <th>Piezas Retrabajadas:</th>
            <th>Scrap:</th>
            <th>A </th>
            <th>B </th>
            <th>C </th>
            <th>D </th>
            <th>E </th>
            <th><i className="fa-solid fa-circle-plus" onClick={agregarColumna}></i></th>
            */}
          </tr>
        </thead>
        <tbody onClick={handleClick}>
          {divs.map((fila) => (
            <tr key={fila.id}>
              {fila.values.map((valor, i) =>
                i === 0 || i === fila.values.length - 1 ? (
                  <>
                    {i === 0 && fila.id !== 1 ? (
                      <td>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => eliminarFila(fila.id, valor)}
                        ></i>
                      </td>
                    ) : (
                      i === 0 && fila.id === 1 && <td></td>
                    )}

                    {i === fila.values.length - 1 &&
                      fila.values.length > 15 && (
                        <td className="fa-solid fa-trash" style={{display:'table-cell', verticalAlign:'middle'}} />
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
                      <input
                        value={valor}
                        onChange={(e) =>
                          handleInputChange(fila.id, i, e.target.value)
                        }
                      />
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
          {/*divs.map((div) => (
            <tr key={div.id}>
              <td></td>

              <td>{div.id}</td>

              <td>
                <input
                  value={div.values[1]}
                  onChange={(e) => handleInputChange(div.id, 1, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[2]}
                  onChange={(e) => handleInputChange(div.id, 2, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[3]}
                  onChange={(e) => handleInputChange(div.id, 3, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[4]}
                  onChange={(e) => handleInputChange(div.id, 4, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[5]}
                  onChange={(e) => handleInputChange(div.id, 5, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[6]}
                  onChange={(e) => handleInputChange(div.id, 6, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[7]}
                  onChange={(e) => handleInputChange(div.id, 7, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[8]}
                  onChange={(e) => handleInputChange(div.id, 8, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[9]}
                  onChange={(e) => handleInputChange(div.id, 9, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[10]}
                  onChange={(e) =>
                    handleInputChange(div.id, 10, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={div.values[11]}
                  onChange={(e) =>
                    handleInputChange(div.id, 11, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={div.values[12]}
                  onChange={(e) =>
                    handleInputChange(div.id, 12, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={div.values[13]}
                  onChange={(e) =>
                    handleInputChange(div.id, 12, e.target.value)
                  }
                />
              </td>
            </tr>
          ))*/}
        </tbody>
      </table>
    </Table>
  );
}
