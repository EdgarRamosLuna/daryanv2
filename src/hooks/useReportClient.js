
import React, {
    forwardRef,
    useCallback,
    useContext,
    useEffect,
     useState,
  } from "react";
import { useTranslation } from "react-i18next";
import { MainContext } from "../context/MainContext";
import { getAuthClients, getClientsInfo, getDatesByPartNumber } from "../api/daryan.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

  
const useReportClient = ({ data, dataReportByH}) => {
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
        setIsDownloading,
        isDownloading,
        serverNodeUrl,
        isAdmin,
        reportsByHour
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
  };

  const handleNameFilterChange2 = (event) => {
    setNameFilter2(event.target.value);
    const value = event.target.value.trim(); // Elimina espacios en blanco del valor
    if (value !== "" && uniquePart_number.includes(value)) {
      // Verifica que el valor no esté vacío y existe en uniquePart_number
      setLoader(true);
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
        date.setUTCHours(6, 0, 0, 999);

        const startDate = new Date(dateStart);
        startDate.setUTCHours(6, 0, 0, 999);

        const endDate = new Date(dateEnd);
        endDate.setUTCHours(6, 0, 0, 999);

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

  const [dLastDate, setDLastDate] = useState("");
  const [dfirstDate, setDFirstDate] = useState("");

  const [reportDates, setReportDates] = useState([]);
  const getDatesByPartNumbers = async (partNumber) => {
    const token = localStorage.getItem("t");
    try {
      const response = await getDatesByPartNumber(partNumber, token);
      const { nCodigo, sType, dFirstDate, dLastDate, dates } = response.data;
      const formattedDates = JSON.parse(dates);
      if (Number(nCodigo) === 0) {
        setDLastDate(dFirstDate);
        setDFirstDate(dLastDate);
        setDateStart(dFirstDate);
        setDateEnd(dLastDate);
        setReportDates(formattedDates);
      }
    } catch (error) {}
  };
  useEffect(() => {
    const data = getPaginatedData();

    if (data.length > 0) {
      const uniqueValues = Array.from(
        new Set(data.map((item) => item.id_supplier))
      );
      const uniqueValuesParNumber = Array.from(
        new Set(data.map((item) => item.part_number))
      );

      if (uniqueValuesParNumber.length === 1 && nameFilter.length > 5) {
        const partNumber = uniqueValuesParNumber[0];
        getDatesByPartNumbers(partNumber);
      }
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
          date < adjustedStartDate ||
          date > adjustedEndDate
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
  const singleView = (id, type = 'admin') => {
    // window.location.href = `/admin/reports/${id}`;
    if(type === 'admin'){
        navigate(`/admin/reports_insp/${id}`);        
    }
    if(type === 'client'){
        navigate(`/client/reports_insp/${id}`);
    }
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
    const clientName = clientsById[id]?.fullname
      ? clientsById[id].fullname
      : "";
    setSelectedClient(id);
    if (clientName !== "") {
      setClientsToReport((prev) => {
        if (!prev.some((client) => client.id === id && Number(id) !== 0)) {
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

  
  const defaultReportComponents =  {
    insp: {
      p: <p>{t("reports.inspection_reports")}</p>,
    },
    byh: {
      p: <p>{t("reports.hourly_reports")}</p>,
    },
    total_insp: {
      p: <p>{t("reports.total_inspection_reports")}</p>,
    },
  }
  const [reportesComponents, setReportesComponents] = useState(defaultReportComponents)

  useEffect(() => {
    if(Boolean(reportsByHour)){
        setReportesComponents(defaultReportComponents)
    }else{
        setReportesComponents({
            insp: {
              p: <p>{t("reports.inspection_reports")}</p>,
            },
            total_insp: {
              p: <p>{t("reports.total_inspection_reports")}</p>,
            },
          })
    }
  }, [reportsByHour])
    

  
  return {
    reportesComponents,
    nameFilter,
    dLastDate,
    dfirstDate,
    reportDates,
    loader,
    singleView,
    authClientsC,
    serverNodeUrl,
    currentPage,
    totalPages,
    rowsPerPage,
    nameFilterByH,
    uniqueClients,
    selectedClient,
    clientsToReport,    
    dateStart,
    dateEnd,
    filterOption,
    nameFilter2,
    uniqueSuppliers,
    filtersSupplier,
    uniquePart_number,
    filtersPartNumber,
    uniqueLots,
    filtersLot,
    uniqueSerial,
    filtersSerial,
    showFIltersT,
    showCharts,
    totalGeneral,
    isDownloading,
    handleNameFilterChange,
    setDateStart,
    setDateEnd,
    handleCheckBox,
    getPaginatedData,
    handleDel,
    handleFirstPageClick,
    handlePageChange,
    handleLastPageClick,
    setRowsPerPage,
    addClientToList,
    removeClient,
    handleNameFilterChange5,
    handleNameFilterChange2,
    handleNameFilterChange3,
    handleNameFilterChange4,
    setFilterOption,
    showFilterTable,
    setIsDownloading,
    t,
    setFiltersSupplier,
    setFiltersPartNumber,
    setFiltersLot,
    setFiltersSerial,
    dataToTable,
    isAdmin,
    reportsByHour
  };
};

export default useReportClient;
