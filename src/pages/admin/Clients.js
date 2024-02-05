import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";

import ClientsTable from "../../components/admin/Clients";


const Clients = () => {
  const { dataSes, data, dataTS, reportData, serverUrl, dbChanges, dataClients, setDataClients } = useContext(MainContext);
  useEffect(() => {
    fetch(`${serverUrl}/api/get_clients`, {
      cache: "no-cache",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed.');
      }
      return response.json();
    })
    .then(dataClients => {
   //  console.log(dataClients);
      dataClients.sort((a, b) => b.id - a.id);
      setDataClients(dataClients);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
 
  return (
    <div className="report-cointainer">
      <ClientsTable data={dataClients} />
    </div>
  );
};

export default Clients;
