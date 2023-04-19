import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Loader from "../Loader";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import StatusBtn from "../StatusBtn";
registerLocale("es", es);
function SuppliersTable({ data }) {

  const {hanldeDel, setShowModalS, updateId, setUpdateId} = useContext(MainContext);
  const [nameFilter, setNameFilter] = useState("");
  const [lastnameFilter, setLastnameFilter] = useState("");
  const today = new Date();
  const sixDaysLater = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);
  const sixDaysBefore = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
  const [dateStart, setDateStart] = useState(sixDaysBefore);
  const [dateEnd, setDateEnd] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [formatedDateStart, setFormatedDateStart] = useState("");
  const [formatedDateEnd, setFormatedDateEnd] = useState("");
  useEffect(() => {
    if (dateStart !== "") {
      const date = new Date(dateStart);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      const formattedDateTime = `${year}-${month}-${day}`;
      setFormatedDateStart(formattedDateTime);
    }
    if (dateEnd !== "") {
      const date = new Date(dateEnd);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      const formattedDateTime = `${year}-${month}-${day}`;
      setFormatedDateEnd(formattedDateTime);
    }
    return () => {};
  }, [dateStart, dateEnd]);
  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };
  const handleLastPageClick = () => {
    setCurrentPage(Math.ceil(filteredData.length / rowsPerPage));
  };
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filterData = useCallback((data) => {
    return data.filter((item) => {
      const name = item.id.toLowerCase();
      const id = item.id.toLowerCase();
      const fullName = `${name} ${id}`; // combinamos name y id en una sola variable
      const date = new Date(item.date).getTime();

      if (nameFilter && fullName.indexOf(nameFilter.toLowerCase()) === -1) {
        // buscamos dentro de fullName
        return false;
      }

      // if (
      //   (dateStart && date < new Date(dateStart).getTime() && dateEnd) ||
      //   date > new Date(dateEnd).getTime()
      // ) {
      //   return false;
      // }
      /*
      if () {
        return false;
      }*/

      return true;
    });
  }, [nameFilter]);

  const filteredData = filterData(data);
  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, rowsPerPage]);
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
  CustomInputD.displayName = "CustomInputD";
  const [checkList, setCheckList] = useState([]);
  const handleCheckBox = (e, type, id) => {
    console.log(type, id);
    const allCheckBox = document.querySelectorAll('input[type="checkbox"]');
    const idM = getPaginatedData().map((data) => data.id);
    const classCheckbox = e.target.classList;
    if (type === "all") {
      if (classCheckbox.length > 1) {
        const clsName = e.target.classList[1];
        if (clsName === "ucAll") {
          setCheckList([]);
          classCheckbox.remove("ucAll");

          allCheckBox.forEach((checkbox) => {
            checkbox.checked = false;
          });
        } else {
          //console.log(id);
          setCheckList(idM);
          allCheckBox.forEach((checkbox) => {
            checkbox.checked = true;
          });
          classCheckbox.add("ucAll");
        }
      } else {
        //console.log(idM);
        setCheckList(idM);
        allCheckBox.forEach((checkbox, index) => {
          checkbox.checked = true;
          if (index !== 0) {
            checkbox.classList.add("ucSingle");
          }
        });
        classCheckbox.add("ucAll");
      }
    }
    if (type === "single") {
      if (classCheckbox.length > 1) {
        const clsName = e.target.classList[1];
        if (clsName === "ucSingle") {
          setCheckList((prev) => prev.filter((data) => data !== id));

          classCheckbox.remove("ucSingle");
        } else {
          setCheckList((prev) => [...prev, id]);
          classCheckbox.add("ucSingle");
        }
      } else {
        setCheckList((prev) => [...prev, id]);
        classCheckbox.add("ucSingle");
      }
    }
    //console.log("Check");
  };
  //console.log(checkList);

  const updateUser = (id_user) =>{
    setUpdateId(id_user);
    setShowModalS(true);
  }
  return (
    <>
     
      <Table>
        <div className="table-container">
          <div className="header-container">
            <form autoComplete="off">
              <div className="filter-container">
                <div className="filter-item">
                  <label htmlFor="name-filter">Buscar usuario:</label>
                  <div className="filter-item-input">
                    <input
                      type="text"
                      id="name-filter"
                      value={nameFilter}
                      onChange={handleNameFilterChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="table-body table-reports">
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo</th>
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
                    <tr key={index}>
                      <td className="table-center">Usuario {item.id}</td>
                      <td className="table-center">correo@email.com</td>
                      <td className="table-center"><StatusBtn status={1} id={item.id} /></td>
                      <td className="table-center">
                        <div className="actions">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() =>
                              hanldeDel(item.id)
                            }
                          ></i>
                          <i className="fa-solid fa-pen-to-square" onClick={() => updateUser(item.id)}></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>
              Página {currentPage} de {totalPages}
            </span>

            <button disabled={currentPage === 1} onClick={handleFirstPageClick}>
              <i className="fa-solid fa-backward-step"></i>
            </button>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={handleLastPageClick}
            >
              <i className="fa-solid fa-forward-step"></i>
            </button>

            <select
              value={rowsPerPage}
              onChange={(event) => setRowsPerPage(parseInt(event.target.value))}
            >
              <option value="20">20 filas por página</option>
              <option value="50">50 filas por página</option>
              <option value="100">100 filas por página</option>
              <option value={`${data.length}`}>todas filas</option>
            </select>
          </div>
        </div>
      </Table>
    </>
  );
}

export default SuppliersTable;
