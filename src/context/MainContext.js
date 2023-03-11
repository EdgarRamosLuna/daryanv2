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

  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const dataTS = localStorage.getItem("dataTable");
  //console.log(data);
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

  const [dataT, setDataT] = useState(
    dataTS === "" || dataTS === null ? [] : JSON.parse(dataTS)
  );
  const [confirm, setConfirm] = useState(false);
  const hanldeDel = (id) => {
    //console.log(data, id);
    setIdDelete(id);
    setConfirm(true);
  };
  const handleConfirm = (callback) => {
    setConfirm(false);
  };
  const [showModalU, setShowModalU] = useState(false);
  const [showModalE, setShowModalE] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [updateId, setUpdateId] = useState(false);
  const [delType, setDelType] = useState(0);
  return (
    <MainContext.Provider
      value={{
        dataSes,
        dataT,
        data,
        setData,
        saveReport,
        dataTS,
        reportData,
        confirm,
        setConfirm,
        hanldeDel,
        idDelete,
        setIdDelete,
        handleConfirm,
        showModalU,
        setShowModalU,
        updateId,
        setUpdateId,
        showModalE,
        setShowModalE,
        showModalC,
        setShowModalC,
        delType,
        setDelType,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
