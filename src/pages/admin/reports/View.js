import React, { useContext, useState } from "react";
import Select from "../../../components/Select";
import { MainContext } from "../../../context/MainContext";
import { StyledForm, Table } from "../../../styles/Styles";

import SecondTableCreate from "./SecondTableCreate";
const View = () => {
  const { data, setData } = useContext(MainContext);
  //console.log(data);

  const handleSelect = (e, type) => {
    setData({
      ...data,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
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
              name="data"
              placeholder=""
              required
              value={data.data}
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
              name="data2"
              placeholder=""
              required
              value={data.data2}
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
            <input
              type="text"
              id="data3"
              name="data3"
              placeholder=""
              required
              value={data.data3}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data4">No. de Reporte:</label>
            <input
              type="text"
              id="data4"
              name="data4"
              placeholder=""
              required
              value={data.data4}
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
              name="data5"
              placeholder=""
              required
              value={data.data5}
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
              name="data6"
              placeholder=""
              required
              value={data.data6}
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
              name="data7"
              placeholder=""
              required
              value={data.data7}
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
              name="data8"
              required
              value={data.data8}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            >
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
              name="data10"
              placeholder=""
              required
              value={data.data10}
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
                <input type="checkbox" name="fruit[]" value="apple" />
                Selección
              </label>
            
              <label>
                <input type="checkbox" name="fruit[]" value="banana" />
                Retrabajo
              </label>
            
              <label>
                <input type="checkbox" name="fruit[]" value="orange" />
                Otros
              </label>
            </div>
          </div>
          
          <div className="form-container">
            <label htmlFor="data8">Control para el cliente:</label>

            <div className="container-checkbox">
            <label>
                <input type="checkbox" name="" value="apple" />
                Fecha de produccion
              </label>
            
              <label>
                <input type="checkbox" name="" value="banana" />
                Fecha de aprobado
              </label>
            
              <label>
                <input type="checkbox" name="" value="orange" />
                Serie
              </label>
              <label>
                <input type="checkbox" name="" value="orange" />
                Lote
              </label>
              <label>
                <input type="checkbox" name="" value="orange" />
                Otros
              </label>
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

      <div className="container" style={{overflowY:'scroll'}}>
        <Table>
          <table>
            <thead className="no-sticky">
              <tr>
                <th>
                  <i
                    className="fa-solid fa-circle-plus"
                    style={{ color: "transparent" }}
                  ></i>
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
              </tr>
            </thead>
            <tbody>
              <tr className="hidden">
                <td> </td>
                <td> </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
              </tr>
            </tbody>
            <tfoot className="tfooter">
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Totales
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <div>REALIZO</div>
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                </td>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <div>OBSERVACIONES</div>
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  <div> </div>
                  <input
                    type="text"
                    placeholder="A"
                    readOnly
                    style={{ textAlign: "center" }}
                  />{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="B"
                    readOnly
                    style={{ textAlign: "center" }}
                  />{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="C"
                    readOnly
                    style={{ textAlign: "center" }}
                  />{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="D"
                    readOnly
                    style={{ textAlign: "center" }}
                  />{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="E"
                    readOnly
                    style={{ textAlign: "center" }}
                  />{" "}
                  <br />
                </td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  <div>INCIDENTES</div>
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                  <input type="text" /> <br />
                </td>
              </tr>
              <tr>
                <td colSpan={1}></td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  <div>ELABORO</div>
                  <div className="firm">
                    <input type="" name="" value="" className="firm-input" />
                  </div>
                </td>
                <td colSpan={1}></td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  <div>REVISO</div>
                  <div className="firm">
                    <input type="" name="" value="" className="firm-input" />
                  </div>
                </td>
                <td colSpan={1}></td>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  <div>AUTORIZO</div>
                  <div className="firm">
                    <input type="" name="" value="" className="firm-input" />
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

export default View;
