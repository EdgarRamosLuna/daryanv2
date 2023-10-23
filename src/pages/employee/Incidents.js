import React, { useEffect, useState } from "react";
import SelectCustom from "./Select";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";
import CustomInputTootip from "./utils/CustomInputTootip";

const Incidents = ({
  divs2,
  dumpValue,
  optionClause,
  numColumnas,
  reportFooter3,
  handleUpdate,
  reportIncidents,
}) => {
  const { t } = useTranslation();
  const { InfoIcon, incType, ABECEDARIO } = useContext(MainContext);

  const [aIncidents, setAIncidents] = useState(0);
  const [incidents, setIncidents] = useState([]);
  useEffect(() => {
    if (incType.length > 0) {
      //setAIncidents(incType.filter(incident => incident.clause === 'A').length);

      setAIncidents(aIncidents);
      const bIncidents = incType.filter(
        (incident) => incident.clause === "B"
      ).length;
      const newAbc = ABECEDARIO.slice(0, 9);

      const cObj = {};
      const oIncidents = {};
      for (let index = 0; index < newAbc.length; index++) {
        const clause = newAbc[index];
        const aInc = incType.filter(
          (incident) => incident.clause === clause
        ).length;
        cObj[clause] = aInc;
      }

      Object.keys(cObj).forEach((clause) => {
        const count = cObj[clause];
        if (count > 0) {
          oIncidents[clause] = count;
        }
      });

      setIncidents(oIncidents);
    }
  }, [incType]);
  const sA = "A";
  const sB = "B";
  const sC = "C";
  const sD = "D";
  const sE = "E";
  const sF = "F";
  const sG = "G";
  const sH = "H";
  const sI = "I";

  const incidentLabels = {
    1: "Mal",
    2: "Re trabajo",
    3: "Scrap",
  };
  return (
    <>
      <td colSpan={1} style={{ textAlign: "center" }}>
        <div> </div>
        {divs2.map(
          (fila, j) =>
            j === 0 && (
              <div key={j + "clauses"}>
                {fila.values.map(
                  (valor, i) =>
                    i > 6 && (
                      <div key={`clause${i}`}>
                        {i === 8 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sA}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 9 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sB}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 10 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sC}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 11 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sD}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 12 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sE}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 13 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sF}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 14 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sG}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 15 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sH}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                        {i === 16 && (
                          <>
                            <CustomInputTootip
                              incType={incType}
                              sClause={sI}
                              incidentLabels={incidentLabels}
                              incidents={incidents}
                              dumpValue={dumpValue}
                            />
                            <br />
                          </>
                        )}
                      </div>
                    )
                )}
              </div>
            )
        )}
      </td>
      <td colSpan={1} style={{ textAlign: "center" }}>
        <div> </div>
        {divs2.map(
          (fila, k) =>
            k === 0 && (
              <div key={k + "clausesSelects"}>
                {fila.values.map(
                  (valor, i) =>
                    i > 6 && (
                      <div key={`clausesSelect${i}`}>
                        {i === 8 && (
                          <>
                            <SelectCustom data={optionClause} clause="A" />

                            <br />
                          </>
                        )}
                        {i === 9 && (
                          <>
                            <SelectCustom data={optionClause} clause="B" />

                            <br />
                          </>
                        )}
                        {i === 10 && (
                          <>
                            <SelectCustom data={optionClause} clause="C" />
                            <br />
                          </>
                        )}
                        {i === 11 && (
                          <>
                            <SelectCustom data={optionClause} clause="D" />
                            <br />
                          </>
                        )}
                        {i === 12 && (
                          <>
                            <SelectCustom data={optionClause} clause="E" />
                            <br />
                          </>
                        )}
                        {i === 13 && (
                          <>
                            <SelectCustom data={optionClause} clause="F" />
                            <br />
                          </>
                        )}
                        {i === 14 && (
                          <>
                            <SelectCustom data={optionClause} clause="G" />
                            <br />
                          </>
                        )}
                        {i === 15 && (
                          <>
                            <SelectCustom data={optionClause} clause="H" />
                            <br />
                          </>
                        )}
                        {i === 16 && (
                          <>
                            <SelectCustom data={optionClause} clause="I" />
                            <br />
                          </>
                        )}
                      </div>
                    )
                )}
              </div>
            )
        )}
      </td>
      <td
        colSpan={numColumnas > 15 ? numColumnas / 4 : 3}
        style={{ textAlign: "center" }}
      >
        <div>
          {t("reports.incidents_label")} <span className="required">*</span>
        </div>
        {reportFooter3.map(
          (fila, p) =>
            p < reportFooter3.length - 1 && (
              <div key={p + "incidentes"}>
                {fila.values.map((valor, i) => (
                  <div key={valor + "incidente"}>
                    <select
                      value={valor}
                      onChange={(e) =>
                        handleUpdate(3, fila.id, i, e.target.value)
                      }
                    >
                      <option value="0">Incidente</option>
                      {reportIncidents.map((item, i) => {
                        return (
                          <option value={item.id_incident} key={`optionIncident${i}`}>
                            {item.code} - {item.incident}
                          </option>
                        );
                      })}
                    </select>

                    <br />
                  </div>
                ))}
              </div>
            )
        )}
      </td>
    </>
  );
};

export default Incidents;
