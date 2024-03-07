import React, { useContext, useEffect } from "react";

import { MainContext } from "../../context/MainContext";
import { getEmployReportsByH, getEmployReports } from "../../api/daryan.api";
import ReportsTable from "../../components/employee/Reports";


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
        try {
          const response = await getEmployReports(token);
          const datares = response?.data.result;
          const { error } = datares;
          if (!error) {
            const { result, last_report_id } = response?.data;
            const datares = result;
            const reportes = Object.values(datares);
            localStorage.setItem("dataTable", JSON.stringify(reportes));
            localStorage.setItem("last_report_id", last_report_id);
            setData(reportes);
          }
        } catch (error) {
          console.log(error)
          toast.error("error", {
            duration: 5000,
          });
        }
      };
 
        request();

    }
    if (activeTab === 2) {
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

