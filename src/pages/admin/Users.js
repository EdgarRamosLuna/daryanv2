import React from "react";
import DataTable from "react-data-table-component";
import {
  faFileLines,
  faUser,
  faGear,
  faRightFromBracket,
  faUsers,
  faTrash,
  faPenToSquare,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const data = [
  {
    user: 1,
    name: "name",
    email: "correo@daryan.com",
    actions: (
      <div className="actions">
        <FontAwesomeIcon icon={faTrash} color="red" />
        <FontAwesomeIcon icon={faPenToSquare} color="green" />
        
      </div>
    ),
  },
  {
    user: 2,
    name: "name",
    email: "correo@daryan.com",
    actions: (
      <div className="actions">
        <FontAwesomeIcon icon={faTrash} color="red" />
        <FontAwesomeIcon icon={faPenToSquare} color="green" />
        
      </div>
    ),
  },
];
const columns = [
  {
    name: "Usuario",
    selector: (row) => row.user,
  },
  {
    name: "Nombre",
    selector: (row) => row.name,
  },
  {
    name: "Correo",
    selector: (row) => row.email,
  },
  {
    name: "",
    selector: (row) => row.actions,
  },
  /* {
            name: 'Img',
            selector: row => <>
            <Image 
            src={`https://oasistienda.com/a/uploads/multimedia/${row.file_name}`}
            //   className={styles.vercelLogo}
            alt={row.nombre}
            width={300}
            height={300}
            priority
            />
            </>,
        },*/
];
const Users = () => {
  return (
    <div className="report-cointainer">
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
};

export default Users;
