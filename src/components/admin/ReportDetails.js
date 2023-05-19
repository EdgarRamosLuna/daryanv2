import React, { useContext } from "react";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";

const ReportDetails = () => {
  const { rDetailsData, partNumber } = useContext(MainContext);
  const filterData = rDetailsData[0];
  //console.log(rDetailsData);
  //  console.log(partNumber);
  return (
    <div className="modal-details">
      <div className="modal-details-content">
        <div className="modal-details-header">
          <h2>Incidentes:</h2>          
          <h3>{partNumber}</h3>
        </div>
        <div className="modal-details-body">
          <Table>
            <table className="table-details">
              <thead>
                <tr>
                  {filterData["total_A"] !== 0 ? (
                    <th className="table-center">A</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_B"] !== 0 ? (
                    <th className="table-center">B</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_C"] !== 0 ? (
                    <th className="table-center">C</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_D"] !== 0 ? (
                    <th className="table-center">D</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_E"] !== 0 ? (
                    <th className="table-center">E</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_F"] !== 0 ? (
                    <th className="table-center">F</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_G"] !== 0 ? (
                    <th className="table-center">G</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_H"] !== 0 ? (
                    <th className="table-center">H</th>
                  ) : (
                    ""
                  )}
                  {filterData["total_I"] !== 0 ? (
                    <th className="table-center">I</th>
                  ) : (
                    ""
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {
                    // if key exist then show value else show nothing
                    filterData["total_A"] !== 0 ? (
                      <td className="table-center">{filterData["total_A"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_B"] !== 0 ? (
                      <td className="table-center">{filterData["total_B"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_C"] !== 0 ? (
                      <td className="table-center">{filterData["total_C"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_D"] !== 0 ? (
                      <td className="table-center">{filterData["total_D"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_E"] !== 0 ? (
                      <td className="table-center">{filterData["total_E"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_F"] !== 0 ? (
                      <td className="table-center">{filterData["total_F"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_G"] !== 0 ? (
                      <td className="table-center">{filterData["total_G"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_H"] !== 0 ? (
                      <td className="table-center">{filterData["total_H"]}</td>
                    ) : (
                      ""
                    )
                  }
                  {
                    // if key exist then show value else show nothing
                    filterData["total_I"] !== 0 ? (
                      <td className="table-center">{filterData["total_I"]}</td>
                    ) : (
                      ""
                    )
                  }
                </tr>
              </tbody>
            </table>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
