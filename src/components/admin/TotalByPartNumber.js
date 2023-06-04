import React, { useContext, useState, useEffect } from "react";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { getReportsByPartNumber } from "../../api/daryan.api";
import TaLoader from "./TaLoader";

const TotalByPartNumber = () => {
  const { rDetailsData, partNumber, token } = useContext(MainContext);

  const [total_inspected, setTotalInspected] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // Nuevo estado para el toggle
  const [columnTitles, setColumnTitles] = useState([]); // Nuevo estado para los títulos de las columnas
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const getNgDetails = async (partNumber) => {
    // console.log(partNumber);
    setShowDetails(!showDetails);

    setIsLoading(true); // Comienza la carga
    await getReportsByPartNumber({ partNumber, token })
      .then((res) => {
        const data = res.data;
        //console.log(res.data);
        //console.log();

        // Actualiza los títulos de las columnas y los datos de la tabla con la respuesta de la API
        //console.log(data.column_values);
        setColumnTitles(data.column_names);
        setTableData(data.column_values);
      })
      .catch((err) => {
        console.log(err);
      });

    // const response = await fetch("https://api.example.com/data");
    // const data = await response.json();

    setIsLoading(false); // Termina la carga
  };

  useEffect(() => {
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
        <i
          className="fas fa-eye"
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "green",
          }}
          onClick={(e) => getNgDetails(partNumber)}
        />
      </>,
    ]);
    //console.log(total_inspected);
    return () => {
      //console.log("cleanup");
    };
  }, [rDetailsData]);

  // const getNgDetails = (partNumber) => {
  //   console.log(partNumber);
  //   setShowDetails(!showDetails); // Actualizar el estado de showDetails cuando se hace click
  //   setColumnTitles(["Titulo 1", "Titulo 2", "Titulo 3"]); // Aquí puedes definir tus títulos de columna dinámicos
  // };

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
                        {index === 1 ? <span>{item}</span> : item}
                      </td>
                    );
                  })}
                </tr>
                {showDetails && (
                  <tr>
                    <td colSpan="7">
                      <table>
                        <thead>
                          <tr>
                            <th>{`ID_REPORTE`}</th>
                            <th>{`INCISO`}</th>
                            <th>{`INCIDENTE`}</th>
                            <th>{`TOTAL`}</th>
                            {/* {columnTitles.map((title, index) => (
                              <th key={index}>{title}</th>
                            ))} */}
                          </tr>
                        </thead>
                        <tbody>
                          {isLoading ? (
                            <TaLoader colspan={4} />
                          ) : (
                            tableData.map((row, index) => (
                              <tr key={index}>
                                {Object.values(row).map((cell, cellIndex) => (
                                  <td key={cellIndex} className="table-center">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
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
