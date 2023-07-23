import React, { useContext, useEffect, useState } from "react";
import ReportsTable from "../../components/admin/Reports";
import ReportsTable2 from "../../components/other_user/Reports";
import { MainContext } from "../../context/MainContext";
import { getReportsByH, getReportsIns } from "../../api/daryan.api";
import ReportsByH from "../../components/admin/ReportsByH";

const Reports = () => {
  const {
    data,
    setData,
    isAdmin,
    activeTab,
    toast,
    data2,
    setData2,
  } = useContext(MainContext);

  useEffect(() => {
    const token = localStorage.getItem("t");
    if (activeTab === 1) {
      const request = async () => {
        await getReportsIns(token)
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
    if (activeTab === 2) {
      const request = async () => {
        await getReportsByH(token)
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
  }, [isAdmin, activeTab]);

  return (
    <div className="report-cointainer">
      <ReportsTable data={data} dataReportByH={data2} />   
    </div>
  );
};

export default Reports;
