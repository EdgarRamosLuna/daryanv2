import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { registerLocale } from "react-datepicker";
import { debounce } from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Loader from "../Loader";
import Checkbox from "../Checkbox";
import { Table } from "../../styles/Styles";
import { MainContext } from "../../context/MainContext";
import { Link, useNavigate } from "react-router-dom";
import TableComponent from "./TableComponent";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import { getAuthClients, getClientsInfo } from "../../api/daryan.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFilePdf,
  faTimes,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import ReportsByH from "./ReportsByH";
import ComponentPagination from "../ComponentPagination";
import TabContainer from "../tabs/TabContainer";

import DatePickerRange from "../datepicker/DateRangePicker";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  IconButton,
  Grid,
  FormControlLabel,
  Checkbox as CheckboxMUI,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import NoInfo from "../helpers/NoInfo";
import { useTranslation } from "react-i18next";
import FilterTable from "./FilterTable";
registerLocale("es", es);
function ReportsTable({ data, dataReportByH }) {
  const { t } = useTranslation();
  const {
    handleDel,
    toast,
    activeTab,
    setActiveTab,
    setCheckList,
    uniqueClients,
    setUniqueClients,
    clientsToReport,
    setClientsToReport,
    setShowModalAuth,
    setAuthClientsT,
    showCharts,
    firstDayOfYear,
    handleCheckBox,
  } = useContext(MainContext);
  const [nameFilter, setNameFilter] = useState("");
  const [nameFilter2, setNameFilter2] = useState("");
  const [nameFilterByH, setNameFilterByH] = useState("");

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
      .catch((err) => {});
  };
  useEffect(() => {
    const clients = async () => {
      await getClientsInfo()
        .then((res) => {
          if (res.data) {
            setClients(res.data);
            //setUniqueSuppliers(res.data);
          }
        })
        .catch((err) => {});
    };
    clients();
  }, []);
  useEffect(() => {
    setDateStart(firstDayOfYear);
    setDateEnd(today);
    return () => {};
  }, [activeTab]);

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
  const [filtersSerial, setFiltersSerial] = useState([]);
  const [filtersLot, setFiltersLot] = useState([]);
  const [filtersPartNumber, setFiltersPartNumber] = useState([]);
  const [filtersSupplier, setFiltersSupplier] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedClient, setSelectedClient] = useState("0");
  const handleNameFilterChange = (event) => {
    const value = event.target.value;
    if (activeTab === 2) {
      setNameFilterByH(value);
    } else {
      setNameFilter(value);
    }
    //debounceSetNameFilter(value);
  };

  const debounceSetNameFilter = debounce((value) => {
    setNameFilter(value);
  }, 300); // 300 milliseconds debounce delay

  const handleNameFilterChange2 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "" && uniquePart_number.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniquePart_number
      setLoader(true);
      // setTimeout(() => {
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
      // }, 1000);
    }
  };
  const handleNameFilterChange3 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "" && uniqueLots.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniqueLots
      setLoader(true);

      // setTimeout(() => {
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
      //     }, 1000);
    }
  };

  const handleNameFilterChange4 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "" && uniqueSerial.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniquePart_number
      setLoader(true);
      //  setTimeout(() => {
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
    }
  };
  const handleNameFilterChange5 = (event) => {
    setNameFilter2(event.target.value);
    let value = event.target.value.trim(); // Elimina espacios en blanco del valor
    //arr = arr.map(item => item.replace(/\n/g, ''));
    value = value.replace(/\n/g, "");

    if (value !== "" && uniqueSuppliers.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniquePart_number
      setLoader(true);
      // setTimeout(() => {
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
      //}, 1000);
    }
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
        const fullName = `${id}${id_supplier}${part_number}${item.reports_cc
          .map((cc) => cc.lot)
          .join(", ")} ${item.reports_cc
          .map((cc) => cc.serial)
          .join(", ")} ${suppliers} ${planta} `;
        const date = new Date(item.date);

        // Ajusta la fecha 'date' para que solo tenga año, mes y día
        date.setHours(0, 0, 0, 0);
        // Luego ajusta para tener en cuenta el desplazamiento de la zona horaria
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

        const startDate = new Date(dateStart);
        startDate.setHours(0, 0, 0, 0);
        startDate.setMinutes(
          startDate.getMinutes() + startDate.getTimezoneOffset()
        );

        const endDate = new Date(dateEnd);
        endDate.setHours(23, 59, 59, 999);
        endDate.setMinutes(endDate.getMinutes() + endDate.getTimezoneOffset());

        if (
          nameFilter &&
          fullName.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1
        ) {
          return false;
        }
        if (dateStart && date < startDate) {
          return false;
        }
        if (dateEnd && date > endDate) {
          return false;
        }
        if (nameFilter.length > 3) {
          dataId = id_supplier;
        }
        return true;
      });
    },
    [nameFilter, dateStart, dateEnd]
  );


  useEffect(() => {
    const data = getPaginatedData();
    console.log(clients)
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

        const startDate = new Date(dateStart);
        const startDateOffset = startDate.getTimezoneOffset();
        const currentOffset = new Date().getTimezoneOffset();
        const startDateInCurrentOffset = new Date(startDate).setMinutes(
          date.getMinutes() + currentOffset - startDateOffset
        );

        const endDate = new Date(dateEnd);
        const endDateOffset = endDate.getTimezoneOffset();
        const endDateInCurrentOffset = new Date(endDate).setMinutes(
          date.getMinutes() + currentOffset - endDateOffset
        );

        if (
          nameFilter &&
          fullName.toLowerCase().indexOf(nameFilter.toLowerCase()) === -1
        ) {
          return false;
        }
        if (dateStart && new Date(date) < new Date(startDateInCurrentOffset)) {
          return false;
        }

        if (dateEnd && new Date(date) > new Date(endDateInCurrentOffset)) {
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
      
      
      const filterLot = filtersLot;
      const filterSerial = filtersSerial;
      const filterPartNumber = filtersPartNumber;
      const filterSupplier = filtersSupplier;
      const temp = {};
      const temp2 = {};
      // Definir las fechas del filtro
      const startDate = dateStart;
      const endDate = dateEnd;
      
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
        let total_B = 0;
        let total_C = 0;
        let total_D = 0;
        let total_E = 0;
        let total_F = 0;
        let total_G = 0;
        let total_H = 0;
        let total_I = 0;
        let partNumber = data[i].part_number; // Nuevo filtro de búsqueda
        let worked_h = Number(data[i].worked_h);
        let supplier = data[i].supplier;
        // Calcular el total inspeccionado
        const keyE = "E";
        const keyF = "F";
        const keyG = "G";
        const keyH = "H";
        const keyI = "I";

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
            total_B += parseInt(report_cc["B"]);
            total_C += parseInt(report_cc["C"]);
            total_D += parseInt(report_cc["D"]);
            if (keyE in report_cc) {
              total_E += parseInt(report_cc["E"]);
            }
            if (keyF in report_cc) {
              total_F += parseInt(report_cc["F"]);
            }
            if (keyG in report_cc) {
              total_G += parseInt(report_cc["G"]);
            }
            if (keyH in report_cc) {
              total_H += parseInt(report_cc["H"]);
            }
            if (keyI in report_cc) {
              total_I += parseInt(report_cc["I"]);
            }
          }
        }
        // Aplicar filtros para cada objeto en el data

        const dateString = date.toISOString().slice(0, 10);
        // Ajusta la fecha 'date' para que solo tenga año, mes y día
        date.setHours(0, 0, 0, 0);

        // Luego ajusta para tener en cuenta el desplazamiento de la zona horaria
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

        // Ajusta las fechas 'startDate' y 'endDate' para que solo tengan año, mes y día
        const adjustedStartDate = new Date(startDate);
        adjustedStartDate.setHours(0, 0, 0, 0);

        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setHours(23, 59, 59, 999);

        if (
          (filterLot.length &&
            !reports_cc.some((report) => filterLot.includes(report.lot))) ||
          (filterSerial.length &&
            !reports_cc.some((report) =>
              filterSerial.includes(report.serial)
            )) ||
          (filterPartNumber.length && !filterPartNumber.includes(partNumber)) || // Nueva condición para el filtro de búsqueda de part_number
          (filterSupplier.length && !filterSupplier.includes(supplier)) ||
          ((date < adjustedStartDate || date > adjustedEndDate))
        ) {
          continue; // Saltar a la siguiente iteración del loop
        }

        // Agregar los datos al objeto temporal

        const min = 1000000;
        const max = 9000000;

        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    
        temp2[i] = {
          part_number: partNumber,
          total_inspected: total_inspected,
          total_ng_pieces: total_ng_pieces,
          total_ok_pieces: total_ok_pieces,
          total_re_work_parts: total_re_work_parts,
          total_scrap: total_scrap,
          total_A: total_A,
          total_B: total_B,
          total_C: total_C,
          total_D: total_D,
          total_E: total_E,
          total_F: total_F,
          total_G: total_G,
          total_H: total_H,
          total_I: total_I,
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
          temp[partNumber].total_A += total_A;
          temp[partNumber].total_B += total_B;
          temp[partNumber].total_C += total_C;
          temp[partNumber].total_D += total_D;
          temp[partNumber].total_E += total_E;
          temp[partNumber].total_F += total_F;
          temp[partNumber].total_G += total_G;
          temp[partNumber].total_H += total_H;
          temp[partNumber].total_I += total_I;
          temp[partNumber].date += dateString;
          temp[partNumber].worked_h += worked_h;
        } else {
          temp[partNumber] = {
            part_number: partNumber,
            total_inspected: total_inspected,
            total_ng_pieces: total_ng_pieces,
            total_ok_pieces: total_ok_pieces,
            total_re_work_parts: total_re_work_parts,
            total_scrap: total_scrap,
            total_A: total_A,
            total_B: total_B,
            total_C: total_C,
            total_D: total_D,
            total_E: total_E,
            total_F: total_F,
            total_G: total_G,
            total_H: total_H,
            total_I: total_I,
            date: dateString,
            worked_h: worked_h,
          };
        }
      }

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
      <FontAwesomeIcon icon={faCalendarDays} />
    </div>
  ));
  CustomInputD.displayName = "CustomInputD";

  const navigate = useNavigate();
  const singleView = (id) => {
    // window.location.href = `/admin/reports/${id}`;
    navigate(`/admin/reports_insp/${id}`);
  };
  const singleView2 = (id) => {
    navigate(`/user/reports/2/${id}`);
  };

  const tabSwitch = (tab) => {
    setCheckList([]);
    setNameFilter("");
    setClientsToReport([]);
    setSelectedClient("0");
    setActiveTab(tab);
  };

  useEffect(() => {
    if (data.length !== 0) {
      const res0 = [];
      const seen0 = {};

      data.forEach((item) => {
        if (!seen0[item.supplier]) {
          seen0[item.supplier] = true;
          let item_supplier = item.supplier.replace(/\n/g, "");
          res0.push(item_supplier);
        }
      });
      setUniqueSuppliers([...new Set(res0)]);
  

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
      toast.error(t("notifications.selectAtLeastOneSupplier"), {
        duration: 5000,
      });
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
      toast.error(t("notifications.selectAtLeastOnePartForLots"), {
        duration: 5000,
      });
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
      toast.error(t("notifications.selectAtLeastOnePartForSerials"), {
        duration: 5000,
      });
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

  // Convert your array of clients to an object for easy lookup
  const clientsById = uniqueClients.reduce((obj, client) => {
    obj[client.id] = client;
    return obj;
  }, {});


  //Añade un cliente a la lista para autorizar
  const addClientToList = (e) => {
    const id = e.target.value;
      
    // Look up the client name by id
    const clientName = clientsById[id]?.fullname ? clientsById[id].fullname : '';
    setSelectedClient(id);
    if(clientName !== ''){      
      setClientsToReport((prev) => {
        if (!prev.some((client) => (client.id === id) && (Number(id) !== 0))) {        
          return [...prev, { id, clientName }];
        }
        return prev;
      });
    }
  };


  const removeClient = (id) => {
    setClientsToReport((prev) => prev.filter((client) => client.id !== id));
  };
  const [showFIltersT, setShowFiltersT] = useState(false);
  const showFilterTable = () => {
    setShowFiltersT((prev) => !prev);
  };
  const inspectionReport = () => {};

  const reportesComponents = {
    insp: {
      p: <p>{t("reports.inspection_reports")}</p>,
    },
    byh: {
      p: <p>{t("reports.hourly_reports")}</p>,
    },
    total_insp: {
      p: <p>{t("reports.total_inspection_reports")}</p>,
    },
  };

  const tabContent = {
    1: {
      componenteTitle: reportesComponents["insp"].p,
      componenteTop: (
        <div className="header-container">         
          <form autoComplete="off">
            <Grid
              sx={{
                marginTop: "15px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <div className="filter-item">
                <TextField
                  id="outlined-basic"
                  label={t("reports.search")}
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    width: "90%",
                  }}
                  type="text"
                  name="buscar"
                  value={nameFilter}
                  onChange={(e) => handleNameFilterChange(e)}
                  placeholder={t("reports.search_by_date")}
                />
              </div>
              <div className="filter-item">
                <Box
                  sx={{
                    visibility: uniqueClients.length > 0 ? "visible" : "hidden",
                  }}
                >
                  <Box>
                    <Select
                      value={selectedClient}
                      onChange={addClientToList}
                      sx={{
                        width: "90%",
                      }}
                    >
                      <MenuItem value="0">
                        {t("reports.selectAClient")}
                      </MenuItem>
                      {uniqueClients.map((option) => (
                        <MenuItem key={option} value={option.id}>
                          {option.fullname}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box>
                    <List
                      sx={{
                        display: `${
                          clientsToReport.length > 0 ? "flex" : "none"
                        }`,
                        flexDirection: "column",
                      }}
                    >
                      {clientsToReport.map((client, ind) => (
                        <ListItem key={ind}>
                          <span>{client.clientName}</span>
                          <IconButton onClick={() => removeClient(client.id)}>
                            <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </div>
              <DatePickerRange
                setDateStart={setDateStart}
                setDateEnd={setDateEnd}
              />
            </Grid>
          </form>
        </div>
      ),
      componenteMiddle: (
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
              <th>{t('reports.part_number')}</th>
              <th>{t('reports.plant')}</th>
              <th>{t('reports.supplier')}</th>
              <th>{t('reports.date')}</th>
              <th>{t('reports.status')}</th>
              <th>{t('reports.actions')}</th>
            </tr>
          </thead>
          <tbody>
            <div className={loader === false ? "loaderContainer" : ""}>
              <Loader>
                <img src="/assets/img/loading2.svg" alt="" />
              </Loader>
            </div>
            {getPaginatedData().length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="table-center"
                  style={{ opacity: `${loader ? 0 : 1}` }}
                >
                  <h1>{t('reports.noDatabaseInformation')}</h1>
                </td>
              </tr>
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
                    {Number(item.status) === 1 && t('reports.notApproved')} 
                    {Number(item.status) === 3 && t('reports.approved')}
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
                        href={`http://phpstack-1070657-3746640.cloudwaysapps.com/reporte-inspeccion/${item.id}`}
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
      
      ),
      componenteBottom: (
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
      ),
    },
    2: {
      componenteTitle: reportesComponents["byh"].p,
      componenteTop: (
        <>
          <div className="header-container">
            <form autoComplete="off">
              <Grid
                sx={{
                  marginTop: "15px",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                <div className="filter-item">
                  <TextField
                    id="outlined-basic"
                    label={t("reports.search")}
                    variant="outlined"
                    autoComplete="off"
                    sx={{
                      width: "90%",
                    }}
                    type="text"
                    name="buscar"
                    value={nameFilterByH}
                    onChange={(e) => handleNameFilterChange(e)}
                    placeholder="Proveedor, #Parte, #Lote, #Serie, #Planta"
                  />
                </div>
                <div className="filter-item">
                  <Box
                    sx={{
                      visibility:
                        uniqueClients.length > 0 ? "visible" : "hidden",
                    }}
                  >
                    <Box>
                      <Select
                        value={selectedClient}
                        onChange={addClientToList}
                        sx={{
                          width: "90%",
                        }}
                      >
                        <MenuItem value="0">{t("reports.selectAClient")}</MenuItem>
                        {uniqueClients.map((option) => (
                          <MenuItem key={option} value={option.id}>
                            {option.fullname}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box>
                      <List
                        sx={{
                          display: `${
                            clientsToReport.length > 0 ? "flex" : "none"
                          }`,
                          flexDirection: "column",
                        }}
                      >
                        {clientsToReport.map((client, ind) => (
                          <ListItem key={ind}>
                            <span>{client.clientName}</span>
                            <IconButton onClick={() => removeClient(client.id)}>
                              <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                            </IconButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </div>
                <DatePickerRange
                  setDateStart={setDateStart}
                  setDateEnd={setDateEnd}
                />
              </Grid>
            </form>
          </div>
        </>
      ),
      componenteMiddle: (
        <ReportsByH
          data={dataReportByH}
          dateStart={dateStart}
          dateEnd={dateEnd}
          setDateStart={setDateStart}
          setDateEnd={setDateEnd}
          nameFilterByH={nameFilterByH}
          loader={loader}
        />
      ),
    },
    3: {
      componenteTitle: reportesComponents["total_insp"].p,
      componenteTop: (
        <div className="header-container2">
           
          <form autoComplete="off">
            <Box
              className=""
              sx={{
                width: "99%",
              }}
            >
              {Number(filterOption) === 0 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="serial"
                    label={t("reports.search")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange5}
                    select
                    sx={{
                      width: "100%",
                    }}
                  >
                    {uniqueSuppliers.map((serial, indx) => (
                      <MenuItem key={indx} value={serial}>
                        {serial}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 1 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="part_number"
                    label={t("reports.partNumber")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange2}
                    disabled={filtersSupplier.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniquePart_number.map((part_number, indx) => (
                      <MenuItem key={indx} value={part_number}>
                        {t("reports.partNumber")} #{part_number}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 2 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="lot"
                    label={t("reports.lot")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange3}
                    disabled={filtersPartNumber.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniqueLots.map((lot, indx) => (
                      <MenuItem key={indx} value={lot}>
                        {t("reports.lot")} #{lot}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
              {Number(filterOption) === 3 && (
                <Box
                  className=""
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField
                    id="serial"
                    label={t("reports.serialNumber")}
                    value={nameFilter2}
                    onChange={handleNameFilterChange4}
                    disabled={filtersPartNumber.length === 0}
                    select
                    sx={{
                      width: "99%",
                    }}
                  >
                    {uniqueSerial.map((serial, indx) => (
                      <MenuItem key={indx} value={serial}>
                        {t("reports.series")} #{serial}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
            </Box>
            <Box className="filter-options">
              <Box className="filter-items">
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 0}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={0}
                      />
                    }
                    label={t("reports.suppliers")}
                  />
                  <List
                    sx={{
                      display: `${
                        filtersSupplier.length > 0 ? "flex" : "none"
                      }`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersSupplier.map((filterSupplier, ind) => (
                      <ListItem key={ind}>
                        <span>{filterSupplier}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersSupplier((prev) =>
                              prev.filter((pre) => pre !== filterSupplier)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 1}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={1}
                      />
                    }
                    label={t("reports.partNumber")}
                  />
                  <List
                    sx={{
                      display: `${
                        filtersPartNumber.length > 0 ? "flex" : "none"
                      }`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersPartNumber.map((filterPartNumber, ind) => (
                      <ListItem key={ind}>
                        <span>{filterPartNumber}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersPartNumber((prev) =>
                              prev.filter((pre) => pre !== filterPartNumber)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 2}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={2}
                      />
                    }
                    label={t("reports.lot")}
                  />
                  <List
                    sx={{
                      display: `${filtersLot.length > 0 ? "flex" : "none"}`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersLot.map((filterLot, ind) => (
                      <ListItem key={ind}>
                        <span>{filterLot}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersLot((prev) =>
                              prev.filter((pre) => pre !== filterLot)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box className="filter-item-checkbox">
                  <FormControlLabel
                    control={
                      <CheckboxMUI
                        checked={Number(filterOption) === 3}
                        onChange={(e) => setFilterOption(e.target.value)}
                        value={3}
                      />
                    }
                    label={t("reports.serialNumber")}
                  />
                  <List
                    sx={{
                      display: `${filtersSerial.length > 0 ? "flex" : "none"}`,
                      flexDirection: "column",
                    }}
                  >
                    {filtersSerial.map((filterSerial, ind) => (
                      <ListItem key={ind}>
                        <span>{filterSerial}</span>
                        <IconButton
                          onClick={() =>
                            setFiltersSerial((prev) =>
                              prev.filter((pre) => pre !== filterSerial)
                            )
                          }
                        >
                          <CloseIcon sx={{ color: "rgb(87, 0, 0)" }} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Box>
            <DatePickerRange
              setDateStart={setDateStart}
              setDateEnd={setDateEnd}
            />
          
          <div className="table-controlls">
              {showFIltersT && (
                <FilterTable />
              )}
              <div className="table-controlls-left">
                <div
                  className={`table-controlls-left-item ${showFIltersT ? "activeFilters" : ""}`}
                  onClick={showFilterTable}
                >
                  <i className="fa-solid fa-filter"></i>
                </div>
              </div>
            </div>
          </form>
          <div className={`charts ${showCharts === true && "smoothFadeIn"}`}>
            {showCharts === true && (
              <>
                <Chart1
                  totalG={totalGeneral}
                  colorScale={[
                    "tomato",
                    "orange",
                    "gold",
                    "gold",
                    "gold",
                    "gold",
                  ]}
                />
                <Chart2
                  totalG={totalGeneral}
                  colorScale={[
                    "tomato",
                    "orange",
                    "gold",
                    "gold",
                    "gold",
                    "gold",
                  ]}
                />
              </>
            )}
          </div>
          
        </div>
      ),
      componenteMiddle: (
        <div className="table-body table-reports">
          <TableComponent groupedData={dataToTable} loader={loader} />
        </div>
      ),
    },
  };
  return (
    <>
      <Table>
        <div className="table-container mb-5">
          <TabContainer tabContent={tabContent} />
        </div>
      </Table>
    </>
  );
}

export default ReportsTable;
