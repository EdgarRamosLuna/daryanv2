import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { Table } from "../../styles/Styles";
import DatePickerInput from "../../components/DateInput";

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
  //console.log(total1);
  //const [first, setfirst] = useState(second)
  const [data, setData] = useState([]);
  const handleDate = (name, date, id, index) => {
    handleInputChange(id, index, date);
  };
  const currentDateInSeconds = Math.floor(Date.now() / 1000);
  const min = 1000000;
  const max = 9000000;

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

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
                    {i === 2 ? (
                      <DatePickerInput
                        id={fila.id}
                        name=""
                        index={i}
                        value={valor}
                        setDate={handleDate}
                      />
                    ) : (
                      <>
                        {i >= 3 && i <= 4 ? (
                          <input
                            
                            value={valor}
                            onChange={(e) =>
                              handleInputChange(fila.id, i, e.target.value)
                            }
                          />
                        ) : (
                          <input
                            value={valor}
                            onChange={(e) =>
                              handleInputChange(fila.id, i, e.target.value)
                            }
                          />
                        )}
                      </>
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
