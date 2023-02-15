import React, { createContext, useEffect, useState } from "react";

export const MainContext = createContext();
export const MainContextProvider = ({ children }) => {
  const dataSes = localStorage.getItem("sesType");
  /* const data = [
    {
      id: 1,
      date: "14/02/2023 11:29 a. m.",
    },
    {
      id: 2,
      date: "14/02/2023 10:50 a. m.",
    },
  ];*/
  //localStorage.setItem('dataTable', JSON.stringify(data));
  // const dataTS = localStorage.getItem("dataTable");
  //JSON.parse(dataTS)

  const [data, setData] = useState({
    data: "data",
    data2: "data2",
    data3: "data3",
    data4: "data4",
    data5: "data5",
    data6: "data6",
    data7: "data7",
    data8: "data8",
    data9: "data9",
    data10: "data10",
    data11: "data11",
    data12: "data12",
  });
  const dataTS = localStorage.getItem("dataTable");
  console.log(dataTS);
  const [reportData, setReportData] = useState(
    dataTS === "" || dataTS === null ? [] : JSON.parse(dataTS)
  );
  const saveReport = (e) => {
    e.target.innerHTML = '<img src="/assets/img/loading2.svg" alt="" />';
    // console.log(data);
    //setData(data);
    setReportData((prev) => [...prev, data]);
    setTimeout(() => {
      e.target.innerHTML = "Enviar Reporte";
      window.location.replace("/user/reports");
    }, 1000);
    // setDataT(prev => [...prev, data]);
  };
  useEffect(() => {
    if (reportData.length !== 0) {
      //console.log(reportData);
      saveData();
    }
  }, [reportData]);
  const saveData = () => {
    localStorage.setItem("dataTable", JSON.stringify(reportData));
    setDataT(reportData);
  };

  const [dataT, setDataT] = useState(dataTS === "" || dataTS === null ? [] : JSON.parse(dataTS));
  return (
    <MainContext.Provider
      value={{ dataSes, dataT, data, setData, saveReport, dataTS, reportData }}
    >
      {children}
    </MainContext.Provider>
  );
};
