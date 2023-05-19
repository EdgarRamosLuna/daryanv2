import React, { useContext, useState } from "react";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { useEffect } from "react";

const TotalByPartNumber = () => {
  const { rDetailsData, partNumber } = useContext(MainContext);

  console.log(rDetailsData);
  const [total_inspected, setTotalInspected] = useState([]);
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
    ]);
    //console.log(total_inspected);
    return () => {
      //console.log("cleanup");
    };
  }, [rDetailsData]);
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  {total_inspected.map((item, index) => {
                    return (
                      <td key={index} className="table-center">
                        {item}
                      </td>
                    );
                  })}
                  {/* <td className="table-center">1</td>
                  <td className="table-center">2</td>
                  <td className="table-center">3</td>
                  <td className="table-center">4</td>
                  <td className="table-center">5</td>
                  <td className="table-center">6</td> */}
                </tr>
              </tbody>
            </table>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TotalByPartNumber;
