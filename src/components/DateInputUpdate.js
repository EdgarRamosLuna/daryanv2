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
import { MainContext } from "../context/MainContext";

const CustomInputD = forwardRef(({ onClick, children }, ref) => (
  <div className="" onClick={onClick} ref={ref}>
    {children}
  </div>
));
CustomInputD.displayName = "CustomInputD";
const DatePickerInputU = ({ value, setDate, name, id, index, style, }) => {
  const {dataCDb, setDataCDb} = useContext(MainContext)
  //console.log(value);
  const formatLocalDate = (value, timezone = "America/Monterrey") => {
    // Get the timezone offset in hours
    const timezoneOffset = new Date().getTimezoneOffset() / 60;

    // Adjust the timestamp with the timezone offset
    const adjustedTimestamp = `${value}T00:00:00${
      timezoneOffset >= 0 ? "-" : "+"
    }${Math.abs(timezoneOffset).toString().padStart(2, "0")}:00`;

    // Create a new date object with the adjusted timestamp
    const date = new Date(adjustedTimestamp);

    // Set the timezone for the date object
    date.toLocaleString("en-US", { timeZone: timezone });

    // Format the date as a string with the provided timezone
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day}`;
    console.log(formattedDateTime);
    return formattedDateTime;
  };

  const today = new Date();
  //console.log(value)
  const timezoneOffset = new Date().getTimezoneOffset() / 60;
  
  const [dateStart, setDateStart] = useState(0);
  useEffect(() => {
    const adjustedTimestamp = `${value}T00:00:00${
      timezoneOffset >= 0 ? "-" : "+"
    }${Math.abs(timezoneOffset).toString().padStart(2, "0")}:00`;
    setDateStart(
      value !== "" ? new Date(adjustedTimestamp) : today
    );
  }, [value]);

  const [formatedDateStart, setFormatedDateStart] = useState("");

  const handleChange = useCallback((new_date) => {
    if (new_date !== "") {
      const date = new Date(new_date);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const formattedDateTime = `${year}-${month}-${day}`;
      setDataCDb({
        ...dataCDb,
        [name]: formattedDateTime,
      });
      setFormatedDateStart(formattedDateTime);
      const adjustedTimestamp = `${formattedDateTime}T00:00:00${
        timezoneOffset >= 0 ? "-" : "+"
      }${Math.abs(timezoneOffset).toString().padStart(2, "0")}:00`;
      setDateStart(new Date(adjustedTimestamp));
      if(setDate){
        setDate(name, formattedDateTime, id, index);
      }
   //console.log('entrooo')
    }
  }, [dataCDb]);
  // useEffect(() => {
  //   if (dateStart !== "") {
  //     const date = new Date(dateStart);
  //     const year = date.getFullYear();
  //     const month = ("0" + (date.getMonth() + 1)).slice(-2);
  //     const day = ("0" + date.getDate()).slice(-2);
  //     const formattedDateTime = `${year}-${month}-${day}`;
  //     setDate(name, formattedDateTime, id, index);
  //     setFormatedDateStart(formattedDateTime);
  //   }

  //   return () => {};
  // }, [dateStart]);
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
          onChange={(date) => handleChange(date)}
          locale="es"
          /*
          showTimeSelect
          timeFormat="h:mm aa"
          timeIntervals={60}
          timeCaption="Hora"
          dateFormat="yyyy-MM-dd h:mm aa"*/
          customInput={
            <CustomInputD>
              <InputDate
                type=""
                name=""
                value={formatedDateStart !== "" ? formatedDateStart : value}
                style={style}
                onChange={() => {}}
              />
            </CustomInputD>
          }
        />
      </div>
    </Table>
  );
};

export default DatePickerInputU;
