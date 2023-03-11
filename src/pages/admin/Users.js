import React, { useContext, useEffect, useState } from "react";

import UsersTable from "../../components/admin/Users";
import { MainContext } from "../../context/MainContext";

const Users = () => {
  const {data, setData} = useContext(MainContext);
  useEffect(() => {
    fetch(
      "http://phpstack-921351-3198370.cloudwaysapps.com/server/api/get_sales"
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
      <UsersTable data={data} />
    </div>
  );
};

export default Users;
