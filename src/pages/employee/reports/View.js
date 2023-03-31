import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { StyledForm, Table } from "../../../styles/Styles";
import DatePickerInput from "../../../components/DateInput";
import SecondTableCreate from "./SecondTableCreate";


const Create = () => {
  const [data, setData] = useState([]);
  const {
    numFilas,
    numColumnas,
    titulosColumnas,
    total1,
    divs,
    setDivs,
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
    dataToSave,
    setDataToSave,
  } = useContext(MainContext);
  //console.log(data);
  const [producedBy, setProducedBy] = useState("");
  const [checkedBy, setCheckedBy] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
 /* const handleSelect = (e, type) => {
    setData({
      ...data,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };*/
  const [divs2, setDivs2] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numFilas; i++) {
      filas.push({
        id: i,
        values: Array.from({ length: numColumnas - 3 }, () => ""),
      });
    }
    return filas;
  });

  const [reportFooter, setReportFooter] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numColumnas - 3; i++) {
      if (i > 7) {
        filas.push({
          id: i,
          values: Array.from({ length: 1 }, () => ""),
        });
      }
    }
    return filas;
  });
  const [reportFooter2, setReportFooter2] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numColumnas - 3; i++) {
      if (i > 7) {
        filas.push({
          id: i,
          values: Array.from({ length: 1 }, () => ""),
        });
      }
    }
    return filas;
  });
  const [reportFooter3, setReportFooter3] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numColumnas - 3; i++) {
      if (i > 7) {
        filas.push({
          id: i,
          values: Array.from({ length: 1 }, () => ""),
        });
      }
    }
    return filas;
  });
  /*console.log(reportFooter);
  console.log(reportFooter2);
  console.log(reportFooter3);*/
  const handleUpdate = (hanldeId = 1, divId, inputIndex, newValue) => {
    if (hanldeId === 1) {
      setReportFooter((prevDivs) => {
        const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
        const updatedDiv = { ...prevDivs[divToUpdateIndex] };
        updatedDiv.values[inputIndex] = newValue;
        const updatedDivs = [...prevDivs];
        updatedDivs[divToUpdateIndex] = updatedDiv;
        return updatedDivs;
      });
    }
    if (hanldeId === 2) {
      setReportFooter2((prevDivs) => {
        const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
        const updatedDiv = { ...prevDivs[divToUpdateIndex] };
        updatedDiv.values[inputIndex] = newValue;
        const updatedDivs = [...prevDivs];
        updatedDivs[divToUpdateIndex] = updatedDiv;
        return updatedDivs;
      });
    }
    if (hanldeId === 3) {
      setReportFooter3((prevDivs) => {
        const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
        const updatedDiv = { ...prevDivs[divToUpdateIndex] };
        updatedDiv.values[inputIndex] = newValue;
        const updatedDivs = [...prevDivs];
        updatedDivs[divToUpdateIndex] = updatedDiv;
        return updatedDivs;
      });
    }
  };

  const [serviceType, setServiceType] = useState([]);
  const [customerControl, setCustomerControl] = useState([]);
  //console.log(divs)
  useEffect(() => {
    setDivs2((prev) => {
      const filas = [];
      for (let i = 1; i <= numFilas; i++) {
        filas.push({
          id: i,
          values: Array.from({ length: numColumnas - 3 }, () => ""),
        });
      }
      return filas;
    });
    setReportFooter((prev) => {
      const filas = [];
      for (let i = 1; i <= numColumnas - 3; i++) {
        if (i > 7) {
          filas.push({
            id: i,
            values: Array.from({ length: 1 }, () => ""),
          });
        }
      }
      return filas;
    });
    setReportFooter2((prev) => {
      const filas = [];
      for (let i = 1; i <= numColumnas - 3; i++) {
        if (i > 7) {
          filas.push({
            id: i,
            values: Array.from({ length: 1 }, () => ""),
          });
        }
      }
      return filas;
    });
    setReportFooter3((prev) => {
      const filas = [];
      for (let i = 1; i <= numColumnas - 3; i++) {
        if (i > 7) {
          filas.push({
            id: i,
            values: Array.from({ length: 1 }, () => ""),
          });
        }
      }
      return filas;
    });

    return () => {};
  }, [numColumnas]);

  useEffect(() => {
    //console.log()
    const newArray = [
      {
        data: data,
        serviceType: serviceType,
        customerControl: customerControl,
        customerControlTable: divs,
        madeBy: reportFooter,
        observations: reportFooter2,
        incidents: reportFooter3,
        producedBy: producedBy,
        checkedBy: checkedBy,
        authorizedBy: authorizedBy
      },
    ];
    setDataToSave(newArray);
  }, [data, serviceType, customerControl, divs, reportFooter, reportFooter2, reportFooter3, producedBy, checkedBy, authorizedBy]);

  /*console.log(data);
  console.log(dataToSave)
  console.log(customerControl);*/
  //console.log(dataToSave)
  const [dumpValue, setDumpValue] = useState('');
  const handleDate = (name, date) =>{
    setData({
      ...data,
      [name]: date,
    })
  }
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>REPORTE DE INSPECCION</h3>
          <br />
        </div>
        <StyledForm>
          <div className="form-container">
            <label htmlFor="data">Planta:</label>
            <input
              type="text"
              id="data"
              name="plant"
              placeholder=""
              required
              value={data.plant}
              defaultValue=""
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data2">Proveedor:</label>
            <input
              type="text"
              id="data2"
              name="supplier"
              placeholder=""
              required
              defaultValue=""
              value={data.supplier}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data3">Fecha:</label>
            <DatePickerInput id="data3" name="date" value={data.date} setDate={handleDate} />
          </div>
          <div className="form-container">
            <label htmlFor="data4">No. de Reporte:</label>
            <input
              type="text"
              id="data4"
              name="report_number"
              placeholder=""
              required
              defaultValue=""
              value={data.report_number}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data5">Nombre de parte:</label>
            <input
              type="text"
              id="data5"
              name="part_name"
              placeholder=""
              required
              defaultValue=""
              value={data.part_name}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data6">Horas Trabajadas:</label>
            <input
              type="text"
              id="data6"
              name="worked_hours"
              placeholder=""
              required
              defaultValue=""
              value={data.worked_hours}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data7">Rate:</label>
            <input
              type="text"
              id="data7"
              name="rate"
              placeholder=""
              required
              defaultValue=""
              value={data.rate}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data8">Turno:</label>
            <select
              id="data8"
              name="shift"
              required
              defaultValue="0"
              value={data.shift}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            >
              <option value="0">Selecciona una opcion</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-container">
            <label htmlFor="data10">Numero de parte:</label>
            <input
              type="text"
              id="data10"
              name="part_number"
              placeholder=""
              required
              defaultValue=""
              value={data.part_number}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data8">Tipo de servicio:</label>

            <div className="container-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="st1"
                  defaultValue="1"
                  value={serviceType.st1}
                  onChange={(e) =>
                    setServiceType({
                      ...serviceType,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
                Selección
              </label>

              <label>
                <input
                  type="checkbox"
                  name="st2"
                  defaultValue="2"
                  value={serviceType.st2}
                  onChange={(e) =>
                    setServiceType({
                      ...serviceType,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
                Retrabajo
              </label>
              <label htmlFor=""> </label>
              <label htmlFor=""> </label>
              <label htmlFor=""> </label>
              <div className="others-container">
                <label>Otros</label>
                <input
                  type="text"
                  name="st3"
                  value={serviceType.st3}
                  onChange={(e) =>
                    setServiceType({
                      ...serviceType,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="data8">Control para el cliente:</label>

            <div className="container-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="cc1"
                  defaultValue="1"
                  value={customerControl.cc1}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
                Fecha de produccion
              </label>

              <label>
                <input
                  type="checkbox"
                  name="cc2"
                  defaultValue="2"
                  value={customerControl.cc2}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
                Fecha de aprobado
              </label>

              <label>
                <input
                  type="checkbox"
                  name="cc3"
                  defaultValue="3"
                  value={customerControl.cc3}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
                Serie
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cc4"
                  defaultValue="4"
                  value={customerControl.cc4}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
                Lote
              </label>
              <div className="others-container">
                <label>Otros</label>
                <input
                  type="text"
                  name="cc5"
                  value={customerControl.cc5}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*
        <label htmlFor="subject">Subject:</label>
        <select id="subject" name="subject">
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
        </select>

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          required
        ></textarea>*/}
        </StyledForm>
      </div>
      <div className="container c2">
        <SecondTableCreate />
      </div>

      <div className="container" style={{ overflowY: "scroll" }}>
        <Table>
          <table>
            <thead className="no-sticky">
              <tr>
                {titulosColumnas.map((titulo, i) =>
                  i === 0 || i === titulosColumnas.length - 1 ? (
                    <th key={i}>
                      <i
                        className="fa-solid fa-circle-plus"
                        style={{ color: "transparent" }}
                      ></i>
                    </th>
                  ) : (
                    <th key={i}>{titulo}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {divs2.map(
                (fila, i) =>
                  i === 0 && (
                    <tr key={fila.id} className="hidden">
                      {fila.values.map((valor, i) => (
                        <>
                          {i <= 1 || i === fila.values.length - 1 ? (
                            <td key={i} className="table-center">
                               
                            </td>
                          ) : (
                            <td key={i} className="table-center">
                              <input type="" name="" value={dumpValue} onChange={() => setDumpValue('')}  />
                            </td>
                          )}
                        </>
                      ))}
                    </tr>
                  )
              )}
            </tbody>
            <tfoot className="tfooter">
              {divs2.map(
                (fila, i) =>
                  i === 0 && (
                    <tr key={fila.id}>
                      {fila.values.map((valor, i) => (
                        <>
                          {i === 0 ||
                          i === 1 ||
                          i === fila.values.length - 1 ? (
                            <>
                              {i === 1 && (
                                <td
                                  key={i}
                                  className="table-center"
                                  colSpan={5}
                                >
                                  Totales
                                </td>
                              )}
                              {i === 0 && <></>}
                            </>
                          ) : (
                            <td key={i} className="table-center">
                              {i === 2 && <input value={total1} onChange={() => setDumpValue('')} />}
                              {i === 3 && <input value={total2} onChange={() => setDumpValue('')} />}
                              {i === 4 && <input value={total3} onChange={() => setDumpValue('')} />}
                              {i === 5 && <input value={total4} onChange={() => setDumpValue('')} />}
                              {i === 6 && <input value={total5} onChange={() => setDumpValue('')} />}
                              {i === 7 && <input value={total6} onChange={() => setDumpValue('')} />}
                              {i === 8 && <input value={total7} onChange={() => setDumpValue('')} />}
                              {i === 9 && <input value={total8} onChange={() => setDumpValue('')} />}
                              {i === 10 && <input value={total9} onChange={() => setDumpValue('')} />}
                              {i === 11 && <input value={total10} onChange={() => setDumpValue('')} />}
                              {i === 12 && <input value={total11} onChange={() => setDumpValue('')} />}
                              {i === 13 && <input value={total12} onChange={() => setDumpValue('')} />}
                              {i === 14 && <input value={total13} onChange={() => setDumpValue('')} />}
                              {i === 15 && <input value={total14} onChange={() => setDumpValue('')} />}
                            </td>
                          )}
                        </>
                      ))}
                    </tr>
                  )
              )}
              <tr>
                <td colSpan={numColumnas / 3} style={{ textAlign: "center" }}>
                  <div>REALIZO</div>
                  {reportFooter.map(
                    (fila, i) =>
                      i < reportFooter.length - 1 &&
                      fila.values.map((valor, i) => (
                        <>
                          <input
                            value={valor}
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
                <td colSpan={(numColumnas / 3) > 6 ? 5: numColumnas / 3} style={{ textAlign: "center" }}>
                  <div>OBSERVACIONES</div>
                  {reportFooter2.map(
                    (fila, j) =>
                      j < reportFooter2.length - 1 &&
                      fila.values.map((valor, i) => (
                        <>
                          <input
                            value={valor}
                            onChange={(e) =>
                              handleUpdate(2, fila.id, i, e.target.value)
                            }
                            key={i}
                          />{" "}
                          <br />
                        </>
                      ))
                  )}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  <div> </div>
                  {divs2.map(
                    (fila, i) =>
                      i === 0 &&
                      fila.values.map(
                        (valor, i) =>
                          i > 6 && (
                            <>
                              {i === 8 && (
                                <>
                                  <input
                                    placeholder="A"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 9 && (
                                <>
                                  <input
                                    placeholder="B"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 10 && (
                                <>
                                  <input
                                    placeholder="C"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 11 && (
                                <>
                                  <input
                                    placeholder="D"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 12 && (
                                <>
                                  <input
                                    placeholder="E"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 13 && (
                                <>
                                  <input
                                    placeholder="F"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 14 && (
                                <>
                                  <input
                                    placeholder="G"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 15 && (
                                <>
                                  <input
                                    placeholder="H"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 16 && (
                                <>
                                  <input
                                    placeholder="I"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue} onChange={() => setDumpValue('')}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                            </>
                          )
                      )
                  )}
                </td>
                <td colSpan={numColumnas / 3} style={{ textAlign: "center" }}>
                  <div>INCIDENTES</div>
                  {reportFooter3.map(
                    (fila, i) =>
                      i < reportFooter3.length - 1 &&
                      fila.values.map((valor, i) => (
                        <>
                          <input
                            value={valor}
                            onChange={(e) =>
                              handleUpdate(3, fila.id, i, e.target.value)
                            }
                            key={i}
                          />{" "}
                          <br />
                        </>
                      ))
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={1}></td>
                <td colSpan={numColumnas / 4} style={{ textAlign: "center" }}>
                  <div>ELABORO</div>
                  <div className="firm">
                    <input
                      type=""
                      name=""
                      value={producedBy}
                      onChange={(e) => setProducedBy(e.target.value)}
                      className="firm-input"
                    />
                  </div>
                </td>
                <td colSpan={1}></td>
                <td colSpan={numColumnas / 4} style={{ textAlign: "center" }}>
                  <div>REVISO</div>
                  <div className="firm">
                    <input
                      type=""
                      name=""
                      value={checkedBy}
                      onChange={(e) => setCheckedBy(e.target.value)}
                      className="firm-input"
                    />
                  </div>
                </td>
                <td colSpan={1}></td>
                <td colSpan={numColumnas / 4} style={{ textAlign: "center" }}>
                  <div>AUTORIZO</div>
                  <div className="firm">
                    <input
                      type=""
                      name=""
                      value={authorizedBy}
                      onChange={(e) => setAuthorizedBy(e.target.value)}
                      className="firm-input"
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </Table>
      </div>
    </>
  );
};

export default Create;
