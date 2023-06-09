import React, { useContext, useEffect, useState } from "react";

import UsersTable from "../../components/admin/Users";
import { MainContext } from "../../context/MainContext";

const Users = () => {
  const {dataUsers, setDataUsers, serverUrl} = useContext(MainContext);
  useEffect(() => {
    fetch(`${serverUrl}/api/get_users`, {
      cache: "no-cache",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed.");
        }
        return response.json();
      })
      .then((dataUsers) => {
        dataUsers.sort((a, b) => b.id - a.id);
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
