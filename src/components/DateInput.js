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
const DatePickerInput = ({ value, setDate, name, id, index, style, handleDate }) => {
  const today = new Date();
  const [dateStart, setDateStart] = useState(today);
  const [formatedDateStart, setFormatedDateStart] = useState("");
  useEffect(() => {
    if (dateStart !== "") {
      const date = new Date(dateStart);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const formattedDateTime = `${year}-${month}-${day}`;
      setDate(name, formattedDateTime, id, index);
      setFormatedDateStart(formattedDateTime);
    }

    return () => {};
  }, [dateStart]);

  const callbackDate = () =>{
    if(["function"].includes(typeof handleDate)){
      handleDate()
    }
  }
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
                type="text"
                name=""
                defaultValue={value !== "" ?  value :(value === '' ? '' : formatedDateStart )}
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

export default DatePickerInput;
