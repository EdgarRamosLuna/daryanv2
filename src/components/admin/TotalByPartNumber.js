import React, { useContext, useState, useEffect, useRef } from "react";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { getReportsByPartNumber } from "../../api/daryan.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import FilterTable from "./FilterTable";
import { Chip, Tooltip, Typography } from "@mui/material";

export const DynamicTable = ({ data, type }) => {
  const [groupedData, setGroupedData] = useState([]);
  const [groupedData2, setGroupedData2] = useState([]);
  const [clauses, setClauses] = useState([]);
  const [incidents, setIncidents] = useState([]);
  useEffect(() => {
    if (type !== 0) {
      // Obtén todas las cláusulas únicas para crear las cabeceras de la tabla
      let filteredData = data?.filter((t) => Number(t.type) === type);
      const clauses = [...new Set(filteredData?.map((item) => item?.clause))];
      const indicentsDb = [
        ...new Set(
          filteredData?.map((item) => {
            const dataToReturn = {
              clause: item?.clause,
              incident: item?.type,
              report_id: item?.report_id,
            };
            return dataToReturn;
          })
        ),
      ];
      setIncidents(indicentsDb);
      setClauses(clauses);

      // Agrupa los datos por report_id
      const groupedData = filteredData?.reduce((acc, item) => {
        if (!acc[item?.report_id]) {
          acc[item?.report_id] = clauses?.reduce(
            (obj, clause) => ({ ...obj, [clause]: 0 }),
            {}
          );
        }

        // Aquí es donde debes hacer la suma
        acc[item?.report_id][item?.clause] += parseInt(item?.total_cant);
        return acc;
      }, {});
      let groupedByReportIdAndClause = data?.reduce((acc, item) => {
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
      console.log(groupedData);
    }
  }, [type]);

  const reportIds = groupedData ? Object.keys(groupedData) : [];

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

  const spanRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    if (spanRef.current) {
      spanRef.current.classList.remove("removable");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (spanRef.current) {
      spanRef.current.classList.add("removable");
    }
  };

  return (
    <>
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
          {reportIds?.map((reportId, index) => (
            <tr key={index}>
              <td className="table-center">{reportId}</td>
              {clauses.map((clause, index) => (
                <td
                  className="table-center"
                  key={index}
                  // onClick={(e) =>
                  //   handleCellClick(
                  //     e,
                  //     groupedData2[reportId][clause] &&
                  //       groupedData2[reportId][clause].type,
                  //     groupedData[reportId][clause]
                  //   )
                  // }
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  tabIndex="0"
                >
                  <>
                    <Tooltip
                      title={
                        <>
                          <b>Incidencia: </b>
                          {groupedData2[reportId][clause]?.comment}
                        </>
                      }
                      placement="left"
                      arrow
                    >
                      {groupedData[reportId] &&
                      groupedData[reportId][clause] ? (
                        <Chip
                          label={groupedData[reportId][clause]}
                          color="success"
                          variant="outlined"
                        />
                      ) : (
                        ""
                      )}
                    </Tooltip>
                  </>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const TotalByPartNumber = () => {
  const {
    rDetailsData,
    partNumber,
    token,
    tableFilters2,
    setTableFilters2,
    LANG,
    langu,    
    serverNodeUrl
  } = useContext(MainContext);

  const [total_inspected, setTotalInspected] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // Nuevo estado para el toggle
  const [columnTitles, setColumnTitles] = useState([]); // Nuevo estado para los títulos de las columnas
  const [tableData, setTableData] = useState([]);
  const [originalTableData, setOriginalTableData] = useState([]);  
  
  //'http://localhost:3001';
  const [isLoading, setIsLoading] = useState(false);
  const viewReportByPartNumber = (partNumber) =>{
    window.open(`${serverNodeUrl}rip/${partNumber}?st=${token}`, '_blank');
  };
  useEffect(() => {
    const getAllDetails = async () => {
      setIsLoading(true); // Comienza la carga
      try {
        const res = await getReportsByPartNumber({ partNumber, token });
        const data = res?.data;
        setColumnTitles(data?.column_names || []);
        setTableData(data?.column_values || []);
        setOriginalTableData(data?.column_values || []); // Aquí se establecen los datos originales
      } catch (err) {
        console.log(err);
      }
    };
    getAllDetails(partNumber);
  }, []);
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
        {!navigator.onLine ? (
          <FontAwesomeIcon icon={faFilePdf} />
        ) : (
          <i
            className="fa-solid fa-file-pdf"
            style={{
              fontSize: "1.3rem",
              color: "#600404",
            }}
            onClick={() => viewReportByPartNumber(partNumber)}
          ></i>
        )}
      </>,
    ]);
  }, [rDetailsData, showDetails, partNumber]);

  const [typeData, setTypeData] = useState(0);
  const getDetails = (type) => {
    setTypeData(type);
    if (tableData.length > 0) {
      if (type === typeData) {
        setShowDetails(!showDetails);
      } else {
        setShowDetails(true);
      }
    } else {
      return;
    }
  };

  const tableContainerStyle = {
    maxHeight: "200px",
    overflowY: "auto",
  };
  const [showFIltersT, setShowFiltersT] = useState(false);
  const showFilterTable = () => {    
    setShowFiltersT((prev) => !prev);
  };
  useEffect(() => {
    if (
      tableFilters2 &&
      !showFIltersT &&
      Object.values(tableFilters2[0]).every((value) => !value)
    ) {
      setTableFilters2([
        {
          total_in: true,
          total_ng: true,
          total_ok: true,
          total_rw: true,
          total_sc: true,
          total_wh: true,
        },
      ]);
    }
  }, [tableFilters2]);

  return (
    <div className="modal-details">
      <div className="modal-details-content">
        <div className="modal-details-header">
          <h2>Numero de parte:</h2>
          <h3>{partNumber}</h3>
        </div>
        <div className="modal-details-body">
          <div className="table-controlls">
            {showFIltersT && <FilterTable tableFilters2={tableFilters2} />}
            <div className="table-controlls-left">
              <div
                className={`table-controlls-left-item ${
                  showFIltersT ? "activeFilters" : ""
                }`}
                onClick={showFilterTable}
              >
                <i className="fa-solid fa-filter"></i>
              </div>
            </div>
          </div>
          <Table>
            <table className="table-details">
              <thead>
                <tr>
                  {tableFilters2[0].total_in === true && (
                    // if value exist in array LANG
                    <th>{LANG.find((item) => item.lang === langu).total_in}</th>
                  )}
                  {tableFilters2[0].total_ng === true && (
                    // if value exist in array LANG
                    <th>{LANG.find((item) => item.lang === langu).total_ng}</th>
                  )}
                  {tableFilters2[0].total_ok === true && (
                    // if value exist in array LANG
                    <th>{LANG.find((item) => item.lang === langu).total_ok}</th>
                  )}
                  {tableFilters2[0].total_rw === true && (
                    // if value exist in array LANG
                    <th>{LANG.find((item) => item.lang === langu).total_rw}</th>
                  )}
                  {tableFilters2[0].total_sc === true && (
                    // if value exist in array LANG
                    <th>{LANG.find((item) => item.lang === langu).total_sc}</th>
                  )}
                  {tableFilters2[0].total_wh === true && (
                    // if value exist in array LANG
                    <th>{LANG.find((item) => item.lang === langu).total_wh}</th>
                  )}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {total_inspected.map((item, index) => {
                    return (
                      <>
                        {index === 0 && tableFilters2[0].total_in === true && (
                          <td key={index} className="table-center">
                            {item}
                          </td>
                        )}
                        {index === 1 && tableFilters2[0].total_ng === true && (
                          <td key={index} className="table-center">
                            <span
                              className={`span-btn${index}`}
                              onClick={() =>
                                getDetails(index !== 1 ? index - 1 : index)
                              }
                            >
                              {item}
                            </span>
                          </td>
                        )}
                        {index === 2 && tableFilters2[0].total_ok === true && (
                          <td key={index} className="table-center">
                            <span
                              className={`span-btn${index}`}
                              onClick={() =>
                                getDetails(index !== 1 ? index - 1 : index)
                              }
                            >
                              {item}
                            </span>
                          </td>
                        )}
                        {index === 3 && tableFilters2[0].total_rw === true && (
                          <td key={index} className="table-center">
                            <span
                              className={`span-btn${index}`}
                              onClick={() =>
                                getDetails(index !== 1 ? index - 1 : index)
                              }
                            >
                              {item}
                            </span>
                          </td>
                        )}
                        {index === 4 && tableFilters2[0].total_sc === true && (
                          <td key={index} className="table-center">
                            <span
                              className={`span-btn${index}`}
                              onClick={() =>
                                getDetails(index !== 1 ? index - 1 : index)
                              }
                            >
                              {item}
                            </span>
                          </td>
                        )}
                        {index === 5 && tableFilters2[0].total_wh === true && (
                          <td key={index} className="table-center">
                            {item.toFixed(2)}
                          </td>
                        )}
                        {index === 6 && (
                          <td key={index} className="table-center">
                            {item}
                          </td>
                        )}
                      </>
                    );
                  })}
                </tr>
                {showDetails === true && (
                  <tr>
                    <td colSpan="7">
                      <div style={tableContainerStyle}>
                        <DynamicTable data={tableData} type={typeData} />
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
