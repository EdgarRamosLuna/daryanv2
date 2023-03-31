import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { Table } from "../styles/Styles";

const CustomInputD = forwardRef(({ onClick, children }, ref) => (
  <div className="custom-input" onClick={onClick} ref={ref}>
    {children}
    <i className="fa-solid fa-calendar-days"></i>
  </div>
));
CustomInputD.displayName = "CustomInputD";
const DatePickerC = () => {
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
  return (
    <Table>
      <div className="filter-item-input input-date">
        <div className="range">
          <DatePicker
            id="fechaInicio"
            selected={dateStart}
            onChange={(date) => setDateStart(date)}
            showTimeSelect
            locale="es"
            timeFormat="h:mm aa"
            timeIntervals={60}
            timeCaption="Hora"
            dateFormat="yyyy-MM-dd h:mm aa"
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
      </div>
    </Table>
  );
};

export default DatePickerC;
