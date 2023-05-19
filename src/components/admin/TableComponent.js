import React, { useContext, useState } from "react";
import Loader from "../Loader";
import { MainContext } from "../../context/MainContext";

const TableComponent = ({ groupedData, loader }) => {
  const {
    showDtable,
    setShowDtable,
    setRDetailsData,
    partNumber,
    setPartNumber,
    setShowDEtable,
    tableFilters,
  } = useContext(MainContext);
  console.log(tableFilters);
  const showDetailsTable = (part_number) => {
    setShowDtable(true);
    //filter data by key as part_number
    const filteredData = groupedData[part_number];
    // console.log(filteredData)
    setPartNumber(part_number);
    setRDetailsData(filteredData);
  };
  const showExtraDetails = (date, partNumber) => {
    //console.log(date);
    //console.log(partNumber);
    //console.log(groupedData);
    console.log(date);
    setShowDEtable(true);
    setPartNumber(`${date}`);
    const filteredData = groupedData[partNumber].filter(
      (item) => item.date === date.toString()
    );
    console.log(filteredData);
    setRDetailsData(filteredData);
  };
  const LANG = [
    {
      value: "es",
      part_nu: "Numero de parte",
      date: "Fecha",
      total_in: "Total Inspeccionado",
      total_wh: "Total Horas Trabajadas",
      total_ng: "Total NG",
      total_ok: "Total OK",
      total_rw: "Total Re-Trabajadas",
      total_sc: "Total Scrap",
    },
    {
      value: "en",
      part_nu: "Part Number",
      date: "Date",
      total_in: "Total Inspected",
      total_wh: "Total Worked Hours",
      total_ng: "Total NG",
      total_ok: "Total OK",
      total_rw: "Total Re-Work Parts",
      total_sc: "Total Scrap",
    },
  ];
  const [langu, setLangu] = useState("es");
  return (
    <table className="table-totals">
      <thead>
        <tr>
          <th>{LANG.find((item) => item.value === langu).part_nu}</th>
          <th>{LANG.find((item) => item.value === langu).date}</th>
          {tableFilters[0].total_in === true && (
            // if value exist in array LANG
            <th>{LANG.find((item) => item.value === langu).total_in}</th>
          )}
          {tableFilters[0].total_ng === true && (
            // if value exist in array LANG
            <th>{LANG.find((item) => item.value === langu).total_ng}</th>
          )}
          {tableFilters[0].total_ok === true && (
            // if value exist in array LANG
            <th>{LANG.find((item) => item.value === langu).total_ok}</th>
          )}
          {tableFilters[0].total_rw === true && (
            // if value exist in array LANG
            <th>{LANG.find((item) => item.value === langu).total_rw}</th>
          )}
          {tableFilters[0].total_sc === true && (
            // if value exist in array LANG
            <th>{LANG.find((item) => item.value === langu).total_sc}</th>
          )}
          {tableFilters[0].total_wh === true && (
            // if value exist in array LANG
            <th>{LANG.find((item) => item.value === langu).total_wh}</th>
          )}
          <th></th>
        </tr>
      </thead>
      <tbody>
        <div className={loader === false ? "loaderContainer" : ""}>
          <Loader>
            <img src="/assets/img/loading2.svg" alt="" />
          </Loader>
        </div>
        {Object.entries(groupedData).map(([partNumber, dates]) => {
          return dates.map((dateData, index) => {
            return (
              <tr
                className={loader === false ? "tr-h rloaderContainer" : "tr-hd"}
                key={`${partNumber}-${index}`}
              >
                {index === 0 && (
                  <td
                    className="table-center td-nh"
                    rowSpan={dates.length}
                    onClick={() => showDetailsTable(partNumber)}
                  >
                    {partNumber}
                  </td>
                )}
                <td className="table-center">{dateData.date}</td>

                {
                  tableFilters[0].total_in === true && (
                    <td className="table-center">{dateData.total_inspected}</td>
                  )
                }
                {
                  tableFilters[0].total_ng === true && (
                    <td className="table-center">{dateData.total_ng_pieces}</td>
                  )
                }
                {
                  tableFilters[0].total_ok === true && (
                    <td className="table-center">{dateData.total_ok_pieces}</td>
                  )
                }
                {
                  tableFilters[0].total_rw === true && (
                    <td className="table-center">{dateData.total_re_work_parts}</td>
                  )
                }
                {
                  tableFilters[0].total_sc === true && (
                    <td className="table-center">{dateData.total_scrap}</td>
                  )
                }
                {
                  tableFilters[0].total_wh === true && (
                    <td className="table-center">{dateData.worked_h}</td>
                  )
                }
                <td className="table-center">
                  <i
                    className="fas fa-eye"
                    style={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      color: "green",
                    }}
                    onClick={() => showExtraDetails(dateData.date, partNumber)}
                  />
                </td>
                {/* <td className="table-center">{dateData.total_A}</td> */}
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
