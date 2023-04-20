import React, { useContext, useEffect, useState } from "react";

import UsersTable from "../../components/admin/Users";
import { MainContext } from "../../context/MainContext";

const Users = () => {
  const {dataUsers, setDataUsers} = useContext(MainContext);
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
