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
import DatePickerInputU from "../../../components/DateInputUpdate";
import { deleteReportIn, deleteReportItem } from "../../../api/daryan.api";
import Select from "../../employee/Select";

const View = () => {
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
    dataToSave,
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
    incType
  } = useContext(MainContext);
  const params = useParams();
  const idReport = params.id;
  //const [numFilas, setNumFilas] = useState(0);
  const eData =
    data.length === 0
      ? JSON.parse(dataTS).filter(
          (data) => Number(data.id) === Number(idReport)
        )[0]
      : data.filter((data) => Number(data.id) === Number(idReport))[0];
  
  const [dataC, setDataC] = useState(eData);
  const [producedBy, setProducedBy] = useState(eData.made_by);
  const [checkedBy, setCheckedBy] = useState(eData.checked_by);
  const [authorizedBy, setAuthorizedBy] = useState(eData.authorized_by);
  const clauses = Number(dataC.report_in.length);
  const newLength = 11 + clauses;
  const [numFilas2, setNumFilas2] = useState(Number(dataC.reports_cc.length));
  const [numColumnas2, setNumColumnas2] = useState(newLength);
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

  const updateData = useCallback((data) => {
    setDataC(data);
  }, []);
  useEffect(() => {    

    setNumColumnas2(numColumnas);
    // setNumFilas2(numFilas);
  }, [numColumnas]);

  const eliminarFila = async(itemId, idDb) => {
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
          ? Array.from({ length: numColumnas }, (v, i) => (i === 2 ? date : ""))
          : Array.from({ length: numColumnas }, () => ""),
        // values: Array.from({ length: numColumnas }, () => ""),
      },
    ]);
    setNumFilas2((prev) => prev + 1);
    const tableWrapper = document.querySelector(".c2");
    const scrollHeight = tableWrapper.scrollHeight;
    const clientHeight = tableWrapper.clientHeight;
    if (scrollHeight > clientHeight) {
      //tableWrapper.scrollTop = scrollHeight - clientHeight;
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
      // The user clicked Cancel.
      // Do something else.
      return false;
    }
  };
  
  useEffect(() => {
    setNumColumnas2(numColumnas);
  }, [numColumnas]);  
  // const agregarColumnas = (e) => {  
  //   setTitulosColumnas((prevTitulos) => {
  //     const nextLetter = getNextLetter(prevTitulos);
  //     setDbColumns((prev) => [...prev, nextLetter]);
  //     const newArr = [...prevTitulos, nextLetter];
  //     const arrayCopy = newArr.slice();
  //     const penultimate = arrayCopy.slice(-2, -1)[0];
  //     arrayCopy.splice(-2, 1);
  //     arrayCopy.push(penultimate);
  //     const tableWrapper = document.querySelectorAll(".scrollX");

  //     tableWrapper.forEach((element) => {
  //       const scrollWidth = element.scrollWidth;
  //       const clientWidth = element.clientWidth;
  //       if (scrollWidth >= clientWidth) {
  //         setTimeout(() => {
  //           element.scrollLeft = scrollWidth;
  //         }, 200);
  //       }
  //     });

  //     return arrayCopy;
  //   });

  // };
  // useEffect(() => {
  //   if (Object.keys(dataC).length > 0) {
  //     setNumFilas2(Number(dataC.reports_cc.length));
