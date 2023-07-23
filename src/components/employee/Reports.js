import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";

import es from "date-fns/locale/es";
import Loader from "../Loader";
import Checkbox from "../Checkbox";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuthClients, getClientsInfo } from "../../api/daryan.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFilePdf,
  faTimes,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { ModalCard } from "../../styles/ModalCard";
import FilterTable from "./FilterTable";
import ReportsByH from "./ReportsByH";
import ComponentPagination from "../ComponentPagination";
import TabContainer from "../tabs/TabContainer";
import { TextField } from "@mui/material";
import DatePickerRange from "../datepicker/DateRangePicker";
registerLocale("es", es);
function ReportsTable({ data, dataReportByH }) {
  const {
    handleDel,
    toast,
    activeTab,
    uniqueClients,
    setUniqueClients,
    clientsToReport,
    setClientsToReport,
    setShowModalAuth,
    setAuthClientsT,
    firstDayOfYear,
    handleCheckBox,
  } = useContext(MainContext);
  const [nameFilter, setNameFilter] = useState("");
  const today = new Date();
 
  const [dateStart, setDateStart] = useState(firstDayOfYear);
  const [dateEnd, setDateEnd] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [formatedDateStart, setFormatedDateStart] = useState("");
  const [formatedDateEnd, setFormatedDateEnd] = useState("");

  const [uniqueLots, setUniqueLots] = useState([]);
  const [uniqueSerial, setUniqueSerial] = useState([]);
  const [uniqueSuppliers, setUniqueSuppliers] = useState([]);
  const [uniquePart_number, setUniquePart_number] = useState([]);
  const [filterOption, setFilterOption] = useState(0);
  const [clients, setClients] = useState([]);
  const authClientsC = async (id) => {
    //getAuthClients
    await getAuthClients({ id })
      .then((res) => {
        const datares = res.data;
        if (datares.error) {
          toast.error(datares.message, {
            duration: 5000,
          });
        } else {
          setAuthClientsT(res.data);
          setShowModalAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const clients = async () => {
      await getClientsInfo()
        .then((res) => {
          if (res.data) {
            setClients(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    clients();
  }, []);
  useEffect(() => {
    setDateStart(firstDayOfYear);
    setDateEnd(today);
    return () => {};
  }, [activeTab]);

  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };
  const handleLastPageClick = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };
  const [filtersSerial, setFiltersSerial] = useState([]);
  const [filtersLot, setFiltersLot] = useState([]);
  const [filtersPartNumber, setFiltersPartNumber] = useState([]);
  const [filtersSupplier, setFiltersSupplier] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedClient, setSelectedClient] = useState("0");
  const handleNameFilterChange = (event) => {
    const value = event.target.value;
    setNameFilter(value);
    //debounceSetNameFilter(value);
  };

  const filterData = useCallback(
    (data) => {
      let dataId = 0;
      return data.filter((item, index) => {
        const part_number = item.part_number;
        const id = item.id.toLowerCase();
        const id_supplier = item.id_supplier;
        const suppliers = item.supplier.toLowerCase();
        const planta = item.plant.toLowerCase();
        const fullName = `${id}${id_supplier} ${part_number}${item.reports_cc
          .map((cc) => cc.lot)
          .join(", ")} ${item.reports_cc
          .map((cc) => cc.serial)
          .join(", ")} ${suppliers} ${planta} `; // combinamos name, id y lot en una sola variable
        // const date = new Date(item.date);
        // date.setHours(0, 0, 0, 0);

        // const date = new Date(item.date);
        // date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        if (
          nameFilter &&
          fullName.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1
        ) {
          //console.log(fullName.slice(3, 4));
          return false;
        }
        // if (dateStart) {
        //   const startDate = new Date(dateStart);
        //   startDate.setHours(0, 0, 0, 0);
        //   if (date < startDate) {
        //     return false;
        //   }
        // }

        // if (dateEnd) {
        //   const endDate = new Date(dateEnd);
        //   endDate.setHours(23, 59, 59, 999);
        //   if (date > endDate) {
        //     return false;
        //   }
        // }

        // if (dateStart && date < new Date(dateStart).setHours(0, 0, 0, 0)) {
        //   return false;
        // }
        // if (dateEnd && date > new Date(dateEnd).setHours(23, 59, 59, 999)) {
        //   return false;
        // }
        if (nameFilter.length > 3) {
          dataId = id_supplier;
          //setIdSupplier(id_supplier)
        }
        return true;
      });
    },
    [nameFilter, dateStart, dateEnd]
  );

  useEffect(() => {
    const data = getPaginatedData();

    if (data.length > 0) {
      const uniqueValues = Array.from(
        new Set(data.map((item) => item.id_supplier))
      );
      const options = uniqueValues.map((value) => ({ id_supplier: value }));
      if (options.length === 1) {
        const id_supplier = options[0].id_supplier;
        const newD = clients.filter((client) => {
          if (Number(client.id_supplier) === Number(id_supplier)) {
            return client;
          } else {
            setClientsToReport([]);
            setSelectedClient("0");
            return false;
          }
        });

        setUniqueClients(newD);
      }
      if (nameFilter === "") {
        setUniqueClients([]);
        setClientsToReport([]);
      }
    }
  }, [nameFilter, clients]);

  //console.log(uniqueClients);

  const filteredData = filterData(data);

  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = useCallback(
    (currentPage) => {
      if (currentPage < 1) {
        setCurrentPage(1);
      } else if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(currentPage);
      }
    },
    [totalPages, currentPage]
  );
  const CustomInputD = forwardRef(({ onClick, children }, ref) => (
    <div className="custom-input" onClick={onClick} ref={ref}>
      {children}
      <FontAwesomeIcon icon={faCalendarDays} />
      {/* <i className="fa-solid fa-calendar-days"></i> */}
    </div>
  ));
  CustomInputD.displayName = "CustomInputD";

  const navigate = useNavigate();
  const singleView = (id) => {
    // window.location.href = `/admin/reports/${id}`;
    navigate(`/admin/reports_insp/${id}`);
  };

  useEffect(() => {
    if (data.length !== 0) {
      const res0 = [];
      const seen0 = {};

      data.forEach((item) => {
        if (!seen0[item.supplier]) {
          seen0[item.supplier] = true;
          res0.push(item.supplier);
        }
      });
      setUniqueSuppliers([...new Set(res0)]);
      //}

      const res1 = [];
      const seen = {};

      data.forEach((item) => {
        if (filtersPartNumber.includes(item.part_number)) {
          item.reports_cc.forEach((report) => {
            if (filtersSupplier.includes(item.supplier)) {
              if (filtersSerial.length > 0) {
                if (filtersSerial.includes(report.serial)) {
                  if (!seen[report.lot]) {
                    seen[report.lot] = true;
                    res1.push(report.lot);
                  }
                }
              } else {
                if (!seen[report.lot]) {
                  seen[report.lot] = true;
                  res1.push(report.lot);
                }
              }
            }
          });
        }
      });
      setUniqueLots([...new Set(res1)]);

      const res2 = [];
      const seen2 = {};

      data.forEach((item) => {
        if (filtersPartNumber.includes(item.part_number)) {
          item.reports_cc.forEach((report) => {
            if (filtersSupplier.includes(item.supplier)) {
              if (filtersLot.length > 0) {
                if (filtersLot.includes(report.lot)) {
                  if (!seen2[report.serial]) {
                    seen2[report.serial] = true;
                    res2.push(report.serial);
                  }
                }
              } else {
                if (!seen2[report.serial]) {
                  seen2[report.serial] = true;
                  res2.push(report.serial);
                }
              }
            }
          });
        }
      });
      setUniqueSerial([...new Set(res2)]);

      const res3 = [];
      const seen3 = {};

      data.forEach((item) => {
        if (filtersSupplier.includes(item.supplier)) {
          if (!seen3[item.part_number]) {
            seen3[item.part_number] = true;
            res3.push(item.part_number);
          }
        } else {
        }
      });

      setUniquePart_number(res3);
    }

    return () => {};
  }, [
    data,
    filtersPartNumber,
    filterOption,
    filtersSerial,
    filtersLot,
    filtersSupplier,
  ]);

  useEffect(() => {
    const cleanFilters = () => {
      setFiltersLot([]);
      setFiltersPartNumber([]);
    };
    if (filterOption === "1" && filtersSupplier.length === 0) {
      toast.error(
        "Debes seleccionar almenos 1 proveedor para obtener los numeros de parte disponibles",
        {
          duration: 5000,
        }
      );
      setFilterOption(0);
      cleanFilters();
    } else {
      const inputsWithDataList = document.querySelectorAll("input[list]");
      inputsWithDataList.forEach((input) => {
        if (input !== null) {
          input.focus();
          input.select();
        }
      });
    }
    if (filterOption === "2" && filtersPartNumber.length === 0) {
      toast.error(
        "Debes seleccionar almenos 1 numero de parte para obtener los numeros de lote disponibles",
        {
          duration: 5000,
        }
      );
      setFilterOption(1);
      cleanFilters();
    } else {
      const inputsWithDataList = document.querySelectorAll("input[list]");
      inputsWithDataList.forEach((input) => {
        if (input !== null) {
          input.focus();
          input.select();
        }
      });
    }
    if (filterOption === "3" && filtersPartNumber.length === 0) {
      toast.error(
        "Debes seleccionar almenos 1 numero de parte para obtener los numeros de serie disponibles",
        {
          duration: 5000,
        }
      );
      cleanFilters();
      setFilterOption(1);
    } else {
      const inputsWithDataList = document.querySelectorAll("input[list]");
      inputsWithDataList.forEach((input) => {
        if (input !== null) {
          input.focus();
          //setNameFilter('2')
          input.select();
        }
      });
    }
  }, [filterOption, filtersPartNumber, filtersSupplier, toast]);

  const addClientToList = (e) => {
    const id = e.target.value;
    setSelectedClient(id);
    const clientName = e.target.selectedOptions[0].text;
    setClientsToReport((prev) => {
      if (!prev.some((client) => client.id === id) && id !== "0") {
        return [...prev, { id, clientName }];
      }
      return prev;
    });
  };

  //console.log(clientsToReport);
  const removeClient = (id) => {
    setClientsToReport((prev) => prev.filter((client) => client.id !== id));
  };

  const reportesComponents = {
    insp: {
      p: <p>Reportes de inspeccion</p>,
    },
    byh: {
      p: <p>Reportes por hora</p>,
    },
    total_insp: {
      p: <p>Totales reportes de inspeccion</p>,
    },
  };

  const tabContent = {
    1: {
      componenteTitle: reportesComponents["insp"].p,
      componenteTop: <></>,
      componenteMiddle: <></>,
      componenteBottom: <></>,
    },
    2: {
      componenteTitle: reportesComponents["byh"].p,
      componenteTop: <></>,
      componenteMiddle: (
        <ReportsByH
          data={dataReportByH}
          dateStart={dateStart}
          dateEnd={dateEnd}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
        />
      ),
    },
  };
  return (
    <>
      <Table>
        <div className="table-container mb-5">
          <TabContainer
            tabChildren1={
              <ReportsInspection
                setDateStart={setDateStart}
                setDateEnd={setDateEnd}
                nameFilter={nameFilter}
                handleNameFilterChange={handleNameFilterChange}
                uniqueClients={uniqueClients}
                selectedClient={selectedClient}
                addClientToList={addClientToList}
                clientsToReport={clientsToReport}
                removeClient={removeClient}
                getPaginatedData={getPaginatedData}
                singleView={singleView}
                handleCheckBox={handleCheckBox}
                handleDel={handleDel}
                authClientsC={authClientsC}
                totalPages={totalPages}
                handleFirstPageClick={handleFirstPageClick}
                handlePageChange={handlePageChange}
                handleLastPageClick={handleLastPageClick}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                data={data}
      
              />
            }
          />
        </div>
      </Table>
    </>
  );
}

export default ReportsTable;

export const ReportsInspection = ({
  setDateStart,
  setDateEnd,
  nameFilter,
  handleNameFilterChange,
  uniqueClients,
  selectedClient,
  addClientToList,
  clientsToReport,
  removeClient,
  getPaginatedData,
  singleView,
  handleCheckBox,
  handleDel,
  authClientsC,
  currentPage,
  totalPages,
  handleFirstPageClick,
  handlePageChange,
  handleLastPageClick,
  rowsPerPage,
  setRowsPerPage,
  data,

}) => {
  return (
    <>
      <div className="header-container">
        <form autoComplete="off">
          <DatePickerRange
          
          />
          {/* <DatePickerMUI setDateStart={setDateStart} setDateEnd={setDateEnd} /> */}
          <div className="filter-container">
            <div className="filter-item"></div>
          </div>
          <div className="filter-item">
            <TextField
              id="outlined-basic"
              label="Buscar"
              variant="outlined"
              autoComplete="off"
              sx={{
                width: "95%",
              }}
              type="text"
              name="buscar"
              value={nameFilter}
              onChange={(e) => handleNameFilterChange(e)}
              placeholder="Proveedor, #Parte, #Lote, #Serie, #Planta"
          
            />
          </div>
        </form>

        <div
          className="clients-container"
          style={{
            visibility: uniqueClients.length > 0 ? "visible" : "hidden",
          }}
        >
          <div className="select-container">
            <select value={selectedClient} onChange={addClientToList}>
              <option value="0" selected>
                Selecciona un cliente
              </option>
              {uniqueClients.map((option) => (
                <option key={option} value={option.id}>
                  {option.fullname}
                </option>
              ))}
            </select>
          </div>
          <div className="list-container">
            <div className="item-list">
              <ul
                style={{
                  display: `${clientsToReport.length > 0 ? "flex" : "none"}`,
                }}
              >
                {clientsToReport.map((client, ind) => (
                  <li key={ind}>
                    <span>{client.clientName}</span>
                    <span onClick={() => removeClient(client.id)}>
                      <FontAwesomeIcon icon={faTimes} color="rgb(87, 0, 0)" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      ;
      <div className="table-body table-reports">
        <table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  type="all"
                  id={0}
                  callback={handleCheckBox}
                  data={getPaginatedData()}
                />
              </th>
              <th># Parte</th>
              <th>Planta</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().length === 0 ? (
              <Loader>
                <img src="/assets/img/loading2.svg" alt="" />
              </Loader>
            ) : (
              getPaginatedData().map((item, index) => (
                <tr key={index} onClick={(e) => singleView(item.id)}>
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
                  <td className="table-center">
                    {Number(item.status) === 1 && "Sin aprobar"}{" "}
                    {Number(item.status) === 3 && "Aprobado"}
                  </td>
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
                      <a
                        href={`/reporte_inspeccion/${item.id}`}
                        target="_blank"
                        className="btn-pdf"
                        rel="noreferrer"
                      >
                        {!navigator.onLine ? (
                          <FontAwesomeIcon icon={faFilePdf} />
                        ) : (
                          <i className="fa-solid fa-file-pdf"></i>
                        )}
                      </a>
                      <FontAwesomeIcon
                        icon={faUsers}
                        color="green"
                        onClick={() => authClientsC(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ComponentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleFirstPageClick={handleFirstPageClick}
        handlePageChange={handlePageChange}
        handleLastPageClick={handleLastPageClick}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        data={data.length}
      />
    </>
  );
};
