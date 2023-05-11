import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { Toaster, toast } from "sonner";
import {
  getSuppliers,
  statusClient,
  statusEmployee,
  statusSupplier,
  statusUser,
} from "../api/daryan.api";
export const MainContext = createContext();
export const MainContextProvider = ({ children }) => {
  const dataSes = localStorage.getItem("sesType");
  /* const data = [
    {
      id: 1,
      date: "14/02/2023 11:29 a. m.",
    },
    {
      id: 2,
      date: "14/02/2023 10:50 a. m.",
    },
  ];*/
  //localStorage.setItem('dataTable', JSON.stringify(data));
  // const dataTS = localStorage.getItem("dataTable");
  //JSON.parse(dataTS)

  const [idDelete, setIdDelete] = useState("");
  const [tableName, setTableName] = useState("");
  const [data, setData] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataEmployees, setDataEmployees] = useState([]);
  const [dataClients, setDataClients] = useState([]);
  const [dataSuppliers, setDataSuppliers] = useState([]);
  const dataTS = localStorage.getItem("dataTable");
  //console.log(data);
  const [reportData, setReportData] = useState(
    dataTS === "" || dataTS === null ? [] : JSON.parse(dataTS)
  );
  const [dataToSave, setDataToSave] = useState([]);
  const aproveReport = (e) => {
    //  console.log(dataToSave);
    const dT = dataToSave[0];
    //console.log(dT.serviceType['st1']);

    if (
      dT.data.length < 9 ||
      dT.producedBy === "" ||
      dT.checkedBy === "" ||
      dT.authorizedBy === "" ||
      dT.serviceType.length === 0 ||
      dT.customerControl.length === 0 ||
      (dT.serviceType["st1"] === false &&
        dT.serviceType["st2"] === false &&
        dT.serviceType["st3"] === "") ||
      (dT.customerControl["cc1"] === false &&
        dT.customerControl["cc2"] === false &&
        dT.customerControl["cc3"] === false &&
        dT.customerControl["cc4"] === false &&
        dT.customerControl["cc5"] === "")
    ) {
      toast.error("Todos los campos con * con obligatorios", {
        duration: 5000,
      });

      return;
    }
    for (let i = 0; i < dT.customerControlTable.length; i++) {
      const element = dT.customerControlTable[i].values;

      for (let j = 0; j < element.length; j++) {
        const el = element[j];
        //console.log(el);
        if (j > 2 && j <= 9) {
          if (el === "") {
            toast.error("Todos los campos con * con obligatorios", {
              duration: 5000,
            });
            return;
          }
        }
      }
    }
    axios
      .post("http://localhost/daryan-server/api/aprove", dataToSave)
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
          setTimeout(() => {
            navigate("/admin/reports");
          }, 5000);
        }
      })
      .catch((err) => {
        //console.log(err);
        toast.error(err, {
          duration: 5000,
        });
      });
  };
  const navigate = useNavigate();
  const saveReport = (e) => {
    const dT = dataToSave[0];
    //console.log(dataToSave);

    if (
      dT.data.length < 9 ||
      dT.producedBy === "" ||
      dT.checkedBy === "" ||
      dT.authorizedBy === "" ||
      dT.serviceType.length === 0 ||
      dT.customerControl.length === 0
    ) {
      toast.error("Todos los campos con * con obligatorios", {
        duration: 5000,
      });

      return;
    }
    for (let i = 0; i < dT.customerControlTable.length; i++) {
      const element = dT.customerControlTable[i].values;

      for (let j = 0; j < element.length; j++) {
        const el = element[j];
        //console.log(el);
        if (j > 2 && j <= 9) {
          if (el === "") {
            toast.error("Todos los campos con * con obligatorios", {
              duration: 5000,
            });
            return;
          }
        }
      }
    }
    //  console.log(dataToSave);
    axios
      .post("http://localhost/daryan-server/api/save", dataToSave)
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
          // setTimeout(() => {
          //   navigate("/admin/reports");
          // }, 5000);
        }
      })
      .catch((err) => {
        toast.error(err, {
          duration: 5000,
        });
      });

    //  console.log('toy guardando klk');
    /*e.target.innerHTML = '<img src="/assets/img/loading2.svg" alt="" />';
    // console.log(data);
    //setData(data);
    setReportData((prev) => [...prev, data]);
    setTimeout(() => {
      e.target.innerHTML = "Enviar Reporte";
      window.location.replace("/user/reports");
    }, 1000);*/
    // setDataT(prev => [...prev, data]);
  };
  /*useEffect(() => {
    if (reportData.length !== 0) {
      //console.log(reportData);
      saveData();
    }
  }, [reportData]);*/
  const saveData = () => {
    localStorage.setItem("dataTable", JSON.stringify(reportData));
    setDataT(reportData);
  };

  const [dataT, setDataT] = useState(
    dataTS === "" || dataTS === null ? [] : JSON.parse(dataTS)
  );
  const [confirm, setConfirm] = useState(false);
  const handleDel = (id, tableName) => {
    //console.log(data, id);
    setIdDelete(id);
    setTableName(tableName);
    setConfirm(true);
  };
  const handleStatus = async (id, status, tableName) => {
    if (tableName === "clients") {
      await statusClient({ id, status })
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
            //setDataClients((data) => data.filter((data) => data.id !== `${id}`));
            //Update status from dataClient by id
            const newData = dataClients.map((item) => {
              if (item.id === id) {
                item.status = status === 1 ? 0 : 1;
              }
              return item;
            });
            setDataClients(newData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (tableName === "employees") {
      await statusEmployee({ id, status })
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
            const newData = dataEmployees.map((item) => {
              if (item.id === id) {
                item.status = status === 1 ? 0 : 1;
              }
              return item;
            });
            setDataEmployees(newData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (tableName === "suppliers") {
      await statusSupplier({ id, status })
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
            const newData = dataSuppliers.map((item) => {
              if (item.id === id) {
                item.status = status === 1 ? 0 : 1;
              }
              return item;
            });
            setDataSuppliers(newData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (tableName === "users") {
      await statusUser({ id, status })
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
            const newData = dataUsers.map((item) => {
              if (item.id === id) {
                item.status = status === 1 ? 0 : 1;
              }
              return item;
            });
            setDataUsers(newData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //setConfirm(true);
  };
  const handleConfirm = (callback) => {
    setConfirm(false);
  };
  const location = useLocation();
  /*
  useEffect(() => {
    if (location.pathname === "/user/reports") {
      fetch(
        "http://phpstack-921351-3198370.cloudwaysapps.com/server/api/get_sales"
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed.");
          }
          return response.json();
        })
        .then((data) => {
          
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // console.log('Route changed to:', location.pathname);
  }, [location]);*/
  const [showModalU, setShowModalU] = useState(false);
  const [showModalE, setShowModalE] = useState(false);
  const [showModalS, setShowModalS] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [updateId, setUpdateId] = useState(false);
  const [delType, setDelType] = useState(0);
  const [numFilas, setNumFilas] = useState(20);
  const [numColumnas, setNumColumnas] = useState(15);
  const [dbColumns, setDbColumns] = useState(["A", "B", "C", "D"]);
  const ABECEDARIO = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const getNextLetter = (prevTitulos) => {
    const valoresComunes = ABECEDARIO.filter((value, index) => {
      return (
        prevTitulos.indexOf(value) !== -1 && ABECEDARIO.indexOf(value) === index
      );
    });
    let nextVal = "";
    valoresComunes.forEach((element, index) => {
      const posicion = ABECEDARIO.indexOf(element);
      const siguiente = ABECEDARIO[posicion + 1];
      if (index + 1 === valoresComunes.length) {
        //   console.log(`Elemento ${index + 1}: ${element}, Siguiente: ${siguiente}`);
      }
      nextVal = siguiente;
    });
    /*const commonVal = valoresComunes.slice();
    commonVal.push(nextVal);*/

    return nextVal;
  };
  const [divs, setDivs] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numFilas; i++) {
      filas.push({
        id: i,
        values: Array.from({ length: numColumnas }, () => ""),
      });
    }
    return filas;
  });
  const eliminarFila = (itemId) => {
    //console.log(penultimate);

    setDivs((prevDatos) => prevDatos.filter((item) => item.id !== itemId));
    setNumFilas(numFilas - 1);
  };
  const eliminarColumna = (id) => {
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
  };

  const eliminarColumna2 = (id) => {
    //console.log(penultimate);
    const confirmMessage =
      "¿Estás seguro(a) que deseas borrar este inciso? Esta acción no podrá deshacerse.";
    const confirmResult = window.confirm(confirmMessage);

    if (confirmResult) {
      // The user clicked OK.
      // Do something.
      // setDivs((prevDatos) => {
      //   const newData = prevDatos.slice(); //copy array
      //   newData.map((fila) => {
      //     const newArra = fila.values;
      //     newArra.splice(-2, 1); // remove last item
      //     return newArra; // Return the updated array
      //   });
      //   return newData;
      // });
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
  //console.log(divs);
  const container1Ref = useRef(null);
  const container2Ref = useRef(null);
  const btnCloseRef = useRef(null);
  const handleScroll1 = () => {
    container2Ref.current.scrollLeft = container1Ref.current.scrollLeft;
  };

  const handleScroll2 = () => {
    container1Ref.current.scrollLeft = container2Ref.current.scrollLeft;
  };
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
    setDivs((prevDatos) => {
      const newData = prevDatos.slice(); //copy array
      newData.map((fila) => {
        const newArra = fila.values;
        newArra.push(""); // remove last item
        return newArra; // Return the updated array
      });
      return newData;
    });
  };

  const agregarColumna2 = (e) => {
    setNumColumnas((prev) => prev + 1);
    setTitulosColumnas2((prevTitulos) => {
      const nextLetter = getNextLetter(prevTitulos);
      setDbColumns((prev) => [...prev, nextLetter]);
      //   console.log(nextLetter);
      const newArr = [...prevTitulos, nextLetter];
      const arrayCopy = newArr.slice();
      const penultimate = arrayCopy.slice(-2, -1)[0];
      arrayCopy.splice(-2, 1);
      arrayCopy.push(penultimate);
      // const tableWrapper = document.querySelectorAll(".scrollX");

      // tableWrapper.forEach((element) => {
      //   const scrollWidth = element.scrollWidth;
      //   const clientWidth = element.clientWidth;
      //   if (scrollWidth >= clientWidth) {
      //     setTimeout(() => {
      //       element.scrollLeft = scrollWidth;
      //     }, 200);
      //   }
      // });

      return arrayCopy;
    });
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
    setNumFilas((prev) => prev + 1);
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
  //console.log(numColumnas)
  const [titulosColumnas, setTitulosColumnas] = useState([
    "",
    "Item",
    <>
      <div className="th-title">
        Fecha <span className="required">*</span>
      </div>
    </>,
    <>
      <div className="th-title">
        Lote <span className="required">*</span>
      </div>
    </>,
    <>
      <div className="th-title">
        Serial <span className="required">*</span>
      </div>
    </>,
    <>
      <div className="th-title">
        Cant Insp <span className="required">*</span>
      </div>
    </>,
    <>
      <div className="th-title">
        Pzas NG <span className="required">*</span>
      </div>
    </>,
    <>
      <div className="th-title">
        Pzas Ok <span className="required">*</span>
      </div>
    </>,
    <>
      <div className="th-title">
        Pzas RT <span className="required">*</span>
      </div>
    </>,
    <>
      <div className="th-title">
        Scrap <span className="required">*</span>
      </div>
    </>,
    "A",
    "B",
    "C",
    "D",
  ]);
  const [titulosColumnas2, setTitulosColumnas2] = useState([
    "",
    "Item",
    <>
      Fecha <span className="required">*</span>
    </>,
    <>
      Lote <span className="required">*</span>
    </>,
    <>
      Serie <span className="required">*</span>
    </>,
    <>
      Cant Insp <span className="required">*</span>
    </>,
    <>
      Pzas NG <span className="required">*</span>
    </>,
    <>
      Pzas Ok <span className="required">*</span>
    </>,
    <>
      Pzas RT <span className="required">*</span>
    </>,
    <>
      Scrap <span className="required">*</span>
    </>,
    "A",
    "B",
    "C",
    "D",
    <>
      <i className="fa-solid fa-circle-plus" onClick={agregarColumna}></i>
    </>,
  ]);
  /* useEffect(() => {
    //console.log(numColumnas);
    if (numColumnas > 15) {
    } else {
      if(numColumnas)
      setTitulosColumnas([
        "",
        "Items",
        "Fecha",
        "Lote",
        "Serie",
        "Cantidad Inspeccionada",
        "Piezas NG:",
        "Piezas Ok:",
        "Piezas Retrabajadas:",
        "Scrap:",
        "A",
        "B",
        "C",
        "D",
        <>
          <i className="fa-solid fa-circle-plus" onClick={agregarColumna}></i>
        </>,
      ]);
    }
  }, [numColumnas]);*/
  useEffect(() => {
    const penultimate = titulosColumnas.slice(-2, -1)[0];
    if (penultimate === "I") {
      // setTitulosColumnas((prev) => {
      //   prev[titulosColumnas.length - 1] = <></>;
      //   return prev;
      // });
    } else {
      // if(penultimate === 'D'){
      //   setTitulosColumnas((prev) => {
      //     prev[titulosColumnas.length - 1] = (
      //       <>
      //         <i className="fa-solid fa-circle-plus" onClick={agregarColumna}></i>
      //       </>
      //     );
      //     return prev;
      //   });
      // }
    }
  }, [numColumnas]);
  //console.log(titulosColumnas);
  const [total1, setTotal1] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [total3, setTotal3] = useState(0);
  const [total4, setTotal4] = useState(0);
  const [total5, setTotal5] = useState(0);
  const [total6, setTotal6] = useState(0);
  const [total7, setTotal7] = useState(0);
  const [total8, setTotal8] = useState(0);
  const [total9, setTotal9] = useState(0);
  const [total10, setTotal10] = useState(0);
  const [total11, setTotal11] = useState(0);
  const [total12, setTotal12] = useState(0);
  const [total13, setTotal13] = useState(0);
  const [total14, setTotal14] = useState(0);
  const [sort, setSort] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const formattedDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day}`;
    // const date = new Date(value); // Supongamos que la fecha que quieres formatear es la fecha actual

    // const year = date.getFullYear(); // Obtiene el año de la fecha
    // const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Obtiene el mes de la fecha y lo convierte a una cadena con dos dígitos, y se agrega un cero inicial si el mes es menor a 10
    // const day = date.getDate().toString().padStart(2, "0"); // Obtiene el día del mes de la fecha y lo convierte a una cadena con dos dígitos, y se agrega un cero inicial si el día es menor a 10

    // const result = `${year}-${month}-${day}`; // Combina los valores del año, mes y día en una cadena con el formato deseado
    return formattedDateTime;
  };
  const [dataCDb, setDataCDb] = useState([]);
  const [dbChanges, setDbChanges] = useState([]);
  const [showModalClient, setShowModalClient] = useState(false);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [showModalSupplier, setShowModalSupplier] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    async function loadTask() {
      const res2 = await getSuppliers();
      setSuppliers(res2.data);
    }
    loadTask();
  }, []);

  const [deletingInc, setDeletingInc] = useState(0);
  //const [dataClients, setDataClients] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [checkList, setCheckList] = useState([]);
  const [uniqueClients, setUniqueClients] = useState([]);
  const [clientsToReport, setClientsToReport] = useState([]);
  const [authClientsT, setAuthClientsT] = useState([]);
  const [position, setPosition] = useState('top-center');
  return (
    <MainContext.Provider
      value={{
        dataSes,
        dataT,
        data,
        setData,
        saveReport,
        aproveReport,
        dataToSave,
        setDataToSave,
        dataTS,
        reportData,
        confirm,
        setConfirm,
        handleDel,
        handleStatus,
        idDelete,
        setIdDelete,
        handleConfirm,
        showModalU,
        setShowModalU,
        updateId,
        setUpdateId,
        showModalE,
        setShowModalE,
        showModalS,
        setShowModalS,
        showModalC,
        setShowModalC,
        delType,
        setDelType,
        numFilas,
        setNumFilas,
        numColumnas,
        setNumColumnas,
        titulosColumnas,
        setTitulosColumnas,
        titulosColumnas2,
        setTitulosColumnas2,
        agregarColumna,
        agregarColumna2,
        agregarFila,
        eliminarColumna,
        eliminarFila,
        divs,
        setDivs,
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
        dbColumns,
        setDbColumns,
        container1Ref,
        container2Ref,
        handleScroll1,
        handleScroll2,
        sort,
        setSort,
        toast,
        isLoading,
        setIsLoading,
        formattedDate,
        getNextLetter,
        dataUsers,
        setDataUsers,
        dataEmployees,
        setDataEmployees,
        dataClients,
        setDataClients,
        dataSuppliers,
        setDataSuppliers,
        serverUrl,
        tableName,
        setTableName,
        dataCDb,
        setDataCDb,
        btnCloseRef,
        dbChanges,
        setDbChanges,
        showModalClient,
        setShowModalClient,
        showModalEmployee,
        setShowModalEmployee,
        showModalUser,
        setShowModalUser,
        showModalSupplier,
        setShowModalSupplier,
        suppliers,
        setSuppliers,
        eliminarColumna2,
        deletingInc,
        setDeletingInc,
        activeTab,
        setActiveTab,
        checkList,
        setCheckList,
        uniqueClients,
        setUniqueClients,
        clientsToReport,
        setClientsToReport,
        showModalAuth,
        setShowModalAuth,
        authClientsT,
        setAuthClientsT,
        setPosition
      }}
    >
      <Toaster richColors position={position} closeButton />
      {children}
    </MainContext.Provider>
  );
};
