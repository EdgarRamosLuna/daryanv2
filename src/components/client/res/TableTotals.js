import React, { useState } from "react";

function Table({ data }) {
  const [selectedPartNumbers, setSelectedPartNumbers] = useState({});

  const handleClick = (partNumber) => {
    setSelectedPartNumbers({
      ...selectedPartNumbers,
      [partNumber]: !selectedPartNumbers[partNumber],
    });
  };

  return (
    <table className="table-totals">
      <thead>
        <tr>
          <th>Part Number</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((partNumber) => (
          <tr key={partNumber} onClick={() => handleClick(partNumber)}>
            <td className="table-center">
              <div>
                <div>{partNumber}</div>
                {selectedPartNumbers[partNumber] && (
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Total Inspected</th>
                        <th>Total NG Pieces</th>
                        <th>Total OK Pieces</th>
                        <th>Total Re-work Parts</th>
                        <th>Total Scrap</th>
                        <th>Total A</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data[partNumber].map((item, index) => (
                        <tr key={`${partNumber}_${index}`}>
                          <td>{item.date}</td>
                          <td>{item.total_inspected}</td>
                          <td>{item.total_ng_pieces}</td>
                          <td>{item.total_ok_pieces}</td>
                          <td>{item.total_re_work_parts}</td>
                          <td>{item.total_scrap}</td>
                          <td>{item.total_A}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {/* <button onClick={() => handleClick(partNumber)}>
                {selectedPartNumbers[partNumber] ? "Hide Details" : "View Details"}
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
