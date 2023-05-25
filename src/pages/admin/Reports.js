import React, { useContext, useEffect, useState } from "react";
import ReportsTable from "../../components/admin/Reports";
import ReportsTable2 from "../../components/other_user/Reports";
import { MainContext } from "../../context/MainContext";

const Reports = () => {
  const {
    dataSes,
    dataT,
    dataTS,
    reportData,
    data,
    setData,
    numColumnas,
    titulosColumnas,
    setTitulosColumnas,
    agregarColumna,
    serverUrl,
    isAdmin,
  } = useContext(MainContext);

  useEffect(() => {
    // fetch("http://3.142.97.58/daryan-server/api/get", {
    fetch(`${serverUrl}/api/get`, {
      cache: "no-cache",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((data) => {
        const reportes = Object.values(data);
        // console.log(reportes);
        localStorage.setItem("dataTable", JSON.stringify(reportes));
        setData(reportes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAdmin]);
  /*
  const [dataTa, setDataTa] = useState([]);
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
    dataT.forEach((element, index) => {
      console.log(index);
      setDataTa((prev) => [
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
  }, [reportData]);
  console.log(dataTa.sort((a, b) => b.id - a.id));*/
  return (
    <div className="report-cointainer">
      {isAdmin === true ? (
        <ReportsTable data={data} />
      ) : (
        <ReportsTable2 data={data} />
      )}
    </div>
  );
};

export default Reports;
