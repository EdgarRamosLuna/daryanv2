import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { getReportsByPartNumberClient } from "../../api/daryan.api";
import TaLoader from "./TaLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export const DynamicTable = ({ data, type }) => {
  const [groupedData, setGroupedData] = useState([]);
  const [groupedData2, setGroupedData2] = useState([]);
  const [clauses, setClauses] = useState([]);
  const [incidents, setIncidents] = useState([]);
  useEffect(() => {
    if (type !== 0) {
      // Obtén todas las cláusulas únicas para crear las cabeceras de la tabla
      let filteredData = data.filter((t) => Number(t.type) === type);
      const clauses = [...new Set(filteredData.map((item) => item.clause))];
      const indicentsDb = [
        ...new Set(
          filteredData.map((item) => {
            const dataToReturn = {
              clause: item.clause,
              incident: item.incident,
              report_id: item.report_id,
            };
            return dataToReturn;
          })
        ),
      ];
      setIncidents(indicentsDb);
      setClauses(clauses);

      // Agrupa los datos por report_id
      const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.report_id]) {
          acc[item.report_id] = clauses.reduce(
            (obj, clause) => ({ ...obj, [clause]: 0 }),
            {}
          );
        }

        // Aquí es donde debes hacer la suma
        acc[item.report_id][item.clause] += parseInt(item.total_cant);
        return acc;
      }, {});
      let groupedByReportIdAndClause = data.reduce((acc, item) => {
        // Si el report_id no existe en el acumulador, añádelo como un nuevo objeto
        if (!acc[item.report_id]) {
          acc[item.report_id] = {};
        }

        // Si la clause no existe en el report_id correspondiente, añádela como un nuevo objeto
        // Solo se guardará el primer objeto encontrado para cada combinación de report_id y clause
        if (!acc[item.report_id][item.clause]) {
          acc[item.report_id][item.clause] = item;
        }

        // Devuelve el acumulador para ser utilizado en la siguiente iteración
        return acc;
      }, {});

      setGroupedData2(groupedByReportIdAndClause);
      setGroupedData(groupedData);
    }
  }, [type]);

  const reportIds = Object.keys(groupedData);
  //console.log(incidents);
  // Convertir los datos agrupados a formato de array para usar en la tabla
  let tableData = [];
  for (let report_id in groupedData) {
    for (let clause in groupedData[report_id]) {
      tableData.push({
        report_id: report_id,
        clause: clause,
        total_cant: groupedData[report_id][clause],
      });
    }
  }
  const [tooltip, setTooltip] = useState({
    x: 0,
    y: 0,
    show: false,
    text: "",
  });

  const handleCellClick = (e, text, cant) => {
    e.target.children[0].classList.add("span-btn-hover");
    // const span = document.querySelector(".span-btn-clause");

    // span.addEventListener("blur", function() {
    //   span.classList.remove("span-btn-hover");
    // });
    if (cant === 0) return;
    console.log("Clicked text:", text); // Agrega esta línea
    const rect = e.target.children[0].getBoundingClientRect();
    setTooltip({
      x: rect.x - 180,
      y: rect.y,
      show: true,
      text: text,
    });
    console.log(rect);
  };
  const spanRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    if (spanRef.current) {
      spanRef.current.classList.remove("span-btn-hover");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (spanRef.current) {
      spanRef.current.classList.add("span-btn-hover");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.className.includes("table-center")) {
        setTooltip({ ...tooltip, show: false });
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [tooltip]);

  //  console.log(groupedData2[4])
  return (
    <table>
      <thead>
        <tr>
          <th>Report ID</th>
          {clauses.map((clause, index) => (
            <th key={index}>{clause}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reportIds.map((reportId, index) => (
          <tr key={index}>
            <td className="table-center">{reportId}</td>
            {clauses.map((clause, index) => (
              <td
                className="table-center"
                key={index}
                onClick={(e) =>
                  handleCellClick(
                    e,
                    groupedData2[reportId][clause] &&
                      groupedData2[reportId][clause].incident,
                    groupedData[reportId][clause]
                  )
                }
                onBlur={handleBlur}
                onFocus={handleFocus}
                tabIndex="0"
              >
                <span
                  ref={spanRef}
                  className={`${
                    groupedData[reportId][clause] !== 0 && "span-btn-clause"
                  } ${isFocused ? "removable" : ""}`}
                  style={{ pointerEvents: "none" }}
                >
                  {groupedData[reportId][clause]}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {tooltip.show && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: "white",
            border: "1px solid black",
            padding: "5px",
            zIndex: 100,
          }}
        >
          <b>Incidencia: </b>
          {tooltip.text}
        </div>
      )}
    </table>
  );
};

const TotalByPartNumber = () => {
  const { rDetailsData, partNumber, token } = useContext(MainContext);

  const [total_inspected, setTotalInspected] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // Nuevo estado para el toggle
  const [columnTitles, setColumnTitles] = useState([]); // Nuevo estado para los títulos de las columnas
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  console.log(token)
  useEffect(() => {
    const getAllDetails = async () => {
      setIsLoading(true); // Comienza la carga
      try {
        const res = await getReportsByPartNumberClient({ partNumber, token });
        const data = res.data;

        console.log(data);
        setColumnTitles(data.column_names);
        setTableData(data.column_values);
        setOriginalTableData(data.column_values); // Aquí se establecen los datos originales
      } catch (err) {
        console.log(err);
      }
    };
    getAllDetails(partNumber);
  }, []);
  useEffect(() => {
    //console.log(dataDb);

    // Sum the values of the object array
    const total_inspected = rDetailsData.reduce(
      (a, b) => a + (b["total_inspected"] || 0),
      0
    );
    const total_ng_pieces = rDetailsData.reduce(
      (a, b) => a + (b["total_ng_pieces"] || 0),
      0
    );
    const total_ok_pieces = rDetailsData.reduce(
      (a, b) => a + (b["total_ok_pieces"] || 0),
      0
    );
    const total_re_work_parts = rDetailsData.reduce(
      (a, b) => a + (b["total_re_work_parts"] || 0),
      0
    );
    const total_scrap = rDetailsData.reduce(
      (a, b) => a + (b["total_scrap"] || 0),
      0
    );
    const total_worked_h = rDetailsData.reduce(
      (a, b) => a + (b["worked_h"] || 0),
      0
    );
    setTotalInspected([
      total_inspected,
      total_ng_pieces,
      total_ok_pieces,
      total_re_work_parts,
      total_scrap,
      total_worked_h,
      <>
        {!navigator.onLine ? (
          <FontAwesomeIcon icon={faFilePdf} />
        ) : (
          <i className="fa-solid fa-file-pdf" style={{
            fontSize: '1.3rem',
            color:"#600404"
          }}></i>
        )}
      </>,
    ]);
    //console.log(total_inspected);
    return () => {
      //console.log("cleanup");
    };
  }, [rDetailsData, showDetails, partNumber]);

  //console.log(tableData);
  // const getDetails = (type) => {
  //   const filteredData = originalTableData.filter(
  //     (t) => Number(t.type) === type
  //   );

  //   const groupedData = filteredData.reduce((acc, item) => {
  //     // Si el report_id no existe en el objeto acumulador, inicialízalo con un objeto vacío.
  //     if (!acc[item.report_id]) {
  //       acc[item.report_id] = {
  //         report_id: item.report_id,
  //       };
  //     }

  //     // Añade la cláusula y la cantidad al objeto del report_id correspondiente.
  //     acc[item.report_id][item.clause] = item.cant;

  //     return acc;
  //   }, {});

  //   setTableData(Object.values(groupedData));
  // };

  const [typeData, setTypeData] = useState(0);
  const getDetails = (type) => {
    setTypeData(type);

    if (type === typeData) {
      setShowDetails(!showDetails);
    } else {
      setShowDetails(true);
    }
    //getAllDetails();
    // let filteredData = originalTableData.filter((t) => Number(t.type) === type);

    // // Convertir "total_cant" a número
    // filteredData = filteredData.map((item) => ({
    //   ...item,
    //   total_cant: parseInt(item.total_cant),
    // }));

    // // Agrupar y sumar
    // let groupedData = filteredData.reduce((acc, val) => {
    //   // Si el report_id no existe en el acumulador, lo creamos
    //   if (!acc[val.report_id]) {
    //     acc[val.report_id] = {};
    //   }

    //   // Si la cláusula no existe en el report_id, la creamos con valor 0
    //   if (!acc[val.report_id][val.clause]) {
    //     acc[val.report_id][val.clause] = 0;
    //   }

    //   // Sumamos el valor de total_cant a la cláusula correspondiente
    //   acc[val.report_id][val.clause] += val.total_cant;

    //   return acc;
    // }, {});

    // // Convertir los datos agrupados a formato de array para usar en la tabla
    // let tableData = [];
    // for (let report_id in groupedData) {
    //   for (let clause in groupedData[report_id]) {
    //     tableData.push({
    //       report_id: report_id,
    //       clause: clause,
    //       total_cant: groupedData[report_id][clause],
    //     });
    //   }
    // }

    // // Actualizar los datos de la tabla
    // setTableData(tableData);
    // console.log(tableData);
  };

  // definir estilos como objeto JavaScript
  const tableStyle = {
    maxHeight: "200px",
    overflowY: "auto",
    display: "block",
    maxWidth: "590px",
    margin: "0 auto",
  };
  const tableContainerStyle = {
    maxHeight: "200px",
    overflowY: "auto",
  };
  return (
    <div className="modal-details">
      <div className="modal-details-content">
        <div className="modal-details-header">
          <h2>Numero de parte:</h2>
          <h3>{partNumber}</h3>
        </div>
        <div className="modal-details-body">
          <Table>
            <table className="table-details">
              <thead>
                <tr>
                  <th>Total Inspeccionado</th>
                  <th>Total NG Piezas</th>
                  <th>Total OK Piezas</th>
                  <th>Total Retrabajadas</th>
                  <th>Total Scrap</th>
                  <th>Total Horas Trabajadas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {total_inspected.map((item, index) => {
                    return (
                      <td key={index} className="table-center">
                        {index >= 1 && index <= 4 ? (
                          <>
                            {index !== 2 ? (
                              <span
                                className={`span-btn${index}`}
                                onClick={() =>
                                  getDetails(index !== 1 ? index - 1 : index)
                                }
                              >
                                {item}
                              </span>
                            ) : (
                              item
                            )}
                          </>
                        ) : (
                          item
                        )}
                      </td>
                    );
                  })}
                </tr>
                {showDetails === true && (
                  <tr>
                    <td colSpan="7">
                      <div style={tableContainerStyle}>
                        <DynamicTable data={tableData} type={typeData} />
                        {/* <table>
                          <thead>
                            <tr>
                              {tableData[0] &&
                                Object.keys(tableData[0])
                                  .filter(
                                    (key) =>
                                      key !== "incident" && key !== "type"
                                  ) // Filtrar las claves que no sean "incident" ni "anotherKey"
                                  .map((key, index) => (
                                    <th key={index}>{key === "clause" ? "inciso": key}</th>
                                  ))}
                            </tr>
                          </thead>

                          <tbody>
                            {isLoading ? (
                              <TaLoader colspan={4} />
                            ) : (
                              tableData.map((row, index) => (
                                <tr key={index}>
                                {Object.entries(row)
                                  .filter(([key]) => key !== "incident" && key !== "type") // Filtrar las entradas cuya clave no sea "incident" ni "anotherKey"
                                  .map(([key, value], cellIndex) => (
                                    <td
                                      key={cellIndex}
                                      className="table-center"
                                      onClick={(e) => handleCellClick(e, row.incident)}
                                    >
                                      {key === "type" ? (
                                        <>
                                          {Number(value) === 1 && "NG"}
                                          {Number(value) === 2 && "RT"}
                                          {Number(value) === 3 && "SC"}
                                        </>
                                      ) : (
                                        value
                                      )}
                                    </td>
                                  ))}
                              </tr>

                              ))
                            )}
                          </tbody>

                          {tooltip.show && (
                            <div
                              style={{
                                position: "fixed",
                                left: tooltip.x,
                                top: tooltip.y,
                                backgroundColor: "white",
                                border: "1px solid black",
                                padding: "5px",
                                zIndex: 100,
                              }}
                            >
                              {tooltip.text}
                            </div>
                          )}
                        </table> */}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TotalByPartNumber;
