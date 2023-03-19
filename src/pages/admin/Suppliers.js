import React, { useContext, useEffect, useState } from "react";

import EmployeesTable from "../../components/admin/Employees";
import SuppliersTable from "../../components/admin/Suppliers";
import { MainContext } from "../../context/MainContext";

const Suppliers = () => {
  const {data, setData} = useContext(MainContext);
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
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="report-cointainer">
      <SuppliersTable data={data} />
    </div>
  );
};

export default Suppliers;
