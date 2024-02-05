import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MainContext } from "../../../context/MainContext";
import { useNavigate, useParams } from "react-router-dom";
import { StyledForm, Table } from "../../../styles/Styles";
import SecondTableCreate from "./SecondTableCreate";

import {
  deleteReportIn,
  deleteReportItem,
  getReportsByPartNumber,
} from "../../../api/daryan.api";
import Select from "../../employee/Select";
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
  TextField,
} from "@mui/material";
import InputDate from "../../../components/inputs/InputDate";
import Create3 from "../../employee/Create3";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../context/LanguageContext";
import useReports from "../../../hooks/useReports";
import ReportPart3 from "./ReportPart3";

const View = () => {
  const { t } = useTranslation();

  const {
    titulosColumnas,
    total1,
    setTotal1,
    total2,
    setTotal2,
    total3,
    setTotal3,
    total4,
    setTotal4,
    total5,
    setTotal5,
    total6,
    setTotal6,
    total7,
    setTotal7,
    total8,
    setTotal8,
    total9,
    setTotal9,
    total10,
    setTotal10,
    total11,
    setTotal11,
    total12,
    setTotal12,
    total13,
    setTotal13,
    total14,
    setTotal14,
    setDataToSave,
    container1Ref,
    container2Ref,
    handleScroll1,
    handleScroll2,
    data,
    dataTS,
    formattedDate,
    setTitulosColumnas,
    setDbColumns,
    getNextLetter,
    dataCDb,
    setDataCDb,
    numColumnas,
    setNumColumnas,
    suppliers,
    toast,
    isAdmin,
    activeTabReportInsp,
    divsSamplingTableInsp,
    setDivsSamplingTableInsp,
    setNumFilas,
    onlyNumbers,
    token,
    setIdReport,
  } = useContext(MainContext);
  const { lang } = useContext(LanguageContext);

  const [incType, setIncType] = useState([]);

  const { reportIncidents, dataSes } = useReports();

  const params = useParams();
  const idReport = params.id;
  const eData =
    data.length === 0
      ? JSON.parse(dataTS).filter(
          (d) => Number(d.report_id) === Number(idReport)
        )[0]
      : data.filter((data) => Number(data.id) === Number(idReport))[0];

  const [dataC, setDataC] = useState(eData);

  //console.log(.filter((d) => Number(d.report_id) === Number(idReport)))
  const [producedBy, setProducedBy] = useState(eData.made_by);
  const [checkedBy, setCheckedBy] = useState(eData.checked_by);
  const [authorizedBy, setAuthorizedBy] = useState(eData.authorized_by);
  const clauses = Number(dataC.report_in.length);
  const newLength = 11 + clauses;
  const [numFilas2, setNumFilas2] = useState(Number(dataC.reports_cc.length));
  const [numColumnas2, setNumColumnas2] = useState(
    newLength < 15 ? 15 : newLength
  );

  useEffect(() => {
    const reports_sample_table = eData.report_sata;
    const newList = reports_sample_table.map((item) => ({
      id: parseInt(item.id_item),
      values: [
        item.id,
        item.lot,
        item.serial,
        item.total_pieces_insp,
        item.total_pieces_sampling,
        item.hour,
        item.signature,
      ],
    }));

    setDivsSamplingTableInsp(newList);
    setIdReport(idReport);
    setDataCDb([])

    return () => {};
  }, []);

  const [divs, setDivs] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numFilas2; i++) {
      //filas
      filas.push({
        //llenar las filas
        id: i, //id de la fila
        values: Array.from({ length: numColumnas2 }, () => ""), //llenar con valores vacios
      });
    }

    for (let j = 0; j < filas.length; j++) {
      //filas
      const fil = filas[j]; //fila
      const values = fil.values; //valores de la fila
      if (dataC.reports_cc && dataC.reports_cc[j]) {
        //si hay datos en el reporte
        const keys = Object.keys(dataC.reports_cc[j]); //obtener las llaves de cada objeto
        for (let k = 0; k < values.length; k++) {
          //valores
          switch (
            k //switch para llenar los valores
          ) {
            case 0: //si es el indice k valor
              values[k] = dataC.reports_cc[j][keys[k]]; //llenar con el valor del objeto
              break;
            case 1:
              values[k] = dataC.reports_cc[j][keys[k + 1]];
              break;
            case 2:
              const date = dataC.reports_cc[j][keys[k + 1]];
              const fdate = formattedDate(date);
              values[k] = fdate;
              break;
            case 10:
              values[k] = dataC.reports_cc[j]["A"];
              break;
            case 11:
              values[k] = dataC.reports_cc[j]["B"];
              break;
            case 12:
              values[k] = dataC.reports_cc[j]["C"];
              break;
            case 13:
              values[k] = dataC.reports_cc[j]["D"];
              break;
            case 14:
              values[k] = dataC.reports_cc[j]["E"]
                ? dataC.reports_cc[j]["E"]
                : "";
              break;
            case 15:
              values[k] = dataC.reports_cc[j]["F"]
                ? dataC.reports_cc[j]["F"]
                : "";
              break;
            case 16:
              values[k] = dataC.reports_cc[j]["G"]
                ? dataC.reports_cc[j]["G"]
                : "";
              break;
            case 17:
              values[k] = dataC.reports_cc[j]["H"]
                ? dataC.reports_cc[j]["H"]
                : "";
              break;
            case 18:
              values[k] = dataC.reports_cc[j]["I"]
                ? dataC.reports_cc[j]["I"]
                : "";
              break;
            default:
              values[k] = dataC.reports_cc[j][keys[k + 1]];
              break;
          }
        }
      }
    }
    return filas;
  });
  useEffect(() => {
    setNumFilas(numFilas2);
    return () => {};
  }, [numFilas2]);

  useEffect(() => {
    setNumColumnas2(numColumnas);
  }, [numColumnas]);

  const eliminarFila = async (itemId, idDb) => {
    const confirmMessage =
      "¿Estás seguro(a) que deseas borrar este elemento? Esta acción no podrá deshacerse.";
    const confirmResult = window.confirm(confirmMessage);

    if (confirmResult) {
      if (idDb !== "") {
        await deleteReportItem({ id_rcc: idDb })
          .then((res) => {
            const datares = res.data;
            if (datares.error) {
              toast.error(datares.message, {
                duration: 5000,
              });
            } else {
              toast.success(datares.message, {
                duration: 4000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        //handleDel()
      }
      setDivs((prevDatos) => prevDatos.filter((item) => item.id !== itemId));
      setNumFilas2(numFilas2 - 1);
    }
  };
  const agregarFila = (numColumnas, date) => {
    setDivs((prevDatos) => [
      ...prevDatos,
      {
        id: prevDatos.length + 1,
        values: date
          ? Array.from({ length: numColumnas }, (v, i) =>
              i === 2 ? date : i < 6 ? "" : 0
            )
          : Array.from({ length: numColumnas }, () => ""),
      },
    ]);
    setNumFilas2((prev) => prev + 1);
    const tableWrapper = document.querySelector(".c2");
    const scrollHeight = tableWrapper.scrollHeight;
    const clientHeight = tableWrapper.clientHeight;
    if (scrollHeight > clientHeight) {
      setTimeout(() => {
        tableWrapper.scrollTo({ top: scrollHeight, behavior: "smooth" });
      }, 100);
    }
  };
  const eliminarColumna2 = async (inc) => {
    const confirmMessage =
      "¿Estás seguro(a) que deseas borrar este inciso? Esta acción no podrá deshacerse.";
    const confirmResult = window.confirm(confirmMessage);

    if (confirmResult) {
      await deleteReportIn({ inc: inc, id_report: idReport })
        .then((res) => {
          const datares = res.data;
          if (datares.error) {
            toast.error(datares.message, {
              duration: 5000,
            });
          } else {
            toast.success(datares.message, {
              duration: 4000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setDivs((prevDatos) => {
        const newData = prevDatos.slice(); //copy array
        newData.map((fila) => {
          const newArra = fila.values;
          newArra.splice(-2, 1); // remove last item
          return newArra; // Return the updated array
        });
        return newData;
      });
      setTitulosColumnas((prev) => {
        const newArray = prev.slice();
        newArray.splice(-1, 1); // remove last item
        return newArray;
      });
      setNumColumnas((prev) => prev - 1);
    } else {
      return false;
    }
  };

  useEffect(() => {
    setNumColumnas2(numColumnas);
  }, [numColumnas]);

  const [divs2, setDivs2] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numFilas2; i++) {
      filas.push({
        id: i,
        values: Array.from({ length: numColumnas2 - 3 }, () => ""),
      });
    }
    return filas;
  });

  const agregarColumna = (e) => {
    setNumColumnas((prev) => prev + 1);
    setTitulosColumnas((prevTitulos) => {
      const nextLetter = getNextLetter(prevTitulos);
      setDbColumns((prev) => [...prev, nextLetter]);

      const newArr = [...prevTitulos, nextLetter];
      const arrayCopy = newArr.slice();

      const tableWrapper = document.querySelectorAll(".scrollX");
      tableWrapper.forEach((element) => {
        const scrollWidth = element.scrollWidth;
        const clientWidth = element.clientWidth;
        if (scrollWidth >= clientWidth) {
          setTimeout(() => {
            element.scrollLeft = scrollWidth;
          }, 200);
        }
      });

      return arrayCopy;
    });
    setDivs((prev) => {
      const filas = [];
      for (let i = 1; i <= numFilas2; i++) {
        filas.push({
          id: i,
          values: Array.from({ length: numColumnas2 + 1 }, () => ""),
          // test:'aaaa'
        });
      }
      for (let j = 0; j < filas.length; j++) {
        const fil = filas[j];
        const values = fil.values;

        //const keys = Object.keys(dataC.reports_cc[j])
        if (dataC.reports_cc && dataC.reports_cc[j]) {
          const keys = Object.keys(dataC.reports_cc[j]);
          for (let k = 0; k < values.length; k++) {
            switch (k) {
              case 0:
                values[k] = dataC.reports_cc[j][keys[k]];
                break;
              case 1:
                values[k] = dataC.reports_cc[j][keys[k + 1]];
                break;
              case 2:
                const date = dataC.reports_cc[j][keys[k + 1]];
                const fdate = formattedDate(date);
                values[k] = fdate;
                break;
              case 10:
                values[k] = dataC.reports_cc[j]["A"];
                break;
              case 11:
                values[k] = dataC.reports_cc[j]["B"];
                break;
              case 12:
                values[k] = dataC.reports_cc[j]["C"];
                break;
              case 13:
                values[k] = dataC.reports_cc[j]["D"];
                break;
              case 14:
                values[k] = dataC.reports_cc[j]["E"]
                  ? dataC.reports_cc[j]["E"]
                  : "";
                break;
              case 15:
                values[k] = dataC.reports_cc[j]["F"]
                  ? dataC.reports_cc[j]["F"]
                  : "";
                break;
              case 16:
                values[k] = dataC.reports_cc[j]["G"]
                  ? dataC.reports_cc[j]["G"]
                  : "";
                break;
              case 17:
                values[k] = dataC.reports_cc[j]["H"]
                  ? dataC.reports_cc[j]["H"]
                  : "";
                break;
              case 18:
                values[k] = dataC.reports_cc[j]["I"]
                  ? dataC.reports_cc[j]["I"]
                  : "";
                break;
              default:
                values[k] = dataC.reports_cc[j][keys[k + 1]];
                break;
            }
          }
        }
      }
      return filas;
    });
  };
  const [reportFooter, setReportFooter] = useState(() => {
    const filas = [];
    const dataInfo = eData.report_rby;
    let i2 = 0;
    const rby = [];
    if (dataInfo[i2] && typeof dataInfo[i2] === "object") {
      const keys = Object.keys(dataInfo[i2]);
      for (let z = 0; z < dataInfo.length; z++) {
        if (
          dataInfo[i2] &&
          typeof dataInfo[i2] === "object" &&
          dataInfo[i2].hasOwnProperty("id")
        ) {
          const realized_by = dataInfo[i2]["realized_by"];
          const id = dataInfo[i2]["id"];
          rby.push({ realized_by, id });
        } else {
          //   "dataInfo[i2] no es un objeto válido o no contiene la clave 'id'"
          // );
        }
        i2++;
      }
      for (let i = 1; i <= numColumnas2 - 3; i++) {
        if (i > 7) {
          if (i !== numColumnas2 - 3) {
            //    console.log(rby[i - 8]);
            // ... código para aplicar la condición solamente en el último índice ...
            filas.push({
              id: i,
              values: Array.from({ length: 1 }, () => rby[i - 8]?.realized_by),
              id_db: Number(rby[i - 8]?.id),
              type: Number(rby[i - 8]?.type),
            });
          }
        }
      }
    } else {
    }

    return filas;
  });
  const [reportFooter2, setReportFooter2] = useState(() => {
    const filas = [];
    const dataInfo = eData.report_ob;
    let i2 = 0;
    const obs = [];
    if (dataInfo[i2] && typeof dataInfo[i2] === "object") {
      const keys = Object(dataInfo[i2]);
      for (let z = 0; z < dataInfo.length; z++) {
        if (
          dataInfo[i2] &&
          typeof dataInfo[i2] === "object" &&
          dataInfo[i2].hasOwnProperty("id")
        ) {
          const observations = dataInfo[i2]["observations"];
          const id = dataInfo[i2]["id"];
          obs.push({ observations, id });
        } else {
          //   "dataInfo[i2] no es un objeto válido o no contiene la clave 'id'"
          // );
        }
        i2++;
      }
      for (let i = 1; i <= numColumnas2 - 3; i++) {
        if (i > 7) {
          if (i !== numColumnas2 - 3) {
            // ... código para aplicar la condición solamente en el último índice ...
            filas.push({
              id: i,
              values: Array.from({ length: 1 }, () => obs[i - 8]?.observations),
              id_db: Number(obs[i - 8]?.id),
              type: Number(obs[i - 8]?.type),
            });
          }
        }
      }
    } else {
    }

    return filas;
  });

  const [reportFooter3, setReportFooter3] = useState(() => {
    const filas = [];
    const dataInfo = eData.report_in;
    let i2 = 0;
    const inc = [];
    if (dataInfo[i2] && typeof dataInfo[i2] === "object") {
      const keys = Object.keys(dataInfo[i2]);
      for (let z = 0; z < dataInfo.length; z++) {
        if (
          dataInfo[i2] &&
          typeof dataInfo[i2] === "object" &&
          dataInfo[i2].hasOwnProperty("id")
        ) {
          const incidents = dataInfo[i2]["incident"];
          const id = dataInfo[i2]["id"];
          const type = dataInfo[i2]["type"];
          inc.push({ incidents, id, type });
        } else {
          //   "dataInfo[i2] no es un objeto válido o no contiene la clave 'id'"
          // );
        }
        i2++;
      }
      for (let i = 1; i <= numColumnas2 - 3; i++) {
        if (i > 7) {
          if (i !== numColumnas2 - 3) {
            // ... código para aplicar la condición solamente en el último índice ...
            filas.push({
              id: i,
              values: Array.from({ length: 1 }, () => inc[i - 8]?.incidents),
              id_db: Number(inc[i - 8]?.id),
              type: Number(inc[i - 8]?.type),
            });
          }
        }
      }
    } else {
    }

    return filas;
  });

  const handleUpdate = (hanldeId = 1, divId, inputIndex, newValue) => {
    if (hanldeId === 1) {
      setReportFooter((prevDivs) => {
        const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
        const updatedDiv = { ...prevDivs[divToUpdateIndex] };
        updatedDiv.values[inputIndex] = newValue;
        const updatedDivs = [...prevDivs];
        updatedDivs[divToUpdateIndex] = updatedDiv;
        return updatedDivs;
      });
    }
    if (hanldeId === 2) {
      setReportFooter2((prevDivs) => {
        const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
        const updatedDiv = { ...prevDivs[divToUpdateIndex] };
        updatedDiv.values[inputIndex] = newValue;
        const updatedDivs = [...prevDivs];
        updatedDivs[divToUpdateIndex] = updatedDiv;
        return updatedDivs;
      });
    }
    if (hanldeId === 3) {
      setReportFooter3((prevDivs) => {
        const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
        const updatedDiv = { ...prevDivs[divToUpdateIndex] };
        updatedDiv.values[inputIndex] = newValue;
        const updatedDivs = [...prevDivs];
        updatedDivs[divToUpdateIndex] = updatedDiv;
        return updatedDivs;
      });
    }
  };

  const reports_st = eData.reports_st;
  const report_cc = eData.report_cc;
  const [serviceType, setServiceType] = useState({
    st1: reports_st.visual_inspection === "1" ? true : false,
    st2: reports_st.re_wrok === "1" ? true : false,
    st3: reports_st.others,
  });
  const [customerControl, setCustomerControl] = useState({
    cc1: report_cc.production_date === "1" ? true : false,
    cc2: report_cc.aprobal_date === "1" ? true : false,
    cc3: report_cc.serial_number === "1" ? true : false,
    cc4: report_cc.lot === "1" ? true : false,
    cc5: report_cc.others,
  });
  useEffect(() => {
    setDivs2((prev) => {
      const filas = [];
      for (let i = 1; i <= numFilas2; i++) {
        filas.push({
          id: i,
          values: Array.from({ length: numColumnas2 - 3 }, () => ""),
        });
      }
      return filas;
    });

    setReportFooter((prev) => {
      const filas = [];
      const dataInfo = eData.report_rby;
      let i2 = 0;
      const rby = [];

      if (dataInfo[i2] && typeof dataInfo[i2] === "object") {
        const keys = Object.keys(dataInfo[i2]);
        for (let z = 0; z < dataInfo.length; z++) {
          if (
            dataInfo[i2] &&
            typeof dataInfo[i2] === "object" &&
            dataInfo[i2].hasOwnProperty("id")
          ) {
            const realized_by = dataInfo[i2]["realized_by"];
            const id = dataInfo[i2]["id"];
            rby.push({ realized_by, id });
          } else {
            //   "dataInfo[i2] no es un objeto válido o no contiene la clave 'id'"
            // );
          }
          i2++;
        }
        for (let i = 1; i <= numColumnas2 - 3; i++) {
          if (i > 7) {
            if (i !== numColumnas2 - 3) {
              // ... código para aplicar la condición solamente en el último índice ...
              filas.push({
                id: i,
                values: Array.from({ length: 1 }, () =>
                  rby[i - 8] !== undefined ? rby[i - 8].realized_by : ""
                ),
                id_db: rby[i - 8] ? Number(rby[i - 8].id) : "",
              });
            }
          }
        }
      } else {
      }

      return filas;
    });
    setReportFooter2((prev) => {
      const filas = [];
      const dataInfo = eData.report_ob;
      let i2 = 0;
      const obs = [];
      if (dataInfo[i2] && typeof dataInfo[i2] === "object") {
        const keys = Object(dataInfo[i2]);
        for (let z = 0; z < dataInfo.length; z++) {
          if (
            dataInfo[i2] &&
            typeof dataInfo[i2] === "object" &&
            dataInfo[i2].hasOwnProperty("id")
          ) {
            const observations = dataInfo[i2]["observations"];
            const id = dataInfo[i2]["id"];
            obs.push({ observations, id });
          } else {
            //   "dataInfo[i2] no es un objeto válido o no contiene la clave 'id'"
            // );
          }
          i2++;
        }
        for (let i = 1; i <= numColumnas2 - 3; i++) {
          if (i > 7) {
            if (i !== numColumnas2 - 3) {
              // ... código para aplicar la condición solamente en el último índice ...
              filas.push({
                id: i,
                values: Array.from({ length: 1 }, () =>
                  obs[i - 8] ? obs[i - 8].observations : ""
                ),
                id_db: obs[i - 8] ? Number(obs[i - 8].id) : "",
              });
            }
          }
        }
      } else {
      }

      return filas;
    });
    setReportFooter3((prev) => {
      const filas = [];
      const dataInfo = eData.report_in;
      let i2 = 0;
      const inc = [];
      if (dataInfo[i2] && typeof dataInfo[i2] === "object") {
        const keys = Object.keys(dataInfo[i2]);
        for (let z = 0; z < dataInfo.length; z++) {
          if (
            dataInfo[i2] &&
            typeof dataInfo[i2] === "object" &&
            dataInfo[i2].hasOwnProperty("id")
          ) {
            const incidents = dataInfo[i2]["incident"];
            const id = dataInfo[i2]["id"];
            const type = dataInfo[i2]["type"];
            inc.push({ incidents, id, type });
          } else {
            //   "dataInfo[i2] no es un objeto válido o no contiene la clave 'id'"
            // );
          }
          i2++;
        }
        for (let i = 1; i <= numColumnas2 - 3; i++) {
          if (i > 7) {
            if (i !== numColumnas2 - 3) {
              // ... código para aplicar la condición solamente en el último índice ...
              filas.push({
                id: i,
                values: Array.from({ length: 1 }, () =>
                  inc[i - 8] ? inc[i - 8].incidents : ""
                ),
                id_db: inc[i - 8] ? Number(inc[i - 8].id) : "",
                type: inc[i - 8] ? Number(inc[i - 8].type) : "",
              });
            }
          }
        }
      } else {
      }

      return filas;
    });

    return () => {};
  }, [numColumnas2, numColumnas]);

  useEffect(() => {
    const filteredIncidents = reportFooter3.filter(
      (d) => Number(d?.values[0]) !== 0
    );
    const newArray = [
      {
        data: dataCDb,
        serviceType: serviceType,
        customerControl: customerControl,
        customerControlTable: divs,
        madeBy: reportFooter,
        observations: reportFooter2,
        incidents: filteredIncidents,
        producedBy: producedBy,
        checkedBy: checkedBy,
        authorizedBy: authorizedBy,
        id_report: dataC.id,
        reports_cc: dataC.reports_cc,        
        total: {
          cant: total1,
          ng: total2,
          ok: total3,
          rework: total4,
          scrap: total5,
          a: total6,
          b: total7,
          c: total8,
          d: total9,
          e: total10,
          f: total11,
          g: total12,
          h: total13,
          i: total14,
        },
        incType: incType,
        sampling_table: divsSamplingTableInsp,
        
      },
    ];
    setDataToSave(newArray);
  }, [
    dataCDb,
    dataC,
    serviceType,
    customerControl,
    divs,
    reportFooter,
    reportFooter2,
    reportFooter3,
    producedBy,
    checkedBy,
    authorizedBy,
    total1,
    total2,
    total3,
    total4,
    total5,
    total6,
    total7,
    total8,
    total9,
    total10,
    total11,
    total12,
    total13,
    total14,
    incType,
    divsSamplingTableInsp,
  ]);

  useEffect(() => {
    const keys = Object.keys(dataC.reports_cc[0]);
    keys.splice(1, 1); // Elimina el elemento en la posición 1 (id_report)
    keys[0] = "";
    keys[2] = (
      <>
        <div className="th-title">
          {t("reports.date")} <span className="required">*</span>
        </div>
      </>
    );
    keys[3] = (
      <>
        <div className="th-title">
          {t("reports.batch")} <span className="required">*</span>
        </div>
      </>
    );
    keys[4] = (
      <>
        <div className="th-title">
          {t("reports.series")} <span className="required">*</span>
        </div>
      </>
    );
    keys[5] = (
      <>
        <div className="th-title">
          {t("reports.qntInsp")} <span className="required">*</span>
        </div>
      </>
    );
    keys[6] = (
      <>
        <div className="th-title">
          {t("reports.picesNg")} <span className="required">*</span>
        </div>
      </>
    );
    keys[7] = (
      <>
        <div className="th-title">
          {t("reports.picesOk")} <span className="required">*</span>
        </div>
      </>
    );
    keys[8] = (
      <>
        <div className="th-title">
          {t("reports.picesRt")} <span className="required">*</span>
        </div>
      </>
    );
    keys[9] = (
      <>
        <div className="th-title">
          scrap <span className="required">*</span>
        </div>
      </>
    );
    keys.splice(10, 2);

    const kLenght = keys.length + 1;
    setNumColumnas(kLenght);

    setTitulosColumnas(keys);
    setDataCDb({
      plant: dataC.plant,
      supplier: dataC.supplier,
      date: dataC.date,
      report_number: dataC.report_number,
      part_name: dataC.part_name,
      worked_hours: dataC.worked_h,
      rate: dataC.rate,
      shift: dataC.shift,
      part_number: dataC.part_number,
      id_supplier: dataC.id_supplier,
      downtime:dataC.downtime,
    });
  }, [t]);

  useEffect(() => {
    let dataFromDb;
    try {
      dataFromDb = JSON.parse(dataTS).filter(
        (d) => Number(d.report_id) === Number(idReport)
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return; // Early return in case of error
    }

    if (dataFromDb.length > 0) {
      const timerId = setTimeout(() => {
        const {
          plant,
          supplier,
          date,
          report_number,
          part_name,
          worked_h,
          rate,
          shift,
          part_number,
          id_supplier,
          report_id,
          downtime
        } = dataFromDb[0];
        const getAllDetails = async (partNumber) => {
          //setIsLoading(true); // Comienza la carga
          try {
            const res = await getReportsByPartNumber({ partNumber, token });
            const data = res?.data;
            const { column_values = [] } = data;

            setIncType(column_values.filter((cv) => cv.report_id === idReport));
            
          } catch (err) {
            console.log(err);
          }
        };
        getAllDetails(part_number);
        setDataCDb({
          plant,
          supplier,
          date,
          report_number,
          part_name,
          worked_hours: worked_h,
          rate,
          shift,
          part_number,
          id_supplier,
          report_id,
          downtime
        });
      }, 100);

      // Return a cleanup function to clear the timer
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [dataTS, idReport]);

  const [dumpValue, setDumpValue] = useState("");
  const inputRef = useRef();
  const dataListRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin !== null) {
      if (!isAdmin) {
        navigate(`/client/reports/${idReport}`, { replace: true });
      }
    }
  }, [isAdmin]);
  const optionClause = [
    {
      value: "1",
      text: "Mal",
    },
    {
      value: "2",
      text: "Re trabajo",
    },
    {
      value: "3",
      text: "Scrap",
    },
  ];
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (Object.keys(dataCDb).length > 0) {
      const totalInsp = Number(total1);
      const rate = dataCDb.rate;
      const totalHours = Number(totalInsp) / Number(rate);
      setTotalHours(totalHours);
    }
  }, [total1, dataCDb]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDataCDb({
      ...dataCDb,
      [name]: value,
    });
  };

  const supplierValue = suppliers?.find(
    (supplier) => Number(supplier?.id) === Number(dataC?.id_supplier)
  );

  useEffect(() => {
    if (Object.keys(dataCDb).length > 0) {
      const totalInsp = Number(total1);
      const rate = dataCDb.rate;

      if (onlyNumbers.test(rate)) {
        const totalHours = Number(totalInsp) / Number(rate);
        setTotalHours(totalHours);
      } else {
        setTotalHours(0);
      }
    }
  }, [total1, dataCDb]);
  useEffect(() => {
    if (totalHours > 0) {
      setDataCDb({
        ...dataCDb,
        ["worked_hours"]: totalHours,
      });
    }
    if (totalHours === 0) {
      setDataCDb({
        ...dataCDb,
        ["worked_hours"]: "",
      });
    }
  }, [totalHours]);
  const tabContent = {
    1: {
      component: (
        <>
          <div className="container">
            <div className="title">
              <h3>{t("reports.inspection_report_title")}</h3>
              <br />
            </div>

            <StyledForm>
              <Box className="form-container">
                <TextField
                  id="outlined-basic"
                  label={t("table.plant")}
                  required
                  variant="outlined"
                  sx={{
                    width: "95%",
                  }}
                  type="text"
                  name="plant"
                  placeholder=""
                  defaultValue={dataC.plant}
                  onChange={(e) =>
                    setDataCDb({
                      ...dataCDb,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>
              <Box className="form-container">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="id_supplier"
                  options={suppliers}
                  getOptionLabel={(option) => option.fullname}
                  sx={{ width: "95%" }}
                  value={supplierValue ? supplierValue : null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={t("table.supplier")}
                      name="id_supplier"
                    />
                  )}
                  onChange={(e, newValue) =>
                    setDataCDb({
                      ...dataCDb,
                      id_supplier: newValue ? newValue.id : null,
                    })
                  }
                />
              </Box>
              <Box
                className="form-containers"
                style={{
                  width: "24%",
                }}
              >
                <InputDate
                  id="data3"
                  name="date"
                  style={{ textAlign: "left", padding: "12px 20px" }}
                  defaultValue={dataC.date}
                  type="text"
                  data={dataCDb}
                  setData={setDataCDb}
                />
              </Box>
              <Box className="form-container">
                <TextField
                  id="outlined-basic"
                  label={t("reports.report_number_label")}
                  variant="outlined"
                  type="text"
                  name="report_number"
                  placeholder=""
                  required
                  sx={{
                    width: "95%",
                  }}
                  disabled
                  defaultValue={dataC.report_number}
                />
              </Box>
              <Box className="form-container">
                <TextField
                  id="outlined-basic"
                  label={t("reports.part_name_label")}
                  variant="outlined"
                  type="text"
                  name="part_name"
                  placeholder=""
                  required
                  sx={{
                    width: "95%",
                  }}
                  defaultValue={dataC.part_name}
                  onChange={(e) =>
                    setDataCDb({
                      ...dataCDb,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>
              <Box className="form-container">
                <TextField
                  id="outlined-basic"
                  label={t("reports.worked_hours_label")}
                  variant="outlined"
                  type="text"
                  name="worked_hours"
                  placeholder=""
                  required
                  sx={{
                    width: "95%",
                  }}
                  defaultValue={dataC.worked_h}
                  value={
                    totalHours > 0 &&
                    typeof totalHours === "number" &&
                    onlyNumbers.test(dataCDb.rate)
                      ? totalHours.toFixed(0)
                      : dataCDb.worked_h
                  }
                  onChange={(e) =>
                    setDataCDb({
                      ...dataCDb,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>
              <Box className="form-container">
                <TextField
                  id="outlined-basic"
                  label="Rate"
                  variant="outlined"
                  sx={{
                    width: "95%",
                  }}
                  type="text"
                  name="rate"
                  placeholder=""
                  required
                  defaultValue={dataC.rate}
                  value={dataCDb.rate}
                  onChange={handleInputChange}
                />
              </Box>
              <Box className="form-container">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("reports.shift_label")}
                  </InputLabel>
                  <SelectMUI
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="shift"
                    type="text"
                    required
                    defaultValue={dataC.shift}
                    label="Turno"
                    sx={{
                      width: "95%",
                    }}
                    onChange={(e) =>
                      setDataCDb({
                        ...dataCDb,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </SelectMUI>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: "24%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label={t("reports.part_number_label")}
                  variant="outlined"
                  sx={{
                    width: "95%",
                  }}
                  type="text"
                  name="part_number"
                  placeholder=""
                  required
                  defaultValue={dataC.part_number}
                  value={dataCDb.part_number}
                  onChange={(e) =>
                    setDataCDb({
                      ...dataCDb,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>

              <Box
                sx={{
                  width: "24%",
                }}
              >
                <label htmlFor="data8">
                  {t("reports.service_type_label")}{" "}
                  <span className="required">*</span>
                </label>

                <div className="container-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="st1"
                      checked={serviceType.st1}
                      onChange={(e) =>
                        setServiceType({
                          ...serviceType,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    {t("reports.selection_label")}
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="st2"
                      checked={serviceType.st2}
                      onChange={(e) =>
                        setServiceType({
                          ...serviceType,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    {t("reports.rework_label")}
                  </label>
                  <label htmlFor=""> </label>
                  <label htmlFor=""> </label>
                  <label htmlFor=""> </label>
                  <div className="others-container">
                    <TextField
                      id="outlined-basic"
                      label="Otros"
                      variant="outlined"
                      sx={{
                        width: "95%",
                      }}
                      type="text"
                      name="st3"
                      value={serviceType.st3}
                      onChange={(e) =>
                        setServiceType({
                          ...serviceType,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </Box>
              <Box
                sx={{
                  width: "24%",
                }}
              >
                <label htmlFor="data8">
                  {t("reports.customer_control_label")}{" "}
                </label>

                <div className="container-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="cc1"
                      checked={customerControl.cc1}
                      onChange={(e) =>
                        setCustomerControl({
                          ...customerControl,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    {t("reports.production_date_label")}
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="cc2"
                      checked={customerControl.cc2}
                      onChange={(e) =>
                        setCustomerControl({
                          ...customerControl,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    {t("reports.approval_date_label")}
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="cc3"
                      checked={customerControl.cc3}
                      onChange={(e) =>
                        setCustomerControl({
                          ...customerControl,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    {t("reports.series_label")}
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="cc4"
                      checked={customerControl.cc4}
                      onChange={(e) =>
                        setCustomerControl({
                          ...customerControl,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    {t("reports.batch_label")}
                  </label>
                  <div className="others-container">
                    <TextField
                      id="outlined-basic"
                      label="Otros"
                      variant="outlined"
                      sx={{
                        width: "95%",
                      }}
                      type="text"
                      name="cc5"
                      value={customerControl.cc5}
                      onChange={(e) =>
                        setCustomerControl({
                          ...customerControl,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </Box>
              <Grid
                sx={{
                  width: "24%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label={t("table.downtime")}
                  sx={{
                    width: "95%",
                  }}
                  required
                  type="text"
                  name="downtime"
                  placeholder=""
                  defaultValue={dataC.downtime}
                  value={dataCDb.downtime}
                  onChange={(e) =>
                    setDataCDb({
                      ...dataCDb,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>
            </StyledForm>
          </div>
          <div
            className="container c2 scrollX"
            ref={container1Ref}
            onScroll={handleScroll1}
          >
            <SecondTableCreate
              dataC={dataC}
              eliminarColumna2={eliminarColumna2}
              agregarColumna={agregarColumna}
              divs={divs}
              setDivs={setDivs}
              agregarFila={agregarFila}
              eliminarFila={eliminarFila}
              numFilas2={numFilas2}
              numColumnas2={numColumnas2}
            />
          </div>
          <ReportPart3
            reportFooter2={reportFooter2}
            divs2={divs2}
            dumpValue={dumpValue}
            optionClause={optionClause}
            numColumnas={numColumnas2}
            reportFooter3={reportFooter3}
            handleUpdate={handleUpdate}
            reportIncidents={reportIncidents}
            producedBy={producedBy}
            checkedBy={checkedBy}
            dataSes={dataSes}
            setAuthorizedBy={setAuthorizedBy}
            authorizedBy={authorizedBy}
            container2Ref={container2Ref}
            handleScroll2={handleScroll2}
            titulosColumnas={titulosColumnas}
            divs={divs}
            total1={total1}
            setTotal1={setTotal1}
            total2={total2}
            setTotal2={setTotal2}
            total3={total3}
            setTotal3={setTotal3}
            total4={total4}
            setTotal4={setTotal4}
            total5={total5}
            setTotal5={setTotal5}
            total6={total6}
            setTotal6={setTotal6}
            total7={total7}
            setTotal7={setTotal7}
            total8={total8}
            setTotal8={setTotal8}
            total9={total9}
            setTotal9={setTotal9}
            total10={total10}
            setTotal10={setTotal10}
            total11={total11}
            setTotal11={setTotal11}
            total12={total12}
            setTotal12={setTotal12}
            total13={total13}
            setTotal13={setTotal13}
            total14={total14}
            setTotal14={setTotal14}
            reportFooter={reportFooter}
            setProducedBy={setProducedBy}
            setCheckedBy={setCheckedBy}
            incType={incType}
            setIncType={setIncType}
          />
        </>
      ),
    },
    2: {
      component: (
        <Create3
          divs={divsSamplingTableInsp}
          setDivs={setDivsSamplingTableInsp}
          reportType="insp"
        />
      ),
    },
  };

  return <>{tabContent[activeTabReportInsp]?.component}</>;
};

export default View;
