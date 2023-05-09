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
import FilterSearch from "./FilterSearch";
import TableTotals from "./TableTotals";
import TableComponent from "./TableComponent";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
registerLocale("es", es);
function ReportsTable({ data }) {
  const { handleDel, setSort, toast } = useContext(MainContext);
  const [nameFilter, setNameFilter] = useState("");
  const [nameFilter2, setNameFilter2] = useState("");
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
  const [checkList, setCheckList] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [uniqueLots, setUniqueLots] = useState([]);
  const [uniqueSerial, setUniqueSerial] = useState([]);
  const [uniqueSuppliers, setUniqueSuppliers] = useState([]);
  const [uniquePart_number, setUniquePart_number] = useState([]);
  const [filterOption, setFilterOption] = useState(0);
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
  const [filtersSerial, setFiltersSerial] = useState([]);
  const [filtersLot, setFiltersLot] = useState([]);
  const [filtersPartNumber, setFiltersPartNumber] = useState([]);
  const [filtersSupplier, setFiltersSupplier] = useState([]);
  const [loader, setLoader] = useState(false);
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleNameFilterChange2 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "" && uniquePart_number.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniquePart_number
      setLoader(true);
      setTimeout(() => {
        setFiltersPartNumber((prev) => {
          if (prev.includes(value)) {
            return prev.map((filter) => {
              if (filter === value) {
                return value;
              }
              return filter;
            });
          } else {
            return [...prev, value];
          }
        });
        setLoader(false);
      }, 1000);
    }
  };
  const handleNameFilterChange3 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "" && uniqueLots.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniqueLots
      setLoader(true);

      setTimeout(() => {
        setFiltersLot((prev) => {
          if (prev.includes(value)) {
            return prev.map((filter) => {
              if (filter === value) {
                return value;
              }
              return filter;
            });
          } else {
            return [...prev, value];
          }
        });
        setLoader(false);
      }, 1000);
    }
    /*setNameFilter2(event.target.value);
    setFiltersLot(prev => {
      if (prev.includes(event.target.value)) {
        return prev.map(filter => {
          if (filter === event.target.value) {
            return event.target.value;
          }
          return filter;
        });
      } else {
        return [...prev, event.target.value];
      }
    });*/
  };

  /*const handleNameFilterChange4 = (event) => {
    setNameFilter2(event.target.value);
    setFiltersSerial((prev) => {
      if (!prev.includes(event.target.value)) {
        return [...prev, event.target.value];
      }
      return prev;
    });
  };*/
  //console.log(filtersPartNumber);
  const handleNameFilterChange4 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "" && uniqueSerial.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniquePart_number
      setLoader(true);
      setTimeout(() => {
        setFiltersSerial((prev) => {
          if (prev.includes(value)) {
            return prev.map((filter) => {
              if (filter === value) {
                return value;
              }
              return filter;
            });
          } else {
            return [...prev, value];
          }
        });
        setLoader(false);
      }, 1000);
    }
  };
  const handleNameFilterChange5 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "") {
      // Verifica que el valor no esté vacío y existe en uniquePart_number
      setLoader(true);
      setTimeout(() => {
        setFiltersSupplier((prev) => {
          if (prev.includes(value)) {
            return prev.map((filter) => {
              if (filter === value) {
                return value;
              }
              return filter;
            });
          } else {
            return [...prev, value];
          }
        });
        setLoader(false);
      }, 1000);
    }
  };
  const filterData = useCallback(
    (data) => {
      return data.filter((item, index) => {
        const part_number = item.part_number;
        const id = item.id.toLowerCase();
        const suppliers = item.supplier.toLowerCase();
        const planta = item.plant.toLowerCase();
        const fullName = `${part_number} ${id} ${item.reports_cc
          .map((cc) => cc.lot)
          .join(", ")} ${item.reports_cc
          .map((cc) => cc.serial)
          .join(", ")} ${suppliers} ${planta} `; // combinamos name, id y lot en una sola variable
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
  const filterData2 = useCallback(
    (data) => {
      return data.filter((item, index) => {
        const part_number = item.part_number;
        const id = item.id.toLowerCase();
        const fullName = `${part_number} ${id} ${item.reports_cc
          .map((cc) => cc.lot)
          .join(", ")} ${item.reports_cc.map((cc) => cc.serial).join(", ")}`; // combinamos name, id y lot en una sola variable
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
  const [totalFiltered, setTotalFiltered] = useState([]);
  const [dataToTable, setDataToTable] = useState([]);
  const [totalGeneral, setTotalGeneral] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      const filterDate = new Date("2023-04-13");
      //const filterLot = "30";
      const filterLot = filtersLot;
      const filterSerial = filtersSerial;
      const filterPartNumber = filtersPartNumber;
      const filterSupplier = filtersSupplier;
      const temp = {};
      const temp2 = {};
      //console.log(filterLot);
      // Definir las fechas del filtro
      const startDate = dateStart;
      const endDate = dateEnd;

      //    let total_inspected = 0;
      for (let i = 0; i < data.length; i++) {
        const date = new Date(data[i].date);
        const report_totals = data[i].report_totals;
        const report_id = data[i].report_id;
        const ng = parseInt(report_totals.ng) || 0;
        const ok = parseInt(report_totals.ok) || 0;
        const rework = parseInt(report_totals.rework) || 0;
        const reports_cc = data[i].reports_cc;
        const reports_in = data[i].reports_in;
        let total_inspected = 0;
        let total_ng_pieces = 0;
        let total_ok_pieces = 0;
        let total_re_work_parts = 0;
        let total_scrap = 0;
        let total_A = 0;
        let partNumber = data[i].part_number; // Nuevo filtro de búsqueda
        let worked_h = Number(data[i].worked_h);
        let supplier = data[i].supplier;
        // Calcular el total inspeccionado

        for (let j = 0; j < reports_cc.length; j++) {
          const report_cc = reports_cc[j];
          const isLotMatched =
            !filterLot.length || filterLot.includes(report_cc.lot);
          const isSerialMatched =
            !filterSerial.length || filterSerial.includes(report_cc.serial);
          const isSupplierMatched =
            !filterSupplier.length || filterSupplier.includes(supplier);
          if (isLotMatched && isSerialMatched) {
            total_inspected += parseInt(report_cc.qt_inspected);
            total_ng_pieces += parseInt(report_cc.ng_pieces);
            total_ok_pieces += parseInt(report_cc.ok_pieces);
            total_re_work_parts += parseInt(report_cc.re_work_parts);
            total_scrap += parseInt(report_cc.scrap);
            total_A += parseInt(report_cc["A"]);
            console.log(parseInt(report_cc["A"]));
          }
        }
        // Aplicar filtros para cada objeto en el data
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

        const dateString = date.toISOString().slice(0, 10);
        if (
          (filterLot.length &&
            !reports_cc.some((report) => filterLot.includes(report.lot))) ||
          (filterSerial.length &&
            !reports_cc.some((report) =>
              filterSerial.includes(report.serial)
            )) ||
          (filterPartNumber.length && !filterPartNumber.includes(partNumber)) || // Nueva condición para el filtro de búsqueda de part_number
          (filterSupplier.length && !filterSupplier.includes(supplier)) ||
          (filterDate &&
            (date < new Date(startDate).setHours(0, 0, 0, 0) ||
              date > new Date(endDate).setHours(23, 59, 59, 999)))
        ) {
          continue; // Saltar a la siguiente iteración del loop
        }

        // Agregar los datos al objeto temporal

        const min = 1000000;
        const max = 9000000;

        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        // temp[i] = {
        //   part_number: partNumber,
        //   total_inspected: total_inspected,
        //   total_ng_pieces: total_ng_pieces,
        //   total_ok_pieces: total_ok_pieces,
        //   total_re_work_parts: total_re_work_parts,
        //   total_scrap: total_scrap,
        //   total_A: total_A,
        // };
        // temp[partNumber] = {
        //   part_number: partNumber,
        //   total_inspected: total_inspected,
        //   total_ng_pieces: total_ng_pieces,
        //   total_ok_pieces: total_ok_pieces,
        //   total_re_work_parts: total_re_work_parts,
        //   total_scrap: total_scrap,
        //   total_A: total_A,
        // };

        /*  if (dateString in temp2) {
          temp2[dateString].part_number = partNumber;
          temp2[dateString].total_inspected += total_inspected;
          temp2[dateString].total_ng_pieces += total_ng_pieces;
          temp2[dateString].total_ok_pieces += total_ok_pieces;
          temp2[dateString].total_re_work_parts += total_re_work_parts;
          temp2[dateString].total_scrap += total_scrap;
          temp2[dateString].total_A += total_A;
        } else {
          //  console.log(partNumber);
          temp2[dateString] = {
            part_number: partNumber,
            total_inspected: total_inspected,
            total_ng_pieces: total_ng_pieces,
            total_ok_pieces: total_ok_pieces,
            total_re_work_parts: total_re_work_parts,
            total_scrap: total_scrap,
            total_A: total_A,
            date: dateString
          };
        }*/
        temp2[i] = {
          part_number: partNumber,
          total_inspected: total_inspected,
          total_ng_pieces: total_ng_pieces,
          total_ok_pieces: total_ok_pieces,
          total_re_work_parts: total_re_work_parts,
          total_scrap: total_scrap,
          // total_A: total_A,
          date: dateString,
          worked_h: worked_h,
        };
        if (partNumber in temp) {
          temp[partNumber].part_number = partNumber;
          temp[partNumber].total_inspected += total_inspected;
          temp[partNumber].total_ng_pieces += total_ng_pieces;
          temp[partNumber].total_ok_pieces += total_ok_pieces;
          temp[partNumber].total_re_work_parts += total_re_work_parts;
          temp[partNumber].total_scrap += total_scrap;
          //   temp[partNumber].total_A += total_A;
          temp[partNumber].date += dateString;
          temp[partNumber].worked_h += worked_h;
        } else {
          //  console.log(partNumber);
          temp[partNumber] = {
            part_number: partNumber,
            total_inspected: total_inspected,
            total_ng_pieces: total_ng_pieces,
            total_ok_pieces: total_ok_pieces,
            total_re_work_parts: total_re_work_parts,
            total_scrap: total_scrap,
            //    total_A: total_A,
            date: dateString,
            worked_h: worked_h,
          };
        }
      }

      /* const groupedData = {};

      for (const date in temp) {
        const item = temp[date];
        const partNumber = item.part_number;

        if (!groupedData[partNumber]) {
          groupedData[partNumber] = [];
        }

        const newItem = {
          ...item,
          date,
        };

        groupedData[partNumber].push(newItem);
      }*/
      setTotalFiltered(temp);
      const groupedData = Object.values(temp2).reduce((acc, curr) => {
        const { part_number, date, ...rest } = curr;
        if (!acc[part_number]) {
          acc[part_number] = {};
        }
        if (!acc[part_number][date]) {
          acc[part_number][date] = { ...rest, date };
        } else {
          Object.entries(rest).forEach(([key, value]) => {
            if (key === "date") {
              return;
            }
            acc[part_number][date][key] += value;
          });
        }
        return acc;
      }, {});

      const summedData = {};
      Object.entries(groupedData).forEach(([part_number, dates]) => {
        summedData[part_number] = [];
        Object.entries(dates).forEach(([date, values]) => {
          summedData[part_number].push(values);
        });
      });

      // console.log(JSON.stringify(groupedData));
      // const groupedData = Object.values(temp2).reduce((acc, curr) => {
      //   const {part_number, date, ...rest} = curr;
      //   if(!acc[date]) {
      //     acc[date] = {};
      //   }
      //   if(!acc[date][part_number]) {
      //     acc[date][part_number] = {...rest};
      //   } else {
      //     for(let key in rest) {
      //       if(key !== 'part_number') {
      //         acc[date][part_number][key] += rest[key];
      //       }
      //     }
      //   }
      //   return acc;
      // }, {});

      // const groupedData = Object.values(temp2).reduce((acc, curr) => {
      //   const {part_number, ...rest} = curr;
      //   if(!acc[part_number]) {
      //     acc[part_number] = {};
      //   }
      //   const date = rest.date;
      //   delete rest.date;
      //   if(!acc[part_number][date]) {
      //     acc[part_number][date] = [];
      //   }
      //   acc[part_number][date].push(rest);
      //   return acc;
      // }, {});

      // console.log(JSON.stringify(groupedData));

      setDataToTable(summedData);
      const totalesArray = [];

      for (const key in summedData) {
        const elementos = summedData[key];
        const total = elementos.reduce((acumulador, elemento) => {
          for (const propiedad in elemento) {
            if (propiedad !== "date") {
              acumulador[propiedad] =
                (acumulador[propiedad] || 0) + elemento[propiedad];
            }
          }
          return acumulador;
        }, {});
        totalesArray.push(total);
      }

      const totalG = totalesArray.reduce((acumulador, elemento) => {
        for (const propiedad in elemento) {
          acumulador[propiedad] =
            (acumulador[propiedad] || 0) + elemento[propiedad];
        }
        return acumulador;
      }, {});
      setTotalGeneral(totalG);
    }
  }, [
    data,
    filtersPartNumber,
    dateStart,
    dateEnd,
    filtersLot,
    filtersSerial,
    filtersSupplier,
  ]);
  const filteredData = filterData(data);
  const filteredData2 = filterData2(data);

  const getPaginatedData = useCallback(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getPaginatedData2 = useCallback(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData2.slice(startIndex, endIndex);
  }, [filteredData2]);
  const totalPages2 = Math.ceil(filteredData2.length / rowsPerPage);
  // Obtener los datos paginados

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
  const navigate = useNavigate();
  const singleView = (id) => {
    // window.location.href = `/admin/reports/${id}`;
    navigate(`/admin/reports/${id}`);
  };
  const singleView2 = (id) => {
    navigate(`/user/reports/2/${id}`);
  };

  const tabSwitch = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (data.length !== 0) {
      const res0 = [];
      const seen0 = {};

      // if (filtersSupplier.length > 0) {
      //   data.forEach((item) => {
      //     if (filtersPartNumber.includes(item.part_number)) {
      //       if (!seen0[item.supplier]) {
      //         seen0[item.supplier] = true;
      //         res0.push(item.supplier);
      //       }
      //     } else {
      //       if (!seen0[item.supplier]) {
      //         seen0[item.supplier] = true;
      //         res0.push(item.supplier);
      //       }
      //     }
      //   });
      //   setUniqueSuppliers([...new Set(res0)]);
      // } else {
      data.forEach((item) => {
        if (!seen0[item.supplier]) {
          seen0[item.supplier] = true;
          res0.push(item.supplier);
        }
      });
      setUniqueSuppliers([...new Set(res0)]);
      //}
      //console.log(res1);
      //setUniqueLots(res1);

      const res1 = [];
      const seen = {};

      data.forEach((item) => {
        if (filtersPartNumber.includes(item.part_number)) {
          item.reports_cc.forEach((report) => {
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
          });
        }
      });
      //console.log(res1);
      //setUniqueLots(res1);
      setUniqueLots([...new Set(res1)]);

      const res2 = [];
      const seen2 = {};

      data.forEach((item) => {
        // if (filtersPartNumber.includes(item.part_number)) {
        //   item.reports_cc.forEach((report) => {
        //     if (!seen2[report.serial]) {
        //       seen2[report.serial] = true;
        //       res2.push(report.serial);
        //     }
        //   });
        // }
        if (filtersPartNumber.includes(item.part_number)) {
          item.reports_cc.forEach((report) => {
            if (filtersLot.length > 0) {
              if (filtersLot.includes(report.lot)) {
                if (!seen2[report.serial]) {
                  seen2[report.serial] = true;
                  res2.push(report.serial);
                  //  setFiltersSerial(prev => prev.filter(f => f.serial === report.serial))
                  // console.log(report.serial);
                }
              }
            } else {
              if (!seen2[report.serial]) {
                seen2[report.serial] = true;
                res2.push(report.serial);
              }
            }
          });
        }
      });
      setUniqueSerial([...new Set(res2)]);

      /*data.forEach((item) => {
        item.reports_cc.forEach((report) => {
          if (!seen2[report.serial]) {
            seen2[report.serial] = true;
            res2.push(report.serial);
          }
        });
      });*/
      const res3 = [];
      const seen3 = {};

      data.forEach((item) => {
        if (filtersSupplier.includes(item.supplier)) {
          if (!seen3[item.part_number]) {
            seen3[item.part_number] = true;
            res3.push(item.part_number);
          }
        } else {
          // if (!seen3[item.part_number]) {
          //   seen3[item.part_number] = true;
          //   res3.push(item.part_number);
          // }
        }
      });

      // data.forEach((item) => {
      //   if (!seen3[item.part_number]) {
      //     seen3[item.part_number] = true;
      //     res3.push(item.part_number);
      //   }
      // });
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
  console.log(uniqueSuppliers);
  /*useCallback(() => {
    
    uniqueLots.forEach(element => {
        //console.log(element)
       setFiltersSerial(prev => prev.filter(f => f === element))
    });
    //setFiltersSerial(prev => prev.filter(f => f.serial === report.serial))
  }, [uniqueLots]);*/
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
          // Simular presionado de la tecla space
          //    const event = new KeyboardEvent("keydown", { key: " " });
          //  input.dispatchEvent(event);
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
          // Simular presionado de la tecla space
          //    const event = new KeyboardEvent("keydown", { key: " " });
          //  input.dispatchEvent(event);
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
          // Simular presionado de la tecla space
          //  const event = new KeyboardEvent("keydown", { key: " " });
          // input.dispatchEvent(event);
        }
      });
    }
  }, [filterOption, filtersPartNumber]);

  return (
    <Table>
      <div className="table-container mb-5">
        {activeTab === 1 && (
          <div className="header-container">
            <form autoComplete="off">
              <div className="filter-container">
                <div className="filter-item">
                  <label htmlFor="name-filter">Buscar:</label>
                  <div className="filter-item-input">
                    <input
                      type="text"
                      id="name-filter"
                      value={nameFilter}
                      onChange={handleNameFilterChange}
                    />
                  </div>
                </div>
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
                              <span
                                style={{ minWidth: "90px", maxWidth: "100px" }}
                              >
                                {formatedDateStart !== ""
                                  ? formatedDateStart
                                  : ""}
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
                              <span
                                style={{ minWidth: "90px", maxWidth: "100px" }}
                              >
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
        )}
        {activeTab === 3 && (
          <div className="header-container">
            <form autoComplete="off">
              <div className="filter-options">
                <div className="filter-items">
                  <div className="filter-item-checkbox">
                    <div className="filter-item-in">
                      <label htmlFor="supplier">Proveedor</label>
                      <input
                        type="checkbox"
                        value={0}
                        onChange={(e) => setFilterOption(e.target.value)}
                        checked={Number(filterOption) === 0 ? true : false}
                        id="supplier"
                      />
                    </div>
                    <div className="item-list">
                      <ul
                        style={{
                          display: `${
                            filtersSupplier.length > 0 ? "flex" : "none"
                          }`,
                        }}
                      >
                        {filtersSupplier.map((filterSupplier, ind) => (
                          <li key={ind}>
                            <span>{filterSupplier}</span>{" "}
                            <span>
                              <i
                                className="fa-solid fa-times"
                                onClick={(e) =>
                                  setFiltersSupplier((prev) =>
                                    prev.filter((pre) => pre !== filterSupplier)
                                  )
                                }
                              ></i>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="filter-item-checkbox">
                    <div className="filter-item-in">
                      <label htmlFor="part_n">Numero de parte</label>
                      <input
                        type="checkbox"
                        value={1}
                        onChange={(e) => setFilterOption(e.target.value)}
                        checked={Number(filterOption) === 1 ? true : false}
                        id="part_n"
                      />
                    </div>
                    <div className="item-list">
                      <ul
                        style={{
                          display: `${
                            filtersPartNumber.length > 0 ? "flex" : "none"
                          }`,
                        }}
                      >
                        {filtersPartNumber.map((filterPartNumber, ind) => (
                          <li key={ind}>
                            <span>{filterPartNumber}</span>{" "}
                            <span>
                              <i
                                className="fa-solid fa-times"
                                onClick={(e) =>
                                  setFiltersPartNumber((prev) =>
                                    prev.filter(
                                      (pre) => pre !== filterPartNumber
                                    )
                                  )
                                }
                              ></i>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="filter-item-checkbox">
                    <div className="filter-item-in">
                      <label htmlFor="lote">Lote</label>
                      <input
                        type="checkbox"
                        value={2}
                        onChange={(e) => setFilterOption(e.target.value)}
                        checked={Number(filterOption) === 2 ? true : false}
                        id="lote"
                      />
                    </div>
                    <div className="item-list">
                      <ul
                        style={{
                          display: `${filtersLot.length > 0 ? "flex" : "none"}`,
                        }}
                      >
                        {filtersLot.map((filterLot, ind) => (
                          <li key={ind}>
                            <span>{filterLot}</span>{" "}
                            <span>
                              <i
                                className="fa-solid fa-times"
                                onClick={(e) =>
                                  setFiltersLot((prev) =>
                                    prev.filter((pre) => pre !== filterLot)
                                  )
                                }
                              ></i>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="filter-item-checkbox">
                    <div className="filter-item-in">
                      <label htmlFor="serie">Series</label>
                      <input
                        type="checkbox"
                        value={3}
                        onChange={(e) => setFilterOption(e.target.value)}
                        checked={Number(filterOption) === 3 ? true : false}
                        id="serie"
                      />
                    </div>
                    <div className="item-list">
                      <ul
                        style={{
                          display: `${
                            filtersSerial.length > 0 ? "flex" : "none"
                          }`,
                        }}
                      >
                        {filtersSerial.map((filterSerial, ind) => (
                          <li key={ind}>
                            <span>{filterSerial}</span>{" "}
                            <span>
                              <i
                                className="fa-solid fa-times"
                                onClick={(e) =>
                                  setFiltersSerial((prev) =>
                                    prev.filter((pre) => pre !== filterSerial)
                                  )
                                }
                              ></i>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-container">
                {Number(filterOption) === 1 && (
                  <div className="filter-item">
                    <label htmlFor="name-filter">Buscar:</label>
                    <div className="filter-item-input">
                      {/*<label for="ice-cream-choice">Choose a flavor:</label>*/}
                      <input
                        list="parts_number"
                        id="part_number"
                        name="part_number"
                        value={nameFilter2}
                        onChange={handleNameFilterChange2}
                      />

                      <datalist id="parts_number">
                        {uniquePart_number.map((part_number, indx) => {
                          // Verificar si el navegador es Firefox, Safari o Edge
                          const isFirefox =
                            navigator.userAgent.indexOf("Firefox") !== -1;
                          const isSafari =
                            navigator.userAgent.indexOf("Safari") !== -1 ||
                            navigator.userAgent.indexOf("AppleWebKit") !== -1;
                          const isEdge =
                            navigator.userAgent.indexOf("Edge") !== -1;

                          // Crear etiqueta de opción
                          const option = (
                            <option value={part_number}>
                              {isFirefox ? `Parte #${part_number}` : "# Parte"}
                            </option>
                          );

                          // Devolver opción
                          return option;
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
                    <label htmlFor="name-filter">Buscar:</label>
                    <div className="filter-item-input">
                      {/*<label for="ice-cream-choice">Choose a flavor:</label>*/}
                      <input
                        list="lots"
                        id="lot"
                        name="lot"
                        value={nameFilter2}
                        onChange={handleNameFilterChange3}
                        disabled={filtersPartNumber.length === 0 ? true : false}
                      />

                      <datalist id="lots">
                        {uniqueLots.map((lot, indx) => {
                          // Verificar si el navegador es Firefox, Safari o Edge
                          const isFirefox =
                            navigator.userAgent.indexOf("Firefox") !== -1;
                          const isSafari =
                            navigator.userAgent.indexOf("Safari") !== -1 ||
                            navigator.userAgent.indexOf("AppleWebKit") !== -1;
                          const isEdge =
                            navigator.userAgent.indexOf("Edge") !== -1;

                          // Crear etiqueta de opción
                          const option = (
                            <option value={lot}>
                              {isFirefox ? `Lote #${lot}` : "# Lote"}
                            </option>
                          );

                          // Devolver opción
                          return option;
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
                    <label htmlFor="name-filter">Buscar:</label>
                    <div className="filter-item-input">
                      {/*<label for="ice-cream-choice">Choose a flavor:</label>*/}
                      <input
                        list="serials"
                        id="serial"
                        name="serial"
                        value={nameFilter2}
                        onChange={handleNameFilterChange4}
                        disabled={filtersPartNumber.length === 0 ? true : false}
                      />

                      <datalist id="serials">
                        {uniqueSerial.map((serial, indx) => {
                          // Verificar si el navegador es Firefox, Safari o Edge
                          const isFirefox =
                            navigator.userAgent.indexOf("Firefox") !== -1;
                          const isSafari =
                            navigator.userAgent.indexOf("Safari") !== -1 ||
                            navigator.userAgent.indexOf("AppleWebKit") !== -1;
                          const isEdge =
                            navigator.userAgent.indexOf("Edge") !== -1;

                          // Crear etiqueta de opción
                          const option = (
                            <option value={serial}>
                              {isFirefox ? `Serial #${serial}` : "# Serial"}
                            </option>
                          );

                          // Devolver opción
                          return option;
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
                {Number(filterOption) === 0 && (
                  <div className="filter-item">
                    <label htmlFor="name-filter">Buscar:</label>
                    <div className="filter-item-input">
                      {/*<label for="ice-cream-choice">Choose a flavor:</label>*/}
                      <input
                        list="suppliers"
                        id="serial"
                        name="serial"
                        value={nameFilter2}
                        onChange={handleNameFilterChange5}
                        //disabled={filtersPartNumber.length === 0 ? true : false}
                      />

                      <datalist id="suppliers">
                        {uniqueSuppliers.map((serial, indx) => {
                          // Verificar si el navegador es Firefox, Safari o Edge
                          const isFirefox =
                            navigator.userAgent.indexOf("Firefox") !== -1;
                          const isSafari =
                            navigator.userAgent.indexOf("Safari") !== -1 ||
                            navigator.userAgent.indexOf("AppleWebKit") !== -1;
                          const isEdge =
                            navigator.userAgent.indexOf("Edge") !== -1;

                          // Crear etiqueta de opción
                          const option = (
                            <option value={serial}>
                              {isFirefox ? `${serial}` : ""}
                            </option>
                          );

                          // Devolver opción
                          return option;
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
                        customInput={
                          <CustomInputD>
                            <p>
                              Desde:{" "}
                              <span
                                style={{ minWidth: "90px", maxWidth: "100px" }}
                              >
                                {formatedDateStart !== ""
                                  ? formatedDateStart
                                  : ""}
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
                              <span
                                style={{ minWidth: "90px", maxWidth: "100px" }}
                              >
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
            <div className="charts">
              <Chart1 totalG={totalGeneral} />
              <Chart2 totalG={totalGeneral} />
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="header-container">
            <form autoComplete="off">
              <div className="filter-container">
                <div className="filter-item">
                  <label htmlFor="name-filter">Buscar:</label>
                  <div className="filter-item-input">
                    <input
                      type="text"
                      id="name-filter"
                      value={nameFilter}
                      onChange={handleNameFilterChange}
                    />
                  </div>
                </div>
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
                              <span
                                style={{ minWidth: "90px", maxWidth: "100px" }}
                              >
                                {formatedDateStart !== ""
                                  ? formatedDateStart
                                  : ""}
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
                              <span
                                style={{ minWidth: "90px", maxWidth: "100px" }}
                              >
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
        )}
        <div className="tab-container">
          <div className="tab-items">
            <div
              className={`tab-item ${activeTab === 1 ? "active" : ""}`}
              onClick={() => tabSwitch(1)}
            >
              <p>Reportes de inspeccion</p>
            </div>
            <div
              className={`tab-item ${activeTab === 2 ? "active" : ""}`}
              onClick={() => tabSwitch(2)}
            >
              <p>Reportes por hora</p>
            </div>
            <div
              className={`tab-item ${activeTab === 3 ? "active" : ""}`}
              onClick={() => tabSwitch(3)}
            >
              <p>Totales reportes de inspeccion</p>
            </div>
          </div>
        </div>
        {activeTab === 1 && (
          <div className="table-body table-reports">
            <table>
              <thead>
                <tr>
                  <th>
                    <Checkbox type="all" id={0} callback={handleCheckBox} />
                  </th>
                  <th onClick={(e) => setSort((prev) => !prev)}># Reporte</th>
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
                        />
                      </td>
                      <td className="table-center">{item.id}</td>
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
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDel(item.id, "reports")}
                          ></i>
                          {/* <Link
                            to={`/admin/reports/${item.id}`}
                            style={{ color: "green" }}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </Link> */}
                          <i className="fa-solid fa-file-pdf"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 2 && (
          <div className="table-body table-reports">
            <table>
              <thead>
                <tr>
                  <th>
                    <Checkbox type="all" id={0} callback={handleCheckBox} />
                  </th>
                  <th onClick={(e) => setSort((prev) => !prev)}># Reporte</th>
                  <th># Parte</th>
                  <th>Planta</th>
                  <th>Mesa</th>
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
                        />
                      </td>
                      <td className="table-center">{item.id}</td>
                      <td className="table-center">{item.part_number}</td>
                      <td className="table-center">{item.plant}</td>
                      <td className="table-center">{item.supplier}</td>
                      <td className="table-center">{item.date}</td>
                      <td className="table-center">
                        {Number(item.status) === 1 && "Sin aprobar"}{" "}
                        {Number(item.status) === 2 && "Aprobado"}
                      </td>
                      <td
                        className="table-center"
                        onClick={(e) => e.stopPropagation()}
                        colSpan={1}
                      >
                        <div className="actions">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDel(item.id)}
                          ></i>
                          {/* <Link
                            to={`/admin/reports/${item.id}`}
                            style={{ color: "green" }}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </Link> */}
                          <i className="fa-solid fa-file-pdf"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 3 && (
          <div className="table-body table-reports">
            {/* <TableTotals data={totalFiltered} /> */}
            <TableComponent groupedData={dataToTable} loader={loader} />
            {/* <table>
              <thead>
                <tr>
                  
                  <th>Numero de parte</th>
                  <th>Fecha</th>
                  <th>Total Inspeccionado</th>
                  <th>Total Piezas Ng</th>
                  <th>Total Piezas Ok</th>
                  <th>Total Piezas Retrabajadas</th>
                  <th>Total Scrap</th>
                </tr>
              </thead>
              <tbody>
              {Object.entries(totalFiltered).map(([date, values]) => {
                  return (
                    <tr>
                      <td className="table-center">{values.part_number}</td>
                      <td className="table-center">{date}</td>
                      <td className="table-center">{values.total_inspected}</td>
                      <td className="table-center">{values.total_ng_pieces}</td>
                      <td className="table-center">{values.total_ok_pieces}</td>
                      <td className="table-center">
                        {values.total_re_work_parts}
                      </td>
                      <td className="table-center">{values.total_scrap}</td>
                    </tr>
                  );
                })}

                {/* {Object.entries(totalFiltered).map(([partNumber, values]) => {
                  return values.map((item) => {
                    return (
                      <tr>
                        <td className="table-center">{partNumber}</td>
                        <td className="table-center">{item.date}</td>
                        <td className="table-center">{item.total_inspected}</td>
                        <td className="table-center">{item.total_ng_pieces}</td>
                        <td className="table-center">{item.total_ok_pieces}</td>
                        <td className="table-center">
                          {item.total_re_work_parts}
                        </td>
                        <td className="table-center">{item.total_scrap}</td>
                      </tr>
                    );
                  });
                })} */}

            {/*getPaginatedData2().length === 0 ? (
                  <Loader>
                    <img src="/assets/img/loading2.svg" alt="" />
                  </Loader>
                ) : (
                  getPaginatedData2().map((item, index) => (
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
                        />
                      </td>
                      <td className="table-center">{item.id}</td>
                      <td className="table-center">{item.part_number}</td>
                      <td className="table-center">{item.plant}</td>
                      <td className="table-center">Proveedor</td>
                      <td className="table-center">{item.date}</td>
                      <td className="table-center">
                        {Number(item.status) === 1 && "Sin aprobar"}{" "}
                        {Number(item.status) === 2 && "Aprobado"}
                      </td>
                      <td
                        className="table-center"
                        onClick={(e) => e.stopPropagation()}
                        colSpan={1}
                      >
                        <div className="actions">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDel(item.id)}
                          ></i>
                          <Link
                            to={`/admin/reports/${item.id}`}
                            style={{ color: "green" }}
                          >
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                          <i className="fa-solid fa-file-pdf"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}}
              </tbody>
            </table>  */}
          </div>
        )}
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
  );
}

export default ReportsTable;
