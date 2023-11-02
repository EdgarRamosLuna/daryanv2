import { useState, useEffect, useContext } from "react";
import { createIncident, getReportIncidents } from "../api/daryan.api";
import { toast } from "sonner";
import { MainContext } from "../context/MainContext";

const useReports = () => {
  const {
    openModalIncident,
    setOpenModalIncident,
    reportIncidents,
    setReportIncidents,
  } = useContext(MainContext);
  const loadTask = async () => {
    const res = await getReportIncidents();
    setReportIncidents(res.data);
  };
  useEffect(() => {
    loadTask();
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("t");
      const response = await createIncident(data, token);
      const { error, message } = response.data;
      if (error) {
        toast.error(message, {
          duration: 5000,
        });
      } else {
        setOpenModalIncident(false);
        await loadTask();
        toast.success(message, {
          duration: 4000,
        });
      }
      console.log(response);
    } catch (error) {
      toast.error("Error al guardar la incidencia");
    }
  };

  const [data, setData] = useState([]);
  const {
    numFilas,
    numColumnas,
    titulosColumnas,
    total1,
    divs,
    setDivs,
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
    dataToSave,
    container1Ref,
    container2Ref,
    handleScroll1,
    handleScroll2,
    suppliers,
    incType,
    activeTabReportInsp,
    setActiveTabReportInsp,
    divsSamplingTableInsp,
    setDivsSamplingTableInsp,
    onlyNumbers,
  } = useContext(MainContext);

  const [producedBy, setProducedBy] = useState("");
  const [checkedBy, setCheckedBy] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const dataSes = localStorage.getItem("sesType");
  const [totalHours, setTotalHours] = useState(0);

  const last_report_id = localStorage.getItem("last_report_id");
  useEffect(() => {
    setData({
      ...data,
      ["report_number"]: Number(last_report_id) + 1,
    });
  }, [last_report_id]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const totalInsp = Number(total1);
      const rate = data.rate;

      if (onlyNumbers.test(rate)) {
        const totalHours = Number(totalInsp) / Number(rate);
        setTotalHours(totalHours);
      } else {
      }
    }
  }, [total1, data]);
  useEffect(() => {
    if (totalHours > 0) {
      setData({
        ...data,
        ["worked_hours"]: totalHours,
      });
    }
  }, [totalHours]);

  const [divs2, setDivs2] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numFilas; i++) {
      filas.push({
        id: i,
        values: Array.from({ length: numColumnas - 3 }, () => ""),
      });
    }
    return filas;
  });

  const [reportFooter, setReportFooter] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numColumnas - 3; i++) {
      if (i > 7) {
        filas.push({
          id: i,
          values: Array.from({ length: 1 }, () => ""),
        });
      }
    }
    return filas;
  });
  const [reportFooter2, setReportFooter2] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numColumnas - 3; i++) {
      if (i > 7) {
        filas.push({
          id: i,
          values: Array.from({ length: 1 }, () => ""),
        });
      }
    }
    return filas;
  });
  const [reportFooter3, setReportFooter3] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numColumnas - 3; i++) {
      if (i > 7) {
        filas.push({
          id: i,
          values: Array.from({ length: 1 }, () => ""),
        });
      }
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

  const [serviceType, setServiceType] = useState([]);
  const [customerControl, setCustomerControl] = useState([]);
  useEffect(() => {
    setDivs2((prev) => {
      const filas = [];
      for (let i = 1; i <= numFilas; i++) {
        filas.push({
          id: i,
          values: Array.from({ length: numColumnas - 3 }, () => ""),
        });
      }
      return filas;
    });
    setReportFooter((prev) => {
      const filas = [];
      for (let i = 1; i <= numColumnas - 3; i++) {
        if (i > 7) {
          filas.push({
            id: i,
            values: Array.from({ length: 1 }, () => ""),
          });
        }
      }
      return filas;
    });
    setReportFooter2((prev) => {
      const filas = [];
      for (let i = 1; i <= numColumnas - 3; i++) {
        if (i > 7) {
          filas.push({
            id: i,
            values: Array.from({ length: 1 }, () => ""),
          });
        }
      }
      return filas;
    });
    setReportFooter3((prev) => {
      const filas = [];
      for (let i = 1; i <= numColumnas - 3; i++) {
        if (i > 7) {
          filas.push({
            id: i,
            values: Array.from({ length: 1 }, () => ""),
          });
        }
      }
      return filas;
    });

    return () => {};
  }, [numColumnas]);

  useEffect(() => {

    //console.log(reportFooter3.filter(d => Number(d.values[0]) !== 0))
    //console.log(reportFooter3)
    const filteredIncidents = reportFooter3.filter(d => Number(d?.values[0]) !== 0);
    const newArray = [
      {
        data: data,
        serviceType: serviceType,
        customerControl: customerControl,
        customerControlTable: divs,
        madeBy: reportFooter,
        observations: reportFooter2,
        incidents: filteredIncidents,
        producedBy: producedBy,
        checkedBy: checkedBy,
        authorizedBy: authorizedBy,
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
    data,
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
  return {
    reportIncidents,
    onSubmit,
    openModalIncident,
    setOpenModalIncident,
    data,
    setData,
    suppliers,
    totalHours,
    serviceType,
    setServiceType,
    customerControl,
    setCustomerControl,
    onlyNumbers,
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
    container1Ref,
    handleScroll1,
    reportFooter2,
    divs2,
    numColumnas,
    reportFooter3,
    handleUpdate,
    producedBy,
    checkedBy,
    dataSes,
    setAuthorizedBy,
    authorizedBy,
    container2Ref,
    handleScroll2,
    titulosColumnas,
    divs,
    activeTabReportInsp,
    reportFooter,
    setProducedBy,
    setCheckedBy,
    divsSamplingTableInsp,
    setDivsSamplingTableInsp,
  };
};

export default useReports;
