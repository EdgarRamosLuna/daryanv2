import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Loader from "../Loader";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import StatusBtn from "../StatusBtn";
import { useTranslation } from "react-i18next";
import ComponentPagination from "../ComponentPagination";
import { Grid, TextField } from "@mui/material";

registerLocale("es", es);
function EmployeesTable({ data }) {
  const { t } = useTranslation();
  const {
    handleDel,
    setShowModalE,
    updateId,
    setUpdateId,
    isLoading,
    setIsLoading,
  } = useContext(MainContext);
  
  const [nameFilter, setNameFilter] = useState("");
  const today = new Date();
  const sixDaysBefore = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
  const [dateStart, setDateStart] = useState(sixDaysBefore);
  const [dateEnd, setDateEnd] = useState(today);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [formatedDateStart, setFormatedDateStart] = useState("");
  const [formatedDateEnd, setFormatedDateEnd] = useState("");
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [data]);
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

  const filterData = useCallback(() => {
    return data.filter((item) => {
      const name = item.fullname.toLowerCase();      
      const email = item.email.toLowerCase();
      const id = item.id.toLowerCase();
      const fullName = `${name} ${email}`; // combinamos name y id en una sola variable
      const date = new Date(item.date).getTime();

      if (nameFilter && fullName.indexOf(nameFilter.toLowerCase()) === -1) {
        // buscamos dentro de fullName
        return false;
      }      

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
  CustomInputD.displayName = "CustomInputD";


  const updateUser = (id_user) =>{
    setUpdateId(id_user);
    setShowModalE(true);
  }
  return (
    <>
      <Table>
        <div className="table-container">         
          <div className="header-container">
            <form autoComplete="off">
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label htmlFor="name-filter">{t("Buscar empleado")}:</label>
                <Grid
                  className=""
                  sx={{
                    width: "50%",
                  }}
                >
                  <TextField
                    type="text"
                    id="name-filter"
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                    placeholder={t("employees_section.table.placeholder")}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </div>
          <div className="table-body table-reports">
            <table>
              <thead>
                <tr>
                  <th>{t('clients_section.username')}</th>
                  <th>{t('clients_section.email')}</th>
                  <th>{t('reports.status')}</th>
                  <th>{t('reports.actions')}</th>
                </tr>
              </thead>
              <tbody>
                <div className={isLoading === false ? "loaderContainer" : ""}>
                  <Loader>
                    <img src="/assets/img/loading2.svg" alt="" />
                  </Loader>
                </div>
                {getPaginatedData().length === 0 ? (
                  <tr>
                    <td colSpan="4" className="table-center" style={{opacity:`${isLoading ? 0 : 1}`}}>
                      <h1>{t('reports.no_data_in_database')}</h1>
                    </td>
                  </tr>
                ) : (
                  getPaginatedData().map((item, index) => (
                    <tr
                      key={index}
                      className={
                        isLoading === false ? "tr-h rloaderContainer" : "tr-hd"
                      }
                    >
                      <td className="table-center">{item.fullname}</td>
                      <td className="table-center">{item.email}</td>
                      <td className="table-center" style={{width:120, padding:'0 25px'}}>
                        <StatusBtn 
                          status={Number(item.status)}
                          id={item.id}
                          table="employees"
                        />
                      </td>
                      <td className="table-center">
                        <div className="actions">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDel(item.id, "employees")}
                          ></i>
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => updateUser(item.id)}
                          ></i>
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
        </div>
      </Table>
    </>
  );
}

export default EmployeesTable;
