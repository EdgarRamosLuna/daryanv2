import React, { useContext, useEffect, useState } from "react";

import EmployeesTable from "../../components/admin/Employees";
import { MainContext } from "../../context/MainContext";

const Employees = () => {
  const {dataEmployees, setDataEmployees} = useContext(MainContext);
  useEffect(() => {
    fetch("http://3.142.97.58/daryan-server/api/get_employees", {
      cache: "no-cache",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((dataEmployees) => {
        console.log(dataEmployees);
        setDataEmployees(dataEmployees);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="report-cointainer">
      <EmployeesTable data={dataEmployees} />
    </div>
  );
};

export default Employees;
