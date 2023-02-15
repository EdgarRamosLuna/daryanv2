import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MainContext } from "../../context/MainContext";
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
    id: 1,
    date: "14/02/2023 11:29 a. m.",
  },
  {
    id: 2,
    date: "14/02/2023 10:50 a. m.",
  },
];
const columns = [
  {
    name: "Id Reporte",
    selector: (row) => row.id,
  },
  {
    name: "Fecha",
    selector: (row) => row.date,
  },
  {
    name: "Descargar Reporte",
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

const Reports = () => {
  const { dataSes, dataT, dataTS, reportData } = useContext(MainContext);
  //console.log(dataT);
  const [dataTa, setDataTa] = useState([]);
  useEffect(() => {
    const date = new Date();

    let dateFormatter = new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    let timeFormatter = new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    let formattedDatef =
      dateFormatter.format(date) + " " + timeFormatter.format(date);
    //console.log(formattedDatef);
    dataT.forEach((element, index) => {
      console.log(index);
      setDataTa((prev) => [
        ...prev,
        {
          id: index + 1,
          date: formattedDatef,
          actions: (
            <div className="actions">
              <a href="/assets/reporte.pdf" download>
                <FontAwesomeIcon icon={faFilePdf} color="brown" />
              </a>
            </div>
          ),
        },
      ]);
    });
    return () => {};
  }, [reportData]);
  console.log(dataTa.sort((a, b) => b.id - a.id));
  return (
    <div className="report-cointainer">
      <DataTable columns={columns} data={dataTa} pagination />
    </div>
  );
};

export default Reports;
