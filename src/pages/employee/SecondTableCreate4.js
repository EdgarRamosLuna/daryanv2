import React, { useState } from "react";
import { Table } from "../../styles/Styles";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SecondTableCreate4({divs, setDivs}) {
  const { setDivsSamplingTable } = useContext(MainContext);

  const { t } = useTranslation();

  function handleInputChange(divId, inputIndex, newValue) {
    setDivs((prevDivs) => {
      const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
      const updatedDiv = { ...prevDivs[divToUpdateIndex] };
      updatedDiv.values[inputIndex] = newValue;
      const updatedDivs = [...prevDivs];
      updatedDivs[divToUpdateIndex] = updatedDiv;
      return updatedDivs;
    });

    
  }
  useEffect(() => {
    if(divs.length > 0){      
      setDivsSamplingTable(divs)

    }    
  }, [divs])
  

  return (
    <Table>
      <table>
        <thead>
          <tr>
            <th>
              <i
                className="fa-solid fa-circle-plus"
                style={{ visibility: "hidden" }}
              ></i>
            </th>
            <th>Item</th>
            <th>{t('reports.batch_label')}</th>
            <th>{t('reports.series')}</th>
            <th>#{t('PZAS INSP')}</th>
            <th>#{t('PZAS MUESTREO')}</th>
            <th>{t('Hora')}</th>
            <th>{t('Firma')} </th>
          </tr>
        </thead>
        <tbody>
          {divs.map((div) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
}
