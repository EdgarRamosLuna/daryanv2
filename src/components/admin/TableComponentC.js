import React from 'react';

function TableComponentC({ uniqueClauses, resultArray }) {
  return (
    <table>
      <thead>
        aaa
        <tr>
          <th>Report ID</th>
          {uniqueClauses.map(clause => (
            <th key={clause}>{clause}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {resultArray.map(item => (
          <tr key={item.report_id}>
            <td>{item.report_id}</td>
            {uniqueClauses.map(clause => (
              <td key={clause}>{item[clause]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableComponentC;
