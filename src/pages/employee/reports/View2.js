import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { StyledForm, Table } from "../../../styles/Styles";

import SecondTableCreate from "./SecondTableCreate";
import SecondTableCreate2 from "./SecondTableCreate2";
import { useEffect } from "react";
import DatePickerInput from "../../../components/DateInput";
import { useParams } from "react-router-dom";
import DatePickerInputU2 from "../../../components/DateInputUpdate2";

const View2 = () => {
  const { dataReportH, setDataReportH, dataTS2, data2, setData2 } =
    useContext(MainContext);
  const params = useParams();
  const idReport = params.id;

  //console.log(data2);
  const eData =
    data2.length === 0
      ? JSON.parse(dataTS2).filter(
          (data2) => Number(data2.id) === Number(idReport)
        )[0]
      : data2.filter((data2) => Number(data2.id) === Number(idReport))[0];
  const [dataC, setDataC] = useState(eData);
  console.log(dataC);
  const [divs, setDivs] = useState([]);
  const [totalPiecesInsp, setTotalPiecesInsp] = useState([]);
  useEffect(() => {
   dataC.reports_cc.forEach((element) => {
      const newData = {
        id: element.item,
        values: [
          element.item,
          element.defect,
          element.h1,
          element.h2,
          element.h3,
          element.h4,
          element.h5,
          element.h6,
          element.h7,
          element.h8,
          element.h9,
          element.h10,
          element.h11,
          element.h12,
          element.total,
        ],
      };
      setDivs(prev => [...prev, newData]);
    });
   dataC.report_total.forEach((element, index) => {      
     if(index === dataC.report_total.length - 1 ){
      setTotalPiecesInsp(prev => [...prev, element.total]);
      
      setTotalPiecesInsp(prev => [...prev, prev.reduce((a, b) => Number(a) + Number(b), 0)]);
    }else{
      setTotalPiecesInsp(prev => [...prev, element.total]);
    }
    });
  }, [dataC]);
//  console.log(divs);

  

  const handleSelect = (e, type) => {
    setDataC({
      ...dataC,
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
  // function handleInputChange(divId, inputIndex, newValue) {
  //   setDivs((prevDivs) => {
  //     // Busca el índice del objeto a actualizar en el array de divs basándose en el divId.
  //     const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
  //     // Crea una copia del objeto a actualizar usando el operador de propagación.
  //     const updatedDiv = { ...prevDivs[divToUpdateIndex] };

  //     // Guarda el valor antiguo de la celda antes de actualizarlo.
  //     const oldValue = Number(updatedDiv.values[inputIndex]) || 0;
  //     // Actualiza el valor en la celda correspondiente.
  //     updatedDiv.values[inputIndex] = newValue;

  //     // Guarda la suma antigua de la fila.
  //     const oldRowSum = Number(
  //       updatedDiv.values[updatedDiv.values.length - 1] || 0
  //     );
  //     // Calcula la diferencia entre el nuevo valor y el antiguo si ambos son números.
  //     const delta = !isNaN(newValue) ? Number(newValue) - oldValue : 0;
  //     // Actualiza la suma de la fila restando el valor antiguo y sumando el nuevo.
  //     updatedDiv.values[updatedDiv.values.length - 1] = oldRowSum + delta;

  //     // Crea una copia de la lista de divs, reemplaza el div actualizado y devuelve la nueva lista.
  //     const updatedDivs = [...prevDivs];
  //     updatedDivs[divToUpdateIndex] = updatedDiv;
  //     return updatedDivs;
  //   });
  // }
  useEffect(() => {
    const newArray = [
      {
        reportP1: dataC,
        reportP2: divs,
        inspectors,
        comments,
        inspectedBy,
        authorizedBy,
        totalDefects: totalesD,
        totalPieces: totalPiecesInsp,
      },
    ];
    setDataReportH(newArray);
  }, [
    dataC,
    inspectors,
    comments,
    inspectedBy,
    authorizedBy,
    totalesD,
    divs,
    totalPiecesInsp,
  ]);
  //console.log(dataReportH)
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>REPORTE POR HORAS</h3>
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
              value={dataC.plant}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="dataC">Numero de parte:</label>
            <input
              type="text"
              id="dataC"
              name="part_number"
              placeholder=""
              required
              value={dataC.part_number}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data3">
              Fecha <span className="required">*</span>
            </label>
            <DatePickerInputU2
              id="data3"
              name="date"
              style={{ textAlign: "left", padding: "12px 20px" }}
              value={dataC.date}
              type="text"
              dataC={dataC}
              setDataC={setDataC}
              //      readOnly
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
              value={dataC.report_number}
              onChange={(e) =>
                setDataC({
                  ...dataC,
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
              value={dataC.table_info}
              onChange={(e) =>
                setDataC({
                  ...dataC,
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
              value={dataC.part_name}
              onChange={(e) =>
                setDataC({
                  ...dataC,
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
              value={dataC.shift}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
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
                    Total de piezas inspeccionadass
                  </div>
                </td>
                {totalPiecesInsp.map((total, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      value={total}
                      onChange={(event) =>
                        handleInputChangeTotalPieInsp(index, event)
                      }
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

export default View2;
