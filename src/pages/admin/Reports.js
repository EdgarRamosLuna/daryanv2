import React, { useContext, useEffect, useState } from "react";
import ReportsTable from "../../components/admin/Reports";
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
    agregarColumna
  } = useContext(MainContext);

  
  useEffect(() => {
    fetch("http://localhost/daryan-server/api/get", {
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
        console.log(reportes);
        localStorage.setItem("dataTable", JSON.stringify(reportes));
        setData(reportes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
      <ReportsTable data={data.sort((a, b) => a - b).reverse()} />
    </div>
  );
};

export default Reports;
