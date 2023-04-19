import React, { useState } from "react";
import Loader from "../Loader";

const TableComponent = ({ groupedData, loader }) => {
  const [showDtable, setShowDtable] = useState(false);
  return (
    <table className="table-totals">
      <thead>
        <tr>
          <th>Part Number</th>
          <th>Date</th>
          <th>Total Inspected</th>
          <th>Total NG Pieces</th>
          <th>Total OK Pieces</th>
          <th>Total Re-work Parts</th>
          <th>Total Scrap</th>
          {/* <th>Total A</th> */}
        </tr>
      </thead>
      <tbody>
        <div
          className={loader === false ? "loaderContainer" : ""}
        >
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
                  <td className="table-center td-nh" rowSpan={dates.length}>
                    {partNumber}
                  </td>
                )}
                <td className="table-center">{dateData.date}</td>
                <td className="table-center">{dateData.total_inspected}</td>
                <td className="table-center">{dateData.total_ng_pieces}</td>
                <td className="table-center">{dateData.total_ok_pieces}</td>
                <td className="table-center">{dateData.total_re_work_parts}</td>
                <td className="table-center">{dateData.total_scrap}</td>
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
