import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { Toaster, toast } from "sonner";
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
  const saveReport = (e) => {
    //  console.log(dataToSave);
    axios
      .post("http://localhost/daryan-server/api/save", dataToSave)
      .then((res) => {
        /*      const copyToSave = dataToSave.slice();

      copyToSave[0].customerControlTable.forEach((control, i) =>{


          console.log(control.values);
        
       // const vals = control.values.filter(v => v !== []);

      });*/
      })
      .catch((err) => {
        console.log(err);
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
  const hanldeDel = (id) => {
    //console.log(data, id);
    setIdDelete(id);
    setConfirm(true);
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
  const eliminarColumna = (penultimate) => {
    //console.log(penultimate);
    setTitulosColumnas((prev) => {
      const newArray = prev.slice();
      newArray.splice(-2, 1);
      return newArray;
    });

    setDivs((prevDatos) => {
      const newD = prevDatos.map((fila) => {
        const newArra = fila.values;
        newArra.pop();
      });
      return prevDatos;
    });
    setNumColumnas((prev) => prev - 1);
  };
  //console.log(divs);
  const container1Ref = useRef(null);
  const container2Ref = useRef(null);

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
      const penultimate = arrayCopy.slice(-2, -1)[0];
      arrayCopy.splice(-2, 1);
      arrayCopy.push(penultimate);
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
    setDivs((prevDatos) =>
      prevDatos.map((fila) => ({
        ...fila,
        values: [...fila.values, ""],
      }))
    );
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

  const agregarFila = (numColumnas) => {
    setDivs((prevDatos) => [
      ...prevDatos,
      {
        id: prevDatos.length + 1,
        values: Array.from({ length: numColumnas }, () => ""),
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
  const [titulosColumnas, setTitulosColumnas] = useState([
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
  const [titulosColumnas2, setTitulosColumnas2] = useState([
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
      setTitulosColumnas((prev) => {
        prev[titulosColumnas.length - 1] = (
          <>
            <i
              className="fa-solid fa-trash"
              onClick={() => eliminarColumna(penultimate)}
            ></i>
          </>
        );
        return prev;
      });
      setTitulosColumnas2((prev) => {
        prev[titulosColumnas2.length - 1] = (
          <>
            <i
              className="fa-solid fa-trash"
              onClick={() => eliminarColumna(penultimate)}
            ></i>
          </>
        );
        return prev;
      });
    } else {
      if (penultimate === "D") {
        setTitulosColumnas((prev) => {
          prev[titulosColumnas.length - 1] = (
            <>
              <i
                className="fa-solid fa-circle-plus"
                onClick={agregarColumna}
              ></i>
            </>
          );
          return prev;
        });
        setTitulosColumnas2((prev) => {
          prev[titulosColumnas2.length - 1] = (
            <>
              <i
                className="fa-solid fa-circle-plus"
                onClick={agregarColumna}
              ></i>
            </>
          );
          return prev;
        });
      }
    }
    //  console.log(penultimate);
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

  const formattedDate = (value) => {
    const date = new Date(value); // Supongamos que la fecha que quieres formatear es la fecha actual

    const year = date.getFullYear(); // Obtiene el año de la fecha
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Obtiene el mes de la fecha y lo convierte a una cadena con dos dígitos, y se agrega un cero inicial si el mes es menor a 10
    const day = date.getDate().toString().padStart(2, "0"); // Obtiene el día del mes de la fecha y lo convierte a una cadena con dos dígitos, y se agrega un cero inicial si el día es menor a 10

    const result = `${year}-${month}-${day}`; // Combina los valores del año, mes y día en una cadena con el formato deseado
    return result;
  };
  return (
    <MainContext.Provider
      value={{
        dataSes,
        dataT,
        data,
        setData,
        saveReport,
        dataToSave,
        setDataToSave,
        dataTS,
        reportData,
        confirm,
        setConfirm,
        hanldeDel,
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
      }}
    >
      <Toaster richColors position="top-center" closeButton />
      {children}
    </MainContext.Provider>
  );
};
