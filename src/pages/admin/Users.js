import React, { useContext, useEffect, useState } from "react";

import UsersTable from "../../components/admin/Users";
import { MainContext } from "../../context/MainContext";

const Users = () => {
  const {dataUsers, setDataUsers} = useContext(MainContext);
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
      .then((dataUsers) => {
        console.log(dataUsers);
        setDataUsers(dataUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="report-cointainer">
      <UsersTable data={dataUsers} />
    </div>
  );
};

export default Users;
