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
import Checkbox from "../Checkbox";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { Link, useNavigate } from "react-router-dom";
registerLocale("es", es);
const FilterSearch = ({ data }) => {
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

  const filterData = useCallback(
    (data) => {
      return data.filter((item) => {
        const name = item.part_number;
        const id = item.id.toLowerCase();
        const fullName = `${name} ${id}`; // combinamos name y id en una sola variable
        const date = new Date(item.date);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        if (
          nameFilter &&
          fullName.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1
        ) {
          return false;
        }
        if (dateStart && date < new Date(dateStart).setHours(0, 0, 0, 0)) {
          return false;
        }
        if (dateEnd && date > new Date(dateEnd).setHours(23, 59, 59, 999)) {
          return false;
        }
        return true;
      });
    },
    [nameFilter, dateStart, dateEnd, data]
  );

  const filteredData = filterData(data);
  const [sort, setSort] = useState(true);
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

  const [uniqueLots, setUniqueLots] = useState([]);
  const [uniqueSerial, setUniqueSerial] = useState([]);
  const [uniquePart_number, setUniquePart_number] = useState([]);
  useEffect(() => {
    const res1 = [];
    const seen = {};

    data.forEach((item) => {
      item.reports_cc.forEach((report) => {
        if (!seen[report.lot]) {
          seen[report.lot] = true;
          res1.push(report.lot);
        }
      });
    });
    setUniqueLots(res1);

    const res2 = [];
    const seen2 = {};

    data.forEach((item) => {
      item.reports_cc.forEach((report) => {
        if (!seen2[report.serial]) {
          seen2[report.serial] = true;
          res2.push(report.serial);
        }
      });
    });
    setUniqueSerial(res2);
    const res3 = [];
    const seen3 = {};

    data.forEach((item) => {
      if (!seen3[item.part_number]) {
        seen3[item.part_number] = true;
        res3.push(item.part_number);
      }
    });
    setUniquePart_number(res3);

    return () => {};
  }, []);
  const [filterOption, setFilterOption] = useState(1);
  return (
    <div className="header-container">
      <form autoComplete="off">
        <div className="filter-options">
          <div className="filter-items">
            <div className="filter-item">
              <label htmlFor="Lote">Numero de parte</label>
              <input
                type="checkbox"
                value={1}
                onChange={(e) => setFilterOption(e.target.value)}
                checked={Number(filterOption) === 1 ? true : false} 
              />
            </div>
            <div className="filter-item">
              <label htmlFor="Lote">Lote</label>
              <input
                type="checkbox"
                value={2}
                onChange={(e) => setFilterOption(e.target.value)}
                checked={Number(filterOption) === 2 ? true : false} 
              />
            </div>
            <div className="filter-item">
              <label htmlFor="Lote">Serie</label>
              <input
                type="checkbox"
                value={3}
                onChange={(e) => setFilterOption(e.target.value)}
                checked={Number(filterOption) === 3 ? true : false} 
              />
            </div>
          </div>
        </div>
        <div className="filter-container">
          {Number(filterOption) === 1 && (
            <div className="filter-item">
              <label htmlFor="name-filter">Buscar:</label>
              <div className="filter-item-input">
                {/*<label for="ice-cream-choice">Choose a flavor:</label>*/}
                <input list="parts_number" id="part_number" name="part_number" />

                <datalist id="parts_number">
                  {uniquePart_number.map((part_number, indx) => {
                    return (
                      <>
                        <option value={`Numero de parte #${part_number}`} />
                      </>
                    );
                  })}
                </datalist>
                {/*<input
                type="text"
                id="name-filter"
                value={nameFilter}
                onChange={handleNameFilterChange}
              />*/}
              </div>
            </div>
          )}
          {Number(filterOption) === 2 && (
            <div className="filter-item">
              <label htmlFor="name-filter">Buscare:</label>
              <div className="filter-item-input">
                {/*<label for="ice-cream-choice">Choose a flavor:</label>*/}
                <input list="lots" id="lot" name="lot" />

                <datalist id="lots">
                  {uniqueLots.map((lot, indx) => {
                    return (
                      <>
                        <option value={`Lote #${lot}`} />
                      </>
                    );
                  })}
                </datalist>
                {/*<input
                type="text"
                id="name-filter"
                value={nameFilter}
                onChange={handleNameFilterChange}
              />*/}
              </div>
            </div>
          )}
          {Number(filterOption) === 3 && (
            <div className="filter-item">
              <label htmlFor="name-filter">Buscare:</label>
              <div className="filter-item-input">
                {/*<label for="ice-cream-choice">Choose a flavor:</label>*/}
                <input list="serials" id="serial" name="serial" />

                <datalist id="serials">
                  {uniqueSerial.map((serial, indx) => {
                    return (
                      <>
                        <option value={`Serial #${serial}`} />
                      </>
                    );
                  })}
                </datalist>
                {/*<input
                type="text"
                id="name-filter"
                value={nameFilter}
                onChange={handleNameFilterChange}
              />*/}
              </div>
            </div>
          )}
          <div className="filter-item">
            <label htmlFor="date-filter">Buscar por Fecha:</label>

            <div className="filter-item-input input-date">
              <div className="range">
                <DatePicker
                  id="fechaInicio"
                  selected={dateStart}
                  onChange={(date) => setDateStart(date)}
                  locale="es"
                  /*showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={60}
            timeCaption="Hora"
            dateFormat="yyyy-MM-dd h:mm aa"*/
                  customInput={
                    <CustomInputD>
                      <p>
                        Desde:{" "}
                        <span style={{ minWidth: "90px", maxWidth: "100px" }}>
                          {formatedDateStart !== "" ? formatedDateStart : ""}
                        </span>
                      </p>
                    </CustomInputD>
                  }
                />
              </div>
              <div className="range">
                <DatePicker
                  id="fechaInicio"
                  selected={dateEnd}
                  onChange={(date) => setDateEnd(date)}
                  locale="es"
                  /*showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={60}
            timeCaption="Hora"
            dateFormat="yyyy-MM-dd h:mm aa"*/
                  customInput={
                    <CustomInputD>
                      <p>
                        Hasta:
                        <span style={{ minWidth: "90px", maxWidth: "100px" }}>
                          {formatedDateEnd !== "" ? formatedDateEnd : ""}
                        </span>
                      </p>
                    </CustomInputD>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterSearch;