//     
  //     const clauses = Number(dataC.report_in.length);
  //     const newLength = 11 + clauses;
  //     setNumColumnas2(newLength);
  //   }
  // }, []);

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
      //   console.log(nextLetter);
      const newArr = [...prevTitulos, nextLetter];
      const arrayCopy = newArr.slice();
      // const penultimate = arrayCopy.slice(-2, -1)[0];
      // arrayCopy.splice(-2, 1);
      // arrayCopy.push(penultimate);
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
            // if (k === 0) {
            //   //values[k] = dataC.reports_cc[j]['item']
          //   
          //   
            // }
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
              values: Array.from({ length: 1 }, () => rby[i - 8].realized_by),
              id_db: Number(rby[i - 8].id),
              type:Number(rby[i - 8].type),
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
              values: Array.from({ length: 1 }, () => obs[i - 8].observations),
              id_db: Number(obs[i - 8].id),
              type:Number(obs[i - 8].type),
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
              values: Array.from({ length: 1 }, () => inc[i - 8].incidents),
              id_db: Number(inc[i - 8].id),
              type: Number(inc[i - 8].type),
            });
          }          
        }
      }
    } else {    
    }

    return filas;
  });
  /*console.log(reportFooter);
  console.log(reportFooter2);
  console.log(reportFooter3);*/  
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
    const newArray = [
      {
        data: dataCDb,
        serviceType: serviceType,
        customerControl: customerControl,
        customerControlTable: divs,
        madeBy: reportFooter,
        observations: reportFooter2,
        incidents: reportFooter3,
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
        incType:incType,
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
    incType
  ]);
  // useEffect(() => {  
  //   const newArray = [
  //     {
  //       data: dataCDb,
  //       serviceType: serviceType,
  //       customerControl: customerControl,
  //       customerControlTable: divs,
  //       madeBy: reportFooter,
  //       observations: reportFooter2,
  //       incidents: reportFooter3,
  //       producedBy: producedBy,
  //       checkedBy: checkedBy,
  //       authorizedBy: authorizedBy,
  //       id_report: dataC.id,
  //       reports_cc: dataC.reports_cc,
  //     },
  //   ];
  //   setDataToSave(newArray);
  // }, [
  //   dataCDb,
  //   dataC,
  //   serviceType,
  //   customerControl,
  //   divs,
  //   reportFooter,
  //   reportFooter2,
  //   reportFooter3,
  //   producedBy,
  //   checkedBy,
  //   authorizedBy,
  // ]);
  const [keysTh, setKeysTh] = useState([]);
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day}`;
    const keys = Object.keys(dataC.reports_cc[0]);    
    const numCol = keys.length;
    keys.splice(1, 1); // Elimina el elemento en la posición 1 (id_report)
    keys[0] = "";
    keys[2] = <><div className="th-title">fecha <span className="required">*</span></div></>;
    keys[3] = <><div className="th-title">lote <span className="required">*</span></div></>;
    keys[4] = <><div className="th-title">serial <span className="required">*</span></div></>;
    keys[5] = <><div className="th-title">cant insp <span className="required">*</span></div></>;
    keys[6] = <><div className="th-title">pzas ng <span className="required">*</span></div></>;
    keys[7] = <><div className="th-title">pzas ok <span className="required">*</span></div></>;
    keys[8] = <><div className="th-title">pzas rt <span className="required">*</span></div></>;
    keys[9] = <><div className="th-title">scrap <span className="required">*</span></div></>;
    keys.splice(10, 2);
    
    const kLenght = keys.length + 1;
    setNumColumnas(kLenght);
    // if (lastKey !== "I") {
    //   keys.push(
    //     <>
    //        <i className="fa-solid fa-circle-plus" onClick={agregarColumna}></i>
    //     </>
    //   );

    // } else {
    //   keys.push(
    //     <>
    //       <i
    //         className="fa-solid fa-trash"
    //         onClick={() => eliminarColumna()}
    //       ></i>
    //     </>
    //   );
    // }
    setTitulosColumnas(keys);
  }, []);
  useEffect(() => {
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
    });
  }, []);
  const [dumpValue, setDumpValue] = useState("");
  const inputRef = useRef();
  const dataListRef = useRef();
  const getSelectedOptionLocation = () => {
    for (let i = 0; i < dataListRef.current.options.length; i++) {
      if (dataListRef.current.options[i].value === inputRef.current.value) {
        return dataListRef.current.options[i];
      }
    }
  };

  const handleChange = (e) => {
    const selectedOption = getSelectedOptionLocation();
    setDataC({
      ...dataC,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
    if (selectedOption == undefined) {
      setDataCDb({
        ...dataCDb,
        [e.target.dataset.name || e.target.name]: e.target.value,
      });    
    } else {
      const id_supplier = selectedOption.getAttribute("data-id");
      setDataCDb({
        ...dataCDb,
        id_supplier,
      });
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if(isAdmin !== null){            
      if (!isAdmin) {
        navigate(`/client/reports/${idReport}`, { replace: true })
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
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>REPORTE DE INSPECCION</h3>
          <br />
        </div>

        <StyledForm>
          <div className="form-container">
            <label htmlFor="data">Planta <span className="required">*</span></label>
            <input
              type="text"
              id="data"
              name="plant"
              placeholder=""
              required
              defaultValue={dataC.plant}              
              onChange={(e) =>
                setDataCDb({
                  ...dataCDb,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data2">Proveedor <span className="required">*</span></label>
            <input
              name="supplier"
              value={dataC.supplier}
              type="text"
              list="supplier"
              onChange={handleChange}
              ref={inputRef}
              autoComplete="off"
              
            />
            <datalist id="supplier" ref={dataListRef}>
              {suppliers.map((item, indx) => {
                // Verificar si el navegador es Firefox, Safari o Edge
                const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;
                const isSafari =
                  navigator.userAgent.indexOf("Safari") !== -1 ||
                  navigator.userAgent.indexOf("AppleWebKit") !== -1;
                const isEdge = navigator.userAgent.indexOf("Edge") !== -1;

                // Crear etiqueta de opción
                const option = (
                  <option value={item.fullname} data-id={item.id}>
                    type="text"
                    {isFirefox ? `${item.fullname}` : ""}
                  </option>
                );

                // Devolver opción
                return option;
              })}
            </datalist>
            {/* <input
              type="text"
              id="data2"
              name="supplier"
              placeholder=""
              required
              defaultValue=""
              value={data.supplier}
              type="text"
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            /> */}
          </div>
          <div className="form-container">
            <label htmlFor="data3">Fecha <span className="required">*</span></label>
            <DatePickerInputU
              id="data3"
              name="date"
              style={{ textAlign: "left", padding: "12px 20px" }}
              value={dataC.date}
              type="text"
              dataCDb={dataCDb}
            />
          </div>
          <div className="form-container">
            <label htmlFor="data4">No. de Reporte <span className="required">*</span></label>
            <input
              type="text"
              id="data4"
              name="report_number"
              placeholder=""
              required
              defaultValue={dataC.report_number}              
              onChange={(e) =>
                setDataCDb({
                  ...dataCDb,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data5">Nombre de parte <span className="required">*</span></label>
            <input              
              id="data5"
              name="part_name"
              placeholder=""
              required
              defaultValue={dataC.part_name}
              onChange={(e) =>
                setDataCDb({
                  ...dataCDb,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data6">Horas Trabajadas <span className="required">*</span></label>
            <input              
              id="data6"
              name="worked_hours"
              placeholder=""
              required
              defaultValue={dataC.worked_h}
              type="text"
              onChange={(e) =>
                setDataCDb({
                  ...dataCDb,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data7">Rate <span className="required">*</span></label>
            <input
              type="text"
              id="data7"
              name="rate"
              placeholder=""
              required
              defaultValue={dataC.rate}              
              onChange={(e) =>
                setDataCDb({
                  ...dataCDb,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data8">Turno <span className="required">*</span></label>
            <select
              id="data8"
              name="shift"
              required
              defaultValue={dataC.shift}
              type="text"
              onChange={(e) =>
                setDataCDb({
                  ...dataCDb,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            >
              <option value="0">Selecciona una opcion</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-container">
            <label htmlFor="data10">Numero de parte <span className="required">*</span></label>
            <input
              type="text"
              id="data10"
              name="part_number"
              placeholder=""
              required
              defaultValue={dataC.part_number}
              onChange={(e) =>
                setDataCDb({
                  ...dataCDb,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <label htmlFor="data8">Tipo de servicio <span className="required">*</span></label>

            <div className="container-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="st1"
                  checked={serviceType.st1}
                  onChange={(e) =>
                    setServiceType({
                      ...serviceType,
                      [e.target.dataset.name || e.target.name]:
                        e.target.checked,
                    })
                  }
                />
                Selección
              </label>

              <label>
                <input
                  type="checkbox"
                  name="st2"
                  checked={serviceType.st2}
                  onChange={(e) =>
                    setServiceType({
                      ...serviceType,
                      [e.target.dataset.name || e.target.name]:
                        e.target.checked,
                    })
                  }
                />
                Retrabajo
              </label>
              <label htmlFor=""> </label>
              <label htmlFor=""> </label>
              <label htmlFor=""> </label>
              <div className="others-container">
                <label>Otros</label>
                <input
                  type="text"
                  name="st3"
                  value={serviceType.st3}
                  onChange={(e) =>
                    setServiceType({
                      ...serviceType,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-container">
            <label htmlFor="data8">Control para el cliente <span className="required">*</span></label>

            <div className="container-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="cc1"
                  checked={customerControl.cc1}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]:
                        e.target.checked,
                    })
                  }
                />
                Fecha de produccion
              </label>

              <label>
                <input
                  type="checkbox"
                  name="cc2"
                  checked={customerControl.cc2}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]:
                        e.target.checked,
                    })
                  }
                />
                Fecha de aprobado
              </label>

              <label>
                <input
                  type="checkbox"
                  name="cc3"
                  checked={customerControl.cc3}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]:
                        e.target.checked,
                    })
                  }
                />
                Serie
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cc4"
                  checked={customerControl.cc4}
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]:
                        e.target.checked,
                    })
                  }
                />
                Lote
              </label>
              <div className="others-container">
                <label>Otros</label>
                <input
                  type="text"
                  name="cc5"
                  value={customerControl.cc5}                 
                  onChange={(e) =>
                    setCustomerControl({
                      ...customerControl,
                      [e.target.dataset.name || e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/*
        <label htmlFor="subject">Subject <span className="required">*</span></label>
        <select id="subject" name="subject">
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
        </select>

        <label htmlFor="message">Message <span className="required">*</span></label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          required
        ></textarea>*/}
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
        />
      </div>

      <div
        className="container scrollX c2"
        ref={container2Ref}
        onScroll={handleScroll2}
        style={{ overflow: "scroll", height: "auto" }}
      >
        <Table>
          <table>
            <thead className="no-sticky">
              <tr>
                {titulosColumnas.map((titulo, i) =>
                  i === 0 || i === titulosColumnas.length - 1 ? (
                    <th key={i}>
                      <i
                        className="fa-solid fa-circle-plus"
                        style={{ color: "transparent" }}
                      ></i>
                    </th>
                  ) : (
                    <th key={i}>{titulo}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {divs.map(
                (fila, i) =>
                  i === 0 && (
                    <tr key={fila.id} className="hidden">
                      {fila.values.map((valor, i) => (
                        <>
                          {i <= 1 || i === fila.values.length - 1 ? (
                            <td key={i} className="table-center">
                               
                            </td>
                          ) : (
                            <td key={i} className="table-center">
                              <input                                
                                name=""
                                value={dumpValue}
                                type="text"
                                onChange={() => setDumpValue("")}
                              />
                            </td>
                          )}
                        </>
                      ))}
                    </tr>
                  )
              )}
            </tbody>
            <tfoot className="tfooter">
              {divs2.map(
                (fila, i) =>
                  i === 0 && (
                    <tr key={fila.id}>
                      {fila.values.map((valor, i) => (
                        <>
                          {i === 0 ||
                          i === 1 ||
                          i === fila.values.length - 1 ? (
                            <>
                              {i === 1 && (
                                <td
                                  key={i}
                                  className="table-center"
                                  colSpan={5}
                                >
                                  Totales
                                </td>
                              )}
                              {i === 0 && <></>}
                            </>
                          ) : (
                            <td key={i} className="table-center">
                              {i === 2 && (
                                <input
                                  value={total1}
                                  type="text"
                                  onChange={(e) => setTotal1(e.target.value)}
                                />
                              )}
                              {i === 3 && (
                                <input
                                  value={total2}
                                  type="text"
                                  onChange={(e) => setTotal2(e.target.value)}
                                />
                              )}
                              {i === 4 && (
                                <input
                                  value={total3}
                                  type="text"
                                  onChange={(e) => setTotal3(e.target.value)}
                                />
                              )}
                              {i === 5 && (
                                <input
                                  value={total4}
                                  type="text"
                                  onChange={(e) => setTotal4(e.target.value)}
                                />
                              )}
                              {i === 6 && (
                                <input
                                  value={total5}
                                  type="text"
                                  onChange={(e) => setTotal5(e.target.value)}
                                />
                              )}
                              {i === 7 && (
                                <input
                                  value={total6}
                                  type="text"
                                  onChange={(e) => setTotal6(e.target.value)}
                                />
                              )}
                              {i === 8 && (
                                <input
                                  value={total7}
                                  type="text"
                                  onChange={(e) => setTotal7(e.target.value)}
                                />
                              )}
                              {i === 9 && (
                                <input
                                  value={total8}
                                  type="text"
                                  onChange={(e) => setTotal8(e.target.value)}
                                />
                              )}
                              {i === 10 && (
                                <input
                                  value={total9}
                                  type="text"
                                  onChange={(e) => setTotal9(e.target.value)}
                                />
                              )}
                              {i === 11 && (
                                <input
                                  value={isNaN(total10) ? 0 : total10}
                                  type="text"
                                  onChange={(e) => setTotal10(e.target.value)}
                                />
                              )}
                              {i === 12 && (
                                <input
                                  value={isNaN(total11) ? 0 : total11}
                                  type="text"
                                  onChange={(e) => setTotal11(e.target.value)}
                                />
                              )}
                              {i === 13 && (
                                <input
                                  value={isNaN(total12) ? 0 : total12}
                                  type="text"
                                  onChange={(e) => setTotal12(e.target.value)}
                                />
                              )}
                              {i === 14 && (
                                <input
                                  value={isNaN(total13) ? 0 : total13}
                                  type="text"
                                  onChange={(e) => setTotal13(e.target.value)}
                                />
                              )}
                              {i === 15 && (
                                <input
                                  value={isNaN(total14) ? 0 : total14}
                                  type="text"
                                  onChange={(e) => setTotal14(e.target.value)}
                                />
                              )}
                            </td>
                          )}
                        </>
                      ))}
                    </tr>
                  )
              )}
              <tr>
                <td colSpan={numColumnas2 / 3} style={{ textAlign: "center" }}>
                  <div>REALIZO</div>
                  {reportFooter.map(
                    (fila, i) =>
                      i < reportFooter.length &&
                      fila.values.map((valor, i) => (
                        <>
                          <input
                            value={valor}
                            type="text"
                            onChange={(e) =>
                              handleUpdate(1, fila.id, i, e.target.value)
                            }
                            key={i}
                          />{" "}
                          <br />
                        </>
                      ))
                  )}
                </td>
                <td colSpan={numColumnas2 / 3} style={{ textAlign: "center" }}>
                  <div>OBSERVACIONES</div>
                  {reportFooter2.map(
                    (fila, j) =>
                      j < reportFooter2.length &&
                      fila.values.map((valor, i) => (
                        <>
                          <input
                            value={valor}
                            type="text"
                            onChange={(e) =>
                              handleUpdate(2, fila.id, i, e.target.value)
                            }
                            key={i}
                          />
                          <br />
                        </>
                      ))
                  )}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  <div> </div>
                  {divs2.map(
                    (fila, i) =>
                      i === 0 &&
                      fila.values.map(
                        (valor, i) =>
                          i > 6 && (
                            <>
                              {i === 8 && (
                                <>
                                  <input
                                    placeholder="A"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 9 && (
                                <>
                                  <input
                                    placeholder="B"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 10 && (
                                <>
                                  <input
                                    placeholder="C"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 11 && (
                                <>
                                  <input
                                    placeholder="D"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 12 && (
                                <>
                                  <input
                                    placeholder="E"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 13 && (
                                <>
                                  <input
                                    placeholder="F"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 14 && (
                                <>
                                  <input
                                    placeholder="G"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 15 && (
                                <>
                                  <input
                                    placeholder="H"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                              {i === 16 && (
                                <>
                                  <input
                                    placeholder="I"
                                    readOnly
                                    style={{ textAlign: "center" }}
                                    key={i}
                                    value={dumpValue}
                                    type="text"
                                    onChange={() => setDumpValue("")}
                                  />{" "}
                                  <br />{" "}
                                </>
                              )}
                            </>
                          )
                      )
                  )}
                </td>
                <td colSpan={1} style={{ textAlign: "center" }}>
                  <div> </div>
                  {reportFooter3.map(
                    (fila, i) =>
                      i < reportFooter3.length &&
                      fila.values.map((valor, i2) => (
                        <>
                          <div key={i + "clause"}>
                                  {i === 0 && (
                                    <>
                                      <Select data={optionClause} clause="A" selected={fila.type}  />
                                      <br />
                                    </>
                                  )}
                                  {i === 1 && (
                                    <>
                                      <Select data={optionClause}  clause="B" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                  {i === 2 && (
                                    <>
                                      <Select data={optionClause}  clause="C" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                  {i === 3 && (
                                    <>
                                      <Select data={optionClause}  clause="D" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                  {i === 4 && (
                                    <>
                                      <Select data={optionClause}  clause="E" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                  {i === 5 && (
                                    <>
                                      <Select data={optionClause}  clause="F" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                  {i === 6 && (
                                    <>
                                      <Select data={optionClause}  clause="G" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                  {i === 7 && (
                                    <>
                                      <Select data={optionClause}  clause="H" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                  {i === 8 && (
                                    <>
                                      <Select data={optionClause}  clause="I" selected={fila.type}/>
                                      <br />
                                    </>
                                  )}
                                </div>
                        </>
                      ))
                  )}            
                </td>
                <td
                  colSpan={numColumnas2 > 15 ? numColumnas2 / 3 : 3}
                  style={{ textAlign: "center" }}
                >
                  <div>INCIDENTES</div>
                  {reportFooter3.map(
                    (fila, i) =>
                      i < reportFooter3.length &&
                      fila.values.map((valor, i) => (
                        <>
                          <input
                            value={valor}
                            type="text"
                            onChange={(e) =>
                              handleUpdate(3, fila.id, i, e.target.value)
                            }
                            key={i}
                          />{" "}
                          <br />
                        </>
                      ))
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={numColumnas2 / 3} style={{ textAlign: "center" }}>
                  <div>ELABORO</div>
                  <div className="firm">
                    <input                      
                      name=""
                      value={producedBy}
                      type="text"
                      onChange={(e) => setProducedBy(e.target.value)}
                      className="firm-input"
                    />
                  </div>
                </td>

                <td colSpan={numColumnas2 / 3} style={{ textAlign: "center" }}>
                  <div>REVISO</div>
                  <div className="firm">
                    <input                      
                      name=""
                      value={checkedBy}
                      type="text"
                      onChange={(e) => setCheckedBy(e.target.value)}
                      className="firm-input"
                    />
                  </div>
                </td>

                <td colSpan={numColumnas2 / 3} style={{ textAlign: "center" }}>
                  <div>AUTORIZO</div>
                  <div className="firm">
                    <input                      
                      name=""
                      value={authorizedBy}
                      type="text"
                      onChange={(e) => setAuthorizedBy(e.target.value)}
                      className="firm-input"
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </Table>
      </div>
    </>
  );
};

export default View;
