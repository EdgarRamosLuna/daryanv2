import React, { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { StyledForm, Table } from "../../styles/Styles";

import SecondTableCreate from "./SecondTableCreate";
import SecondTableCreate2 from "./SecondTableCreate2";
import { useEffect } from "react";
import DatePickerInput from "../../components/DateInput";


const Create2 = () => {
  const { dataReportH, setDataReportH } = useContext(MainContext);
  //console.log(data);
  const [data, setData] = useState([]);
  const [divs, setDivs] = useState([
    { id: 1, values: Array(12).fill("") },
    // { id: 2, values: Array(15).fill("") },
    // { id: 3, values: Array(15).fill("") },
    // { id: 4, values: Array(15).fill("") },
    // { id: 5, values: Array(15).fill("") },
    // { id: 6, values: Array(15).fill("") },
    // { id: 7, values: Array(15).fill("") },
    // { id: 8, values: Array(15).fill("") },
    // { id: 9, values: Array(15).fill("") },
    // { id: 10, values: Array(15).fill("") },
    // { id: 11, values: Array(15).fill("") },
    // { id: 12, values: Array(15).fill("") },
    // { id: 13, values: Array(15).fill("") },
    // { id: 14, values: Array(15).fill("") },
    // { id: 15, values: Array(15).fill("") },
    // { id: 16, values: Array(15).fill("") },
    // { id: 17, values: Array(15).fill("") },
    // { id: 18, values: Array(15).fill("") },
    // { id: 19, values: Array(15).fill("") },
    // { id: 20, values: Array(15).fill("") },
  ]);

  const handleSelect = (e, type) => {
    setData({
      ...data,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
  const [totalesDefectos, setTotalesDefectos] = useState([]);
  const [totalesD, setTotalesD] = useState([]);
  useEffect(() => {
    if (totalesDefectos !== undefined && totalesDefectos) {
      setTotalesD(totalesDefectos.slice(2));
    }
  }, [totalesDefectos]);

  const [inspectors, setInspectors] = useState(Array(5).fill(""));
  const handleInputChangeInsp = (index, event) => {
    const newInspectors = [...inspectors];
    newInspectors[index] = event.target.value;
    setInspectors(newInspectors);
  };
  const [comments, setComments] = useState(Array(5).fill(""));
  const handleInputChangeComm = (index, event) => {
    const newComments = [...comments];
    newComments[index] = event.target.value;
    setComments(newComments);
  };
  const [totalPiecesInsp, setTotalPiecesInsp] = useState(Array(13).fill(""));
  const handleInputChangeTotalPieInsp = (index, event) => {
    const newTotalPiecesInsp = [...totalPiecesInsp];
    newTotalPiecesInsp[index] = Number(event.target.value);  // Convertir a número
  
    // Sumar todos los valores menos el último
    const sum = newTotalPiecesInsp.slice(0, -1).reduce((a, b) => a + b, 0);
  
    // Poner la suma en el último índice
    newTotalPiecesInsp[newTotalPiecesInsp.length - 1] = sum;
  
    setTotalPiecesInsp(newTotalPiecesInsp);
  };
  const [inspectedBy, setInspectedBy] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");



  useEffect(() => {
    const newArray = [
      {
        reportP1: data,
        reportP2: divs,
        inspectors,
        comments,
        inspectedBy,
        authorizedBy,
        totalDefects:totalesD,
        totalPieces:totalPiecesInsp
      },
    ];
    setDataReportH(newArray);
  }, [data, inspectors, comments, inspectedBy, authorizedBy, totalesD, divs, totalPiecesInsp]);
  //console.log(dataReportH)
  const handleDate = (name, date) => {
    setData({
      ...data,
      [name]: date,
    });
  };
  //console.log(data.shift);
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>REPORTE POR HORASs</h3>
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
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data2">Numero de parte:</label>
            <input
              type="text"
              id="data2"
              name="part_number"
              placeholder=""
              required
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
            <label htmlFor="data3">Fecha:</label>
            <DatePickerInput
              id="data3"
              name="date"
              style={{ textAlign: "left", padding: "12px 20px" }}
              value={data.date}
              setDate={handleDate}
              type="text"
            />
          </div>
          <div className="form-container">
            <label htmlFor="data4">No. de Reporte:</label>
            <input
              type="text"
              id="data4"
              name="report_number"
              placeholder=""
              required
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
            <label htmlFor="data5">Mesa:</label>
            <input
              type="text"
              id="data5"
              name="table"
              placeholder=""
              required
              value={data.table}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data6">Nombre de parte:</label>
            <input
              type="text"
              id="data6"
              name="part_name"
              placeholder=""
              required
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
            <label htmlFor="data8">Turno:</label>
            <select
              id="data8"
              name="shift"
              required
              value={data.shift}
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
        <SecondTableCreate2
          setTotalesDefectos={setTotalesDefectos}
          divs={divs}
          setDivs={setDivs}
        />
      </div>

      <div
        className="container"
        style={{ overflowY: "scroll", paddingRight: 0 }}
      >
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
                <th>Defecto</th>
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
                <td>
                  <input />
                </td>
              </tr>
            </tbody>
            <tfoot className="tfooter">
              <tr>
                <td> </td>
                <td> </td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ width: "300px" }}>Total de defectos</div>
                </td>
                {totalesD.map((sum, i) => (
                  <td key={i}>
                    {i === totalesD.length - 1 ? (
                      <input type="text" value={sum} readOnly />
                    ) : (
                      <input type="text" value={sum} />
                    )}
                  </td>
                ))}
                <td></td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ width: "300px" }}>
                    Total de piezas inspeccionadas
                  </div>
                </td>
                {totalPiecesInsp.map((total, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      value={total}
                      onChange={(event) => handleInputChangeTotalPieInsp(index, event)}
                    />
                    <br />
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <div>INSPECTOR</div>                  
                  {inspectors.map((inspector, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        value={inspector}
                        onChange={(event) =>
                          handleInputChangeInsp(index, event)
                        }
                      />
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td colSpan={13} style={{ textAlign: "center" }}>
                  <div>COMENTARIOS</div>
                  {comments.map((comment, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        value={comment}
                        onChange={(event) =>
                          handleInputChangeComm(index, event)
                        }
                      />
                      <br />
                    </React.Fragment>
                  ))}
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  <div>REVISO</div>
                  <div className="firm">
                    <input
                      type=""
                      name=""
                      className="firm-input"
                      onChange={(e) => setInspectedBy(e.target.value)}
                      value={inspectedBy}
                    />
                  </div>
                </td>

                <td colSpan={8} style={{ textAlign: "center" }}>
                  <div>AUTORIZO</div>
                  <div className="firm">
                    <input
                      type=""
                      name=""
                      className="firm-input"
                      onChange={(e) => setAuthorizedBy(e.target.value)}
                      value={authorizedBy}
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

export default Create2;
