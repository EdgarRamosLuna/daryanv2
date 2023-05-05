import React, { useContext, useEffect, useState } from "react";

import EmployeesTable from "../../components/admin/Employees";
import SuppliersTable from "../../components/admin/Suppliers";
import { MainContext } from "../../context/MainContext";

const Suppliers = () => {
  const {dataSuppliers, setDataSuppliers, serverUrl} = useContext(MainContext);
  
  useEffect(() => {
    fetch(`${serverUrl}/api/get_suppliers`, {
      cache: "no-cache",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((dataSuppliers) => {
        dataSuppliers.sort((a, b) => b.id - a.id);
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
