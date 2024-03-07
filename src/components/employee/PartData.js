import React from 'react';

const PartData = ({ data }) => {
  // Agrupar los datos por número de parte y fecha
  const groupedData = Object.values(data).reduce((acc, curr) => {
    const { part_number, date, ...rest } = curr;
    if (!acc[part_number]) {
      acc[part_number] = {};
    }
    if (!acc[part_number][date]) {
      acc[part_number][date] = { ...rest };
    } else {
      Object.entries(rest).forEach(([key, value]) => {
        acc[part_number][date][key] += value;
      });
    }
    return acc;
  }, {});

  // Crear una tabla con los datos agrupados
  return (
    <table>
      <thead>
        <tr>
          <th>Número de Parte</th>
          <th>Fecha</th>
          <th>Total Inspected</th>
          <th>Total NG Pieces</th>
          <th>Total OK Pieces</th>
          <th>Total Re-Work Parts</th>
          <th>Total Scrap</th>
          <th>Total A</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedData).map(([part_number, dates]) => (
          Object.entries(dates).map(([date, values]) => (
            <tr key={`${part_number}-${date}`}>
              <td>{part_number}</td>
              <td>{date}</td>
              <td>{values.total_inspected}</td>
              <td>{values.total_ng_pieces}</td>
              <td>{values.total_ok_pieces}</td>
              <td>{values.total_re_work_parts}</td>
              <td>{values.total_scrap}</td>
              <td>{values.total_A}</td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
  );
};

export default PartData;
