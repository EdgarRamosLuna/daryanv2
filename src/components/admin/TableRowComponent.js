import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import BtnReportViewPdf from "./BtnReportViewPdf";
import {
    faCalendarDays,
    faFilePdf,
    faTimes,
    faTrash,
    faUsers,
  } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../Checkbox";
const TableRowComponent = ({item, singleView, handleDel, handleCheckBox, getPaginatedData, authClientsC, t, serverNodeUrl}) => {
    const [tablaMuestreo, setTablaMuestreo] = useState(true);
    const toggleCheckbox = (e) =>{
        e.stopPropagation();
        setTablaMuestreo(prev => !prev)
    }
  return (
    <tr onClick={(e) => singleView(item.id)}>
      <td
        className="table-center"
        onClick={(e) => e.stopPropagation()}
        colSpan={1}
      >
        <Checkbox
          type="single"
          id={item.id}
          callback={handleCheckBox}
          data={getPaginatedData()}
        />
      </td>
      <td className="table-center">{item.part_number}</td>
      <td className="table-center">{item.plant}</td>
      <td className="table-center">{item.supplier}</td>
      <td className="table-center">{item.date}</td>
      <td className="table-center">{item.user}</td>
      <td className="table-center">{item.employee}</td>
      <td className="table-center">
        {Number(item.status) === 1 && t("reports.notApproved")}
        {Number(item.status) === 3 && t("reports.approved")}
      </td>
      <td className="table-center"><input type="checkbox" checked={tablaMuestreo} onClick={toggleCheckbox} /></td>
      <td
        className="table-center"
        onClick={(e) => e.stopPropagation()}
        colSpan={1}
      >
        <div className="actions">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDel(item.id, "reports")}
          />
          <BtnReportViewPdf item={item} tablaMuestreo={tablaMuestreo} serverNodeUrl={serverNodeUrl} />
          <FontAwesomeIcon
            icon={faUsers}
            color="green"
            onClick={() => authClientsC(item.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRowComponent;
