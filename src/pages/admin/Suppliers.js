import React, { useContext, useEffect, useState } from "react";

import EmployeesTable from "../../components/admin/Employees";
import SuppliersTable from "../../components/admin/Suppliers";
import { MainContext } from "../../context/MainContext";

const Suppliers = () => {
  const {dataSuppliers, setDataSuppliers} = useContext(MainContext);
  useEffect(() => {
    fetch("/daryan-server/api/get_suppliers", {
      cache: "no-cache",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((dataSuppliers) => {
        console.log(dataSuppliers);
        setDataSuppliers(dataSuppliers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="report-cointainer">
      <SuppliersTable data={dataSuppliers} />
    </div>
  );
};

export default Suppliers;
