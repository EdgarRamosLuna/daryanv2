import React, { useContext, useEffect, useState } from "react";
import ReportsTable from "../../components/employee/Reports";

import { MainContext } from "../../context/MainContext";
import { getEmployReports } from "../../api/daryan.api";

const Reports = () => {
  const {
    dataSes,
    dataT,
    dataTS,
    reportData,
    data,
    setData,
    setNumColumnas,
    toast,
  } = useContext(MainContext);
  //console.log(dataT);

  useEffect(() => {
    const token = localStorage.getItem("t");
    const request = async () => {
      await getEmployReports(token)
        .then((res) => {
          const datares = res.data;
          const reportes = Object.values(datares);
          console.log(reportes);
          localStorage.setItem("dataTable", JSON.stringify(reportes));
          setData(reportes);
          // toast.success(datares.message, {
          //   duration: 4000,
          // });
          // setTimeout(() => {
          //   navigate("/admin/reports");
          // }, 5000);
        })
        .catch((err) => {
          //console.log(err);
          toast.error(err, {
            duration: 5000,
          });
        });
    };
    request();
  }, []);
  /*
  const reportes = Object.values(data);
  console.log(reportes);
  localStorage.setItem("dataTable", JSON.stringify(reportes));
  setData(reportes);
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
      <ReportsTable data={data} />
    </div>
  );
};

export default Reports;
