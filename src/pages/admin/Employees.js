import React, { useContext, useEffect, useState } from "react";

import EmployeesTable from "../../components/admin/Employees";
import { MainContext } from "../../context/MainContext";

const Employees = () => {
  const {dataEmployees, setDataEmployees, serverUrl, } = useContext(MainContext);
  useEffect(() => {
      fetch(`${serverUrl}/api/get_employees`, {
      cache: "no-cache",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((dataEmployees) => {
   //     console.log(dataEmployees);
        dataEmployees.sort((a, b) => b.id - a.id);
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
