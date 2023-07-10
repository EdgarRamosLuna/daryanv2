import React, { useContext, useEffect, useState } from "react";
import ReportsTable from "../../components/employee/Reports";

import { MainContext } from "../../context/MainContext";
import { getEmployReports, getEmployReportsByH } from "../../api/daryan.api";
import ReportsByH from "../../components/employee/ReportsByH";

const Reports = () => {
  const {
    dataSes,
    dataT,
    dataTS,
    reportData,
    data,
    setData,
    data2,
    setData2,
    setNumColumnas,
    toast,
    activeTab,
    setActiveTab,
  } = useContext(MainContext);
  useEffect(() => {
    const token = localStorage.getItem("t");

    if(activeTab === 1){
      const request = async () => {
        await getEmployReports(token)
          .then((res) => {
            const datares = res.data;
            const reportes = Object.values(datares);
            console.log(reportes);
            localStorage.setItem("dataTable", JSON.stringify(reportes));
            setData(reportes);
          })
          .catch((err) => {
            //console.log(err);
            toast.error(err, {
              duration: 5000,
            });
          });
      };
      request();
    }
    if(activeTab === 2){
      const request = async () => {
        await getEmployReportsByH(token)
          .then((res) => {
            const datares = res.data;
            const reportes = Object.values(datares);
            console.log(reportes);
            localStorage.setItem("dataTable2", JSON.stringify(reportes));
            setData2(reportes);
          })
          .catch((err) => {
            //console.log(err);
            toast.error(err, {
              duration: 5000,
            });
          });
      };
      request();
    }
  }, [activeTab]); 
  return (
    <div className="report-cointainer">

      
      {activeTab === 1 ? <ReportsTable data={data} /> : <ReportsByH data={data2} />}      
      
    </div>
  );
};

export default Reports;
