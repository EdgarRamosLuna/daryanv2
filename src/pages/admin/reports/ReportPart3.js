import React, { useContext } from "react";
import { Table } from "../../../styles/Styles";
import { LanguageContext } from "../../../context/LanguageContext";
import Incidents from "./Incidents";

const ReportPart3 = ({
  reportFooter2,
  divs2,
  dumpValue,
  optionClause,
  numColumnas,
  reportFooter3,
  handleUpdate,
  reportIncidents,
  producedBy,
  checkedBy,
  dataSes,
  setAuthorizedBy,
  authorizedBy,
  container2Ref,
  handleScroll2,
  titulosColumnas,
  divs,
  total1,
  setTotal1,
  total2,
  setTotal2,
  total3,
  setTotal3,
  total4,
  setTotal4,
  total5,
  setTotal5,
  total6,
  setTotal6,
  total7,
  setTotal7,
  total8,
  setTotal8,
  total9,
  setTotal9,
  total10,
  setTotal10,
  total11,
  setTotal11,
  total12,
  setTotal12,
  total13,
  setTotal13,
  total14,
  setTotal14,
  reportFooter,
  setProducedBy,
  setCheckedBy,
}) => {
  const { t } = useContext(LanguageContext);
  return (
    <div
      className="container scrollX c2"
      ref={container2Ref}
      onScroll={handleScroll2}
      style={{ overflow: "scroll", height: "auto" }}
    >
      <Table>
        <table>
          <thead className="no-sticky">
            <tr>
              {titulosColumnas.map((titulo, i) =>
                i === 0 || i === titulosColumnas.length - 1 ? (
                  <th key={i + "thead"}>
                    <i
                      className="fa-solid fa-circle-plus"
                      style={{ color: "transparent" }}
                    ></i>
                  </th>
                ) : (
                  <th key={i + "thead"}>{titulo}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {divs.map(
              (fila, i) =>
                i === 0 && (
                  <tr key={fila.id} className="hidden">
                    {fila.values.map((valor, i) => (
                      <td key={i + "tbody"} className="table-center">
                        {i <= 1 || i === fila.values.length - 1 ? (
                          <>
                            <i
                              className="fa-solid fa-circle-plus"
                              style={{ visibility: "hidden" }}
                            ></i>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              name=""
                              defaultValue={dumpValue}
                            />
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                )
            )}
          </tbody>
          <tfoot className="tfooter">
            {divs2.map(
              (fila, i) =>
                i === 0 && (
                  <tr key={fila.id + "tfoot"}>
                    {fila.values.map(
                      (valor, i) =>
                        i > 0 && (
                          <td
                            colSpan={i === 1 ? "5" : ""}
                            key={i + "tfoot1"}
                            className={i === 1 ? "table-center" : ""}
                          >
                            {i === 0 ||
                            i === 1 ||
                            i === fila.values.length - 1 ? (
                              <>
                                {i === 1 && <>Totales</>}
                                {i === 0 && <></>}
                              </>
                            ) : (
                              <>
                                {i === 2 && (
                                  <input
                                    value={total1}
                                    onChange={(e) => setTotal1(e.target.value)}
                                  />
                                )}
                                {i === 3 && (
                                  <input
                                    value={total2}
                                    onChange={(e) => setTotal2(e.target.value)}
                                  />
                                )}
                                {i === 4 && (
                                  <input
                                    value={total3}
                                    onChange={(e) => setTotal3(e.target.value)}
                                  />
                                )}
                                {i === 5 && (
                                  <input
                                    value={total4}
                                    onChange={(e) => setTotal4(e.target.value)}
                                  />
                                )}
                                {i === 6 && (
                                  <input
                                    value={total5}
                                    onChange={(e) => setTotal5(e.target.value)}
                                  />
                                )}
                                {i === 7 && (
                                  <input
                                    value={total6}
                                    onChange={(e) => setTotal6(e.target.value)}
                                  />
                                )}
                                {i === 8 && (
                                  <input
                                    value={total7}
                                    onChange={(e) => setTotal7(e.target.value)}
                                  />
                                )}
                                {i === 9 && (
                                  <input
                                    value={total8}
                                    onChange={(e) => setTotal8(e.target.value)}
                                  />
                                )}
                                {i === 10 && (
                                  <input
                                    value={total9}
                                    onChange={(e) => setTotal9(e.target.value)}
                                  />
                                )}
                                {i === 11 && (
                                  <input
                                    value={total10}
                                    onChange={(e) => setTotal10(e.target.value)}
                                  />
                                )}
                                {i === 12 && (
                                  <input
                                    value={total11}
                                    onChange={(e) => setTotal11(e.target.value)}
                                  />
                                )}
                                {i === 13 && (
                                  <input
                                    value={total12}
                                    onChange={(e) => setTotal12(e.target.value)}
                                  />
                                )}
                                {i === 14 && (
                                  <input
                                    value={total13}
                                    onChange={(e) => setTotal13(e.target.value)}
                                  />
                                )}
                                {i === 15 && (
                                  <input
                                    value={total14}
                                    onChange={(e) => setTotal14(e.target.value)}
                                  />
                                )}
                              </>
                            )}
                          </td>
                        )
                    )}
                  </tr>
                )
            )}
            <tr>
              <td colSpan={numColumnas / 3} style={{ textAlign: "center" }}>
                <div>{t("reports.performed_by_label")}</div>
                {reportFooter.map(
                  (fila, i) =>
                    i < reportFooter.length &&
                    fila.values.map((valor, i) => (
                      <>
                        <input
                          value={valor}
                          type="text"
                          onChange={(e) =>
                            handleUpdate(1, fila.id, i, e.target.value)
                          }
                          key={i}
                        />{" "}
                        <br />
                      </>
                    ))
                )}
              </td>
              <td colSpan={numColumnas / 3} style={{ textAlign: "center" }}>
                <div>{t("reports.observations_label")}</div>
                {reportFooter2.map(
                  (fila, j) =>
                    j < reportFooter2.length &&
                    fila.values.map((valor, i) => (
                      <>
                        <input
                          value={valor}
                          type="text"
                          onChange={(e) =>
                            handleUpdate(2, fila.id, i, e.target.value)
                          }
                          key={i}
                        />
                        <br />
                      </>
                    ))
                )}
              </td>
              <Incidents
                divs2={divs2}
                dumpValue={dumpValue}
                optionClause={optionClause}
                numColumnas={numColumnas}
                reportFooter3={reportFooter3}
                handleUpdate={handleUpdate}
                reportIncidents={reportIncidents}
              />
            </tr>
            <tr>
              <td colSpan={numColumnas / 3} style={{ textAlign: "center" }}>
                <div>
                  {t("reports.prepared_by_label")}{" "}
                  <span className="required">*</span>
                </div>
                <div className="firm">
                  <input
                    type="text"
                    name=""
                    value={producedBy}
                    onChange={(e) => setProducedBy(e.target.value)}
                    className="firm-input"
                  />
                </div>
              </td>

              <td colSpan={numColumnas / 3} style={{ textAlign: "center" }}>
                <div>
                  {t("reports.reviewed_by_label")}{" "}
                  <span className="required">*</span>
                </div>
                <div className="firm">
                  <input
                    type="text"
                    name=""
                    value={checkedBy}
                    onChange={(e) => setCheckedBy(e.target.value)}
                    className="firm-input"
                  />
                </div>
              </td>

              <td colSpan={numColumnas / 3} style={{ textAlign: "center" }}>
                <div>{t("reports.authorized_by_label")}</div>
                <div className="firm">
                  <input
                    type="text"
                    name=""
                    readOnly={
                      ["admin"].includes(dataSes.toLowerCase()) ? false : true
                    }
                    disabled={
                      ["admin"].includes(dataSes.toLowerCase()) ? false : true
                    }
                    onChange={
                      ["admin"].includes(dataSes.toLowerCase())
                        ? (e) => setAuthorizedBy(e.target.value)
                        : () => {
                            return;
                          }
                    }
                    value={authorizedBy}
                    className="firm-input"
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </Table>
    </div>
  );
};

export default ReportPart3;
