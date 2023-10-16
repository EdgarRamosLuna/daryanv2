import { useState, useEffect, useContext } from "react";
import { createIncident, getReportIncidents } from "../api/daryan.api";
import { toast } from "sonner";
import { MainContext } from "../context/MainContext";

const useReports = () => {
  
  const {openModalIncident, setOpenModalIncident, reportIncidents, setReportIncidents} = useContext(MainContext)
  const loadTask = async() => {
    const res = await getReportIncidents();
    setReportIncidents(res.data);
  }
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
        await loadTask()
        toast.success(message, {
          duration: 4000,
        });
      }
      console.log(response);
    } catch (error) {
      toast.error("Error al guardar la incidencia");
    }
  };
  
  return {
    reportIncidents,
    onSubmit,
    openModalIncident, 
    setOpenModalIncident
  };
};

export default useReports;
