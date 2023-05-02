import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";

import ClientsTable from "../../components/admin/Clients";


const Clients = () => {
  const { dataSes, data, dataTS, reportData, serverUrl, dbChanges, dataClients, setDataClients } = useContext(MainContext);
  //console.log(dataT);

 // console.log(dbChanges);
  
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
     console.log(dataClients);
      dataClients.sort((a, b) => b.id - a.id);
      setDataClients(dataClients);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  useEffect(() =>{
  //  console.log(dbChanges);
    if(dbChanges.length > 0){
      console.log(dbChanges[0]);
      const datan = [dbChanges[0], ...dataClients]

      //console.log(datan)
      setDataClients(prev => [dbChanges[0], ...dataClients]);
    }
  }, [dbChanges])


  
  /*
  const [dataClientsTa, setDataClientsTa] = useState([]);
  useEffect(() => {
    const date = new Date();

    let dateFormatter = new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let timeFormatter = new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    let formattedDatef =
      dateFormatter.format(date) + " " + timeFormatter.format(date);
    //console.log(formattedDatef);
    dataClientsT.forEach((element, index) => {
      console.log(index);
      setDataClientsTa((prev) => [
        ...prev,
        {
          id: index + 1,
          date: formattedDatef,
          usuario: "Ramon Salazar",
          actions: (
            <div className="actions">
              <FontAwesomeIcon icon={faPenToSquare} color="green" />
              <a href="/assets/reporte.pdf" download>
                <FontAwesomeIcon icon={faFilePdf} color="brown" />
              </a>
              <FontAwesomeIcon icon={faTrash} color="red" />
            </div>
          ),
        },
      ]);
    });
    return () => {};
  }, [reportDataClients]);
  console.log(dataClientsTa.sort((a, b) => b.id - a.id));*/
  return (
    <div className="report-cointainer">
      <ClientsTable data={dataClients} />
    </div>
  );
};

export default Clients;
