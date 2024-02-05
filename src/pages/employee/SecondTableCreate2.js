import React, { useEffect, useState } from "react";
import { Table } from "../../styles/Styles";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useTranslation } from "react-i18next";

export default function SecondTableCreate2({
  setTotalesDefectos,
  divs,
  setDivs,
}) {
  const { t } = useTranslation();
  const { setNumFilasReportByH } = useContext(MainContext);
  function handleAddDiv() {
    const newId = divs.length + 1;
    setNumFilasReportByH((prev) => prev + 1);
    const newValues = Array(15).fill("");
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
  }
  const handleDeleteRow = (index) => {
    setNumFilasReportByH((prev) => prev - 1);
    setDivs((prev) => prev.filter((d, i) => i !== index));
  };

  function handleInputChange(divId, inputIndex, newValue) {
    setDivs((prevDivs) => {
      // Busca el índice del objeto a actualizar en el array de divs basándose en el divId.
      const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
      // Crea una copia del objeto a actualizar usando el operador de propagación.
      const updatedDiv = { ...prevDivs[divToUpdateIndex] };

      // Guarda el valor antiguo de la celda antes de actualizarlo.
      const oldValue = Number(updatedDiv.values[inputIndex]) || 0;
      // Actualiza el valor en la celda correspondiente.
      updatedDiv.values[inputIndex] = newValue;

      // Guarda la suma antigua de la fila.
      const oldRowSum = Number(
        updatedDiv.values[updatedDiv.values.length - 1] || 0
      );
      // Calcula la diferencia entre el nuevo valor y el antiguo si ambos son números.
      const delta = !isNaN(newValue) ? Number(newValue) - oldValue : 0;
      // Actualiza la suma de la fila restando el valor antiguo y sumando el nuevo.
      updatedDiv.values[updatedDiv.values.length - 1] = oldRowSum + delta;

      // Crea una copia de la lista de divs, reemplaza el div actualizado y devuelve la nueva lista.
      const updatedDivs = [...prevDivs];
      updatedDivs[divToUpdateIndex] = updatedDiv;
      return updatedDivs;
    });
  }

  useEffect(() => {
    const totalIssues = divs.slice();
    if (totalIssues !== undefined && totalIssues.length > 0) {
      let colSum = totalIssues.reduce((total, row) => {
        row.values.forEach((value, i) => {
          // Utilizamos .slice(2) para excluir los dos primeros índices
          total[i] = total[i] + Number(value);
        });
        return total;
      }, Array(totalIssues[0].values.length).fill(0)); // Restamos 2 al largo inicial para que coincida con el nuevo tamaño de la fila
      setTotalesDefectos(colSum);
    }
    return () => {};
  }, [divs]);


  return (
    <Table>
      <table>
        <thead>
          <tr>
            <th>
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
                  onClick={handleAddDiv}
                ></i>
              </span>
            </th>
            <th>Item</th>
            <th>{t("Defecto")}</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8 </th>
            <th>9 </th>
            <th>10 </th>
            <th>11 </th>
            <th>12 </th>
            <th>Total </th>
          </tr>
        </thead>
        <tbody>
          {divs.map((div, i) => (
            <tr key={div.id}>
              <td></td>

              <td>{div.id}</td>

              <td>
                <input
                  value={div.values[1]}
                  onChange={(e) => handleInputChange(div.id, 1, e.target.value)}
                  style={{ minWidth: "300px" }}
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
                    handleInputChange(div.id, 13, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  defaultValue={div.values[14]}
                  readOnly
                  disabled
                  onChange={(e) => {
                    //  handleInputChange(div.id, 14, e.target.value)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </Table>
  );
}
