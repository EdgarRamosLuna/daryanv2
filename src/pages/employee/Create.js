import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MainContext } from "../../context/MainContext";
import { StyledForm, Table } from "../../styles/Styles";
import DatePickerInput from "../../components/DateInput";
import SecondTableCreate from "./SecondTableCreate";
import ScrollBar from "../../components/ScrollBar";
import Create3 from "./Create3";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectCustom from "./Select";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Create = () => {
  const { t } = useTranslation();
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
  } = useContext(MainContext);
  const [producedBy, setProducedBy] = useState("");
  const [checkedBy, setCheckedBy] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const dataSes = localStorage.getItem("sesType");
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const totalInsp = Number(total1);
      const rate = data.rate;
      const totalHours = Number(totalInsp) / Number(rate);
      setTotalHours(totalHours);
    }
  }, [total1, data]);

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
    const newArray = [
      {
        data: data,
        serviceType: serviceType,
        customerControl: customerControl,
        customerControlTable: divs,
        madeBy: reportFooter,
        observations: reportFooter2,
        incidents: reportFooter3,
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
        sampling_table:divsSamplingTableInsp
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
    divsSamplingTableInsp
  ]);

  const [dumpValue, setDumpValue] = useState("");


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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentInputValue = data[name];
    setData((prevData) => {
      return {
        ...prevData,
        rate: value,
      };
    });
  };
  const tabContent = {
    1: {
      component: (
        <>
          <div className="container">
            <div className="title">
              <h3>{t('reports.inspection_report_title')}</h3>
              <br />
            </div>

            <StyledForm>
              <div className="form-container">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label={t('table.plant')}
                  sx={{
                    width: "95%",
                  }}
                  required
                  type="text"
                  name="plant"
                  placeholder=""
                  value={data.plant}
                  
                  onChange={(e) =>
                    setData({
                      ...data,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-container">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="id_supplier"
                  options={suppliers}
                  getOptionLabel={(option) => option.fullname}
                  sx={{ width: "95%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={t('table.supplier')}
                      name="id_supplier"
                    />
                  )}
                  onChange={(e, newValue) =>
                    setData({
                      ...data,
                      id_supplier: newValue.id,
                    })
                  }
                />

             
              </div>
              <div
                className="form-containers"
                style={{
                  width: "24%",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label={`${t('table.date')}*`}
                      required
                      name="date"
                      sx={{
                        width: "95%",
                      }}
                      onChange={(newValue) =>
                        setData({
                          ...data,
                          date: newValue
                            ? dayjs(newValue).format("YYYY-MM-DD")
                            : "",
                        })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="form-container">
                <TextField
                  id="outlined-basic"
                  label={t('reports.report_number_label')}
                  variant="outlined"
                  type="text"
                  name="report_number"
                  placeholder=""
                  required
                  
                  sx={{
                    width: "95%",
                  }}
                  value={data.report_number}
                  onChange={(e) =>
                    setData({
                      ...data,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-container">
                <TextField
                  id="outlined-basic"
                  label={t('reports.part_name_label')}
                  variant="outlined"
                  type="text"
                  sx={{
                    width: "95%",
                  }}
                  name="part_name"
                  placeholder=""
                  required
                  
                  value={data.part_name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-container">
                <TextField
                  key={totalHours}
                  id="outlined-basic"
                  label={t('reports.worked_hours_label')}
                  variant="outlined"
                  type="text"
                  name="worked_hours"
                  placeholder=""
                  required
                  
                  sx={{
                    width: "95%",
                  }}
                  value={
                    totalHours > 0 && typeof totalHours === "number"
                      ? totalHours
                      : data.worked_hours
                  }
                  onChange={(e) =>
                    setData({
                      ...data,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-container">
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
                  
                  value={data.rate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-container">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Turno *</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="shift"
                    type="text"
                    required
                    defaultValue={`${data.length > 0 ? data.shift : ""}`}
                    label={t('reports.shift_label')}
                    sx={{
                      width: "95%",
                    }}
                    onChange={(e) =>
                      setData({
                        ...data,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
               
              </div>
              <Grid
                sx={{
                  width: "24%",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label={t('reports.part_number_label')}
                  variant="outlined"
                  sx={{
                    width: "95%",
                  }}
                  type="text"
                  name="part_number"
                  placeholder=""
                  required
                  value={data.part_number}
                  onChange={(e) =>
                    setData({
                      ...data,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid
                sx={{
                  width: "24%",
                }}
              >
                <label htmlFor="data8">
                  {t('reports.service_type_label')} <span className="required">*</span>
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
                    {t('reports.selection_label')}
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
                    {t('reports.rework_label')}
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
                          [e.target.dataset.name || e.target.name]:
                            e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </Grid>

              <Grid
                sx={{
                  width: "24%",
                }}
              >
                <label htmlFor="data8">
                  {t('reports.customer_control_label')} <span className="required">*</span>
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
                          [e.target.dataset.name || e.target.name]:
                            e.target.checked,
                        })
                      }
                    />
                    {t('reports.production_date_label')}
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
                    {t('reports.approval_date_label')}
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
                    {t('reports.series_label')}
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
                    {t('reports.batch_label')}
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
                          [e.target.dataset.name || e.target.name]:
                            e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </Grid>
            </StyledForm>
          </div>
          <div
            className="container c2 scrollX"
            ref={container1Ref}
            onScroll={handleScroll1}
          >
            <SecondTableCreate                      
       
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
                        <th key={i + "thead"}>
                          <i
                            className="fa-solid fa-circle-plus"
                            style={{ color: "transparent" }}
                          ></i>
                        </th>
                      ) : (
                        <th key={i + "thead"}>{titulo}</th>
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
                            <td key={i + "tbody"} className="table-center">
                              {i <= 1 || i === fila.values.length - 1 ? (
                                <>
                                  <i
                                    className="fa-solid fa-circle-plus"
                                    style={{ visibility: "hidden" }}
                                  ></i>
                                </>
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    name=""
                                    defaultValue={dumpValue}
                                  />
                                </>
                              )}
                            </td>
                          ))}
                        </tr>
                      )
                  )}
                </tbody>
                <tfoot className="tfooter">
                  {divs2.map(
                    (fila, i) =>
                      i === 0 && (
                        <tr key={fila.id + "tfoot"}>
                          {fila.values.map(
                            (valor, i) =>
                              i > 0 && (
                                <td
                                  colSpan={i === 1 ? "5" : ""}
                                  key={i + "tfoot1"}
                                  className={i === 1 ? "table-center" : ""}
                                >
                                  {i === 0 ||
                                  i === 1 ||
                                  i === fila.values.length - 1 ? (
                                    <>
                                      {i === 1 && <>Totales</>}
                                      {i === 0 && <></>}
                                    </>
                                  ) : (
                                    <>
                                      {i === 2 && (
                                        <input
                                          value={total1}
                                          onChange={(e) =>
                                            setTotal1(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 3 && (
                                        <input
                                          value={total2}
                                          onChange={(e) =>
                                            setTotal2(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 4 && (
                                        <input
                                          value={total3}
                                          onChange={(e) =>
                                            setTotal3(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 5 && (
                                        <input
                                          value={total4}
                                          onChange={(e) =>
                                            setTotal4(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 6 && (
                                        <input
                                          value={total5}
                                          onChange={(e) =>
                                            setTotal5(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 7 && (
                                        <input
                                          value={total6}
                                          onChange={(e) =>
                                            setTotal6(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 8 && (
                                        <input
                                          value={total7}
                                          onChange={(e) =>
                                            setTotal7(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 9 && (
                                        <input
                                          value={total8}
                                          onChange={(e) =>
                                            setTotal8(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 10 && (
                                        <input
                                          value={total9}
                                          onChange={(e) =>
                                            setTotal9(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 11 && (
                                        <input
                                          value={total10}
                                          onChange={(e) =>
                                            setTotal10(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 12 && (
                                        <input
                                          value={total11}
                                          onChange={(e) =>
                                            setTotal11(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 13 && (
                                        <input
                                          value={total12}
                                          onChange={(e) =>
                                            setTotal12(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 14 && (
                                        <input
                                          value={total13}
                                          onChange={(e) =>
                                            setTotal13(e.target.value)
                                          }
                                        />
                                      )}
                                      {i === 15 && (
                                        <input
                                          value={total14}
                                          onChange={(e) =>
                                            setTotal14(e.target.value)
                                          }
                                        />
                                      )}
                                    </>
                                  )}
                                </td>
                              )
                          )}
                        </tr>
                      )
                  )}
                  <tr>
                    <td
                      colSpan={numColumnas / 3}
                      style={{ textAlign: "center" }}
                    >
                      <div>{t('reports.performed_by_label')}</div>
                      {reportFooter.map(
                        (fila, i) =>
                          i < reportFooter.length - 1 && (
                            <div key={i + "realizos"}>
                              {fila.values.map((valor, i) => (
                                <div key={i + "realizo"}>
                                  <input
                                    value={valor}
                                    type="text"
                                    onChange={(e) =>
                                      handleUpdate(
                                        1,
                                        fila.id,
                                        i,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <br />
                                </div>
                              ))}
                            </div>
                          )
                      )}
                    </td>
                    <td
                      colSpan={numColumnas / 3}
                      style={{ textAlign: "center" }}
                    >
                      <div>{t('reports.observations_label')}</div>
                      {reportFooter2.map(
                        (fila, j) =>
                          j < reportFooter2.length - 1 && (
                            <div key={j + "observaciones"}>
                              {fila.values.map((valor, i) => (
                                <div key={i + "observacion"}>
                                  <input
                                    value={valor}
                                    type="text"
                                    onChange={(e) =>
                                      handleUpdate(
                                        2,
                                        fila.id,
                                        i,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <br />
                                </div>
                              ))}
                            </div>
                          )
                      )}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      <div> </div>
                      {divs2.map(
                        (fila, i) =>
                          i === 0 && (
                            <div key={i + "clauses"}>
                              {fila.values.map(
                                (valor, i) =>
                                  i > 6 && (
                                    <div key={i + "clause"}>
                                      {i === 8 && (
                                        <>
                                          <input
                                            placeholder="A"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 9 && (
                                        <>
                                          <input
                                            placeholder="B"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 10 && (
                                        <>
                                          <input
                                            placeholder="C"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 11 && (
                                        <>
                                          <input
                                            placeholder="D"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 12 && (
                                        <>
                                          <input
                                            placeholder="E"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 13 && (
                                        <>
                                          <input
                                            placeholder="F"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 14 && (
                                        <>
                                          <input
                                            placeholder="G"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 15 && (
                                        <>
                                          <input
                                            placeholder="H"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 16 && (
                                        <>
                                          <input
                                            placeholder="I"
                                            readOnly
                                            type="text"
                                            style={{ textAlign: "center" }}
                                            defaultValue={dumpValue}
                                          />
                                          <br />
                                        </>
                                      )}
                                    </div>
                                  )
                              )}
                            </div>
                          )
                      )}
                    </td>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                      <div> </div>
                      {divs2.map(
                        (fila, i) =>
                          i === 0 && (
                            <div key={i + "clauses"}>
                              {fila.values.map(
                                (valor, i) =>
                                  i > 6 && (
                                    <div key={i + "clause"}>
                                      {i === 8 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="A"
                                          />
                                  
                                          <br />
                                        </>
                                      )}
                                      {i === 9 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="B"
                                          />
                                       
                                          <br />
                                        </>
                                      )}
                                      {i === 10 && (
                                        <>
                                       
                                          <SelectCustom
                                            data={optionClause}
                                            clause="C"
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 11 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="D"
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 12 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="E"
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 13 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="F"
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 14 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="G"
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 15 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="H"
                                          />
                                          <br />
                                        </>
                                      )}
                                      {i === 16 && (
                                        <>
                                          <SelectCustom
                                            data={optionClause}
                                            clause="I"
                                          />
                                          <br />
                                        </>
                                      )}
                                    </div>
                                  )
                              )}
                            </div>
                          )
                      )}
                    </td>
                    <td
                      colSpan={numColumnas > 15 ? numColumnas / 4 : 3}
                      style={{ textAlign: "center" }}
                    >
                      <div>
                        {t('reports.incidents_label')} <span className="required">*</span>
                      </div>
                      {reportFooter3.map(
                        (fila, i) =>
                          i < reportFooter3.length - 1 && (
                            <div key={i + "incidentes"}>
                              {fila.values.map((valor, i) => (
                                <div key={i + "incidente"}>
                                  <input
                                    value={valor}
                                    type="text"
                                    onChange={(e) =>
                                      handleUpdate(
                                        3,
                                        fila.id,
                                        i,
                                        e.target.value
                                      )
                                    }
                                  />
                                  <br />
                                </div>
                              ))}
                            </div>
                          )
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={numColumnas / 3}
                      style={{ textAlign: "center" }}
                    >
                      <div>
                      {t('reports.prepared_by_label')} <span className="required">*</span>
                      </div>
                      <div className="firm">
                        <input
                          type="text"
                          name=""
                          value={producedBy}
                          onChange={(e) => setProducedBy(e.target.value)}
                          className="firm-input"
                        />
                      </div>
                    </td>

                    <td
                      colSpan={numColumnas / 3}
                      style={{ textAlign: "center" }}
                    >
                      <div>
                        {t('reports.reviewed_by_label')} <span className="required">*</span>
                      </div>
                      <div className="firm">
                        <input
                          type="text"
                          name=""
                          value={checkedBy}
                          onChange={(e) => setCheckedBy(e.target.value)}
                          className="firm-input"
                        />
                      </div>
                    </td>

                    <td
                      colSpan={numColumnas / 3}
                      style={{ textAlign: "center" }}
                    >
                      <div>{t('reports.authorized_by_label')}</div>
                      <div className="firm">
                        <input
                          type="text"
                          name=""
                          readOnly={
                            ["admin"].includes(dataSes.toLowerCase())
                              ? false
                              : true
                          }
                          disabled={
                            ["admin"].includes(dataSes.toLowerCase())
                              ? false
                              : true
                          }
                          onChange={
                            ["admin"].includes(dataSes.toLowerCase())
                              ? (e) => setAuthorizedBy(e.target.value)
                              : () => {
                                  return;
                                }
                          }
                          value={authorizedBy}           
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

export default Create;
