import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { InputDate, Table } from "../styles/Styles";

const CustomInputD = forwardRef(({ onClick, children }, ref) => (
  <div className="" onClick={onClick} ref={ref}>
    {children}
  </div>
));
CustomInputD.displayName = "CustomInputD";
const DatePickerInput = ({value, setDate, name, id, index}) => {
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
      setDate(name, formattedDateTime, id, index);
      setFormatedDateStart(formattedDateTime);
    }

    return () => {};
  }, [dateStart]);
/*  const handleDate = (e, date) => {
    //setDate(e);
  //  setDate('date', date);
  };*/
  //console.log(formatedDateStart);
  return (
    <Table>
      <div className="">
        <DatePicker
          id="fechaInicio"
          selected={dateStart}
          onChange={(date) => setDateStart(date)}
         // showTimeSelect
          locale="es"
          /*timeFormat="h:mm aa"
          timeIntervals={60}
          timeCaption="Hora"*/
          dateFormat="yyyy-MM-dd"
          customInput={
            <CustomInputD>
              <InputDate type="" name="" value={value} />
            </CustomInputD>
          }
        />
      </div>
    </Table>
  );
};

export default DatePickerInput;
