import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { faFilePdf, faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Loader from "../Loader";
import Checkbox from "../Checkbox";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComponentPagination from "../ComponentPagination";
import DatePickerMUI2 from "../datepicker/DatePickerMUI2";
import NoInfo from "../helpers/NoInfo";
registerLocale("es", es);
function ReportsByH({ data, dateStart, dateEnd, loader, setDateEnd }) {
  console.log(data);

  const { activeTab, setActiveTab, checkList, setCheckList, handleCheckBox } =
    useContext(MainContext);
  const [nameFilter, setNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };
  const handleLastPageClick = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };
  const filterData = useCallback(() => {
    return data.filter((item) => {
      const name = item.client;
      const id = item.id.toLowerCase();
      const plant = item.plant.toLowerCase();
      const part_number = item.part_number;
      const fullName = `${name} ${id} ${plant} ${part_number}`; // combinamos name y id en una sola variable
      const date = new Date(item.date);
      date.setHours(0, 0, 0, 0);

      // const date = new Date(item.date);
      // date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      if (
        nameFilter &&
        fullName.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1
      ) {
        //console.log(fullName.slice(3, 4));
        return false;
      }
      if (dateStart) {
        const startDate = new Date(dateStart);
        startDate.setHours(0, 0, 0, 0);
        if (date < startDate) {
          return false;
        }
      }

      if (dateEnd) {
        const endDate = new Date(dateEnd);
        endDate.setHours(23, 59, 59, 999);
        if (date > endDate) {
          return false;
        }
      }
      /*
      if () {
        return false;
      }*/

      return true;
    });
  }, [nameFilter, dateStart, dateEnd, data]);

  const filteredData = filterData();
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
      <i className="fa-solid fa-calendar-days"></i>
    </div>
  ));
  const handleNameFilterChange = (event) => {
    const value = event.target.value;
    setNameFilter(value);
    //debounceSetNameFilter(value);
  };
  CustomInputD.displayName = "CustomInputD";
  //console.log(checkList);
  const navigate = useNavigate();
  const singleView = (id) => {
    navigate(`/admin/reports_by_h/${id}`);
  };

  const tabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* <div className="header-container">
          <form autoComplete="off">
            <div className="filter-container">
              <div className="filter-item">
                <label htmlFor="date-filter" className="label-center">
                  Buscar por Fecha:
                </label>

                <div className="filter-item-input input-date">
                  <DatePickerMUI2
                    setDateStart={setDateStart}
                    setDateEnd={setDateEnd}
                  />
                </div>
              </div>
              <div className="filter-item">
                <label htmlFor="name-filter" className="label-center">
                  Buscar:
                </label>
                <div className="filter-item-input">
                  <input
                    type="text"
                    id="name-filter"
                    value={nameFilter}
                    onChange={(e) => handleNameFilterChange(e)}
                    placeholder="Proveedor, #Parte, #Lote, #Serie, #Planta"
                  />
                </div>
              </div>
            </div>
          </form>
        </div> */}
      <Table>
        <div className="table-container">
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
                  <th>Fecha</th>
                  <th>Status</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <div className={loader === false ? "loaderContainer" : ""}>
                  <Loader>
                    <img src="/assets/img/loading2.svg" alt="" />
                  </Loader>
                </div>
                {getPaginatedData().length === 0 ? (
                  <NoInfo />
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
                      {/* <td className="table-center">Proveedor</td> */}
                      <td className="table-center">{item.date}</td>
                      <td className="table-center">
                        {Number(item.status) === 1 && "Sin aprobar"}{" "}
                        {Number(item.status) === 2 && "Aprobado"}
                      </td>
                      <td
                        className="table-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="actions">
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
            totalEntries={data.length}
          />
        </div>
      </Table>
    </>
  );
}

export default ReportsByH;
