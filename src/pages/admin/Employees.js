import React, { useContext, useEffect, useState } from "react";

import EmployeesTable from "../../components/admin/Employees";
import { MainContext } from "../../context/MainContext";

const Employees = () => {
  const {dataEmployees, setDataEmployees} = useContext(MainContext);
  useEffect(() => {
    fetch(
      "http://phpstack-921351-3198370.cloudwaysapps.com/server/api/products_pizza"
    )
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
