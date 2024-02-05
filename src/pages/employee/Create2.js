import React, { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { StyledForm, Table } from "../../styles/Styles";

import SecondTableCreate2 from "./SecondTableCreate2";
import { useEffect } from "react";
import Create3 from "./Create3";
import {
  FormControl,
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
import AutocompleteInput from "../../components/inputs/AutocompleteInput";
import useReports from "../../hooks/useReports";
import { useTranslation } from "react-i18next";
const Create2 = () => {
  const {
    dataReportH,
    setDataReportH,
    numFilasReportByH,
    activeTabReportByH,
    setActiveTabReportByH,
    divsSamplingTable,
  } = useContext(MainContext);

  const [data, setData] = useState([]);

  const [totalesDefectos, setTotalesDefectos] = useState([]);
  const [totalesD, setTotalesD] = useState([]);
  useEffect(() => {
    if (totalesDefectos !== undefined && totalesDefectos) {
      setTotalesD(totalesDefectos.slice(2));
    }
  }, [totalesDefectos]);

  const [inspectors, setInspectors] = useState(Array(5).fill(""));
  const handleInputChangeInsp = (index, event) => {
    const newInspectors = [...inspectors];
    newInspectors[index] = event.target.value;
    setInspectors(newInspectors);
  };
  const [comments, setComments] = useState(Array(5).fill(""));
  const handleInputChangeComm = (index, event) => {
    const newComments = [...comments];
    newComments[index] = event.target.value;
    setComments(newComments);
  };
  const [totalPiecesInsp, setTotalPiecesInsp] = useState(Array(13).fill(""));
  const handleInputChangeTotalPieInsp = (index, event) => {
    const newTotalPiecesInsp = [...totalPiecesInsp];
    newTotalPiecesInsp[index] = Number(event.target.value); // Convertir a número

    // Sumar todos los valores menos el último
    const sum = newTotalPiecesInsp.slice(0, -1).reduce((a, b) => a + b, 0);

    // Poner la suma en el último índice
    newTotalPiecesInsp[newTotalPiecesInsp.length - 1] = sum;

    setTotalPiecesInsp(newTotalPiecesInsp);
  };
  const [inspectedBy, setInspectedBy] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [divsR4, setDivsR4] = useState([
    { id: 1, values: Array(15).fill("") },
    { id: 2, values: Array(15).fill("") },
    { id: 3, values: Array(15).fill("") },
    { id: 4, values: Array(15).fill("") },
    { id: 5, values: Array(15).fill("") },
  ]);
  const [divs, setDivs] = useState(() => {
    const filas = [];
    for (let i = 1; i <= numFilasReportByH; i++) {
      filas.push({
        id: i,
        values: Array.from({ length: 15 }, () => ""),
      });
    }
    return filas;
  });

  const tabsObj = {
    1: {
      component: (
        <Create2FirstTable
          dataReportH={dataReportH}
          setDataReportH={setDataReportH}
          numFilasReportByH={numFilasReportByH}
          activeTabReportByH={activeTabReportByH}
          setActiveTabReportByH={setActiveTabReportByH}
          divs={divs}
          setDivs={setDivs}
          divsSamplingTable={divsSamplingTable}
          handleInputChangeInsp={handleInputChangeInsp}
          handleInputChangeComm={handleInputChangeComm}
          handleInputChangeTotalPieInsp={handleInputChangeTotalPieInsp}
          inspectedBy={inspectedBy}
          setInspectedBy={setInspectedBy}
          authorizedBy={authorizedBy}
          setAuthorizedBy={setAuthorizedBy}
          data={data}
          setData={setData}
          inspectors={inspectors}
          comments={comments}
          totalesD={totalesD}
          totalPiecesInsp={totalPiecesInsp}
          setTotalesDefectos={setTotalesDefectos}
          divsR4={divsR4}
          setDivsR4={setDivsR4}
        />
      ),
    },
    2: {
      component: (
        <Create3
          divs={divs}
          setDivs={setDivs}
          divsR4={divsR4}
          setDivsR4={setDivsR4}
          reportType="byh"
        />
      ),
    },
  };
  return <>{tabsObj[activeTabReportByH]?.component}</>;
};

export default Create2;

export const Create2FirstTable = ({
  setDataReportH,
  divs,
  setDivs,
  divsSamplingTable,
  handleInputChangeInsp,
  handleInputChangeComm,
  handleInputChangeTotalPieInsp,
  inspectedBy,
  setInspectedBy,
  authorizedBy,
  setAuthorizedBy,
  data,
  setData,
  inspectors,
  comments,
  totalesD,
  totalPiecesInsp,
  setTotalesDefectos,
}) => {
  const dataSes = localStorage.getItem("sesType");
  const { suppliers } = useReports();
  const { t } = useTranslation();
  useEffect(() => {
    const newArray = [
      {
        reportP1: data,
        reportP2: divs,
        inspectors,
        comments,
        inspectedBy,
        authorizedBy,
        totalDefects: totalesD,
        totalPieces: totalPiecesInsp,
        sampling_table: divsSamplingTable,
      },
    ];
    setDataReportH(newArray);
  }, [
    data,
    inspectors,
    comments,
    inspectedBy,
    authorizedBy,
    totalesD,
    divs,
    totalPiecesInsp,
    divsSamplingTable,
  ]);

  const handleDate = (name, date) => {
    setData({
      ...data,
      [name]: date,
    });
  };
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>{t("REPORTE POR HORAS")}</h3>
          <br />
        </div>
        <StyledForm>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label={t("table.plant")}
              sx={{
                width: "95%",
              }}
              type="text"
              name="plant"
              placeholder=""
              required
              value={data.plant}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <AutocompleteInput
              id="combo-box-demo"
              name="id_supplier"
              options={suppliers}
              value={
                suppliers.find(
                  (supplier) => supplier.id === data.id_supplier
                ) || null
              }
              label={t("table.supplier")}
              getOptionLabel={(option) => option.fullname}
              onChange={(e, newValue) =>
                setData({
                  ...data,
                  id_supplier: newValue ? newValue.id : null,
                })
              }
            />
          </div>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label={t("reports.part_number_label")}
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
                  [e.target.dataset.name || e.target.name]: e.target.value,
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
                  label={`${t("table.date")} *`}
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
              variant="outlined"
              label={t("reports.report_number_label")}
              sx={{
                width: "95%",
              }}
              type="text"
              name="report_number"
              placeholder=""
              required
              value={data.report_number}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label={t("Hours")}
              sx={{
                width: "95%",
              }}
              type="text"
              name="table"
              placeholder=""
              required
              value={data.table}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label={t("reports.part_name_label")}
              sx={{
                width: "95%",
              }}
              type="text"
              name="part_name"
              placeholder=""
              required
              value={data.part_name}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("reports.shift_label")} *
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="shift"
                type="text"
                required
                defaultValue={`${data.length > 0 ? data.shift : ""}`}
                label="Turno"
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
        </StyledForm>
      </div>
      <div className="container c2">
        <SecondTableCreate2
          setTotalesDefectos={setTotalesDefectos}
          divs={divs}
          setDivs={setDivs}
        />
      </div>

      <div
        className="container c4"
        style={{ overflowY: "scroll", paddingRight: 0 }}
      >
        <Table>
          <table>
            <thead className="no-sticky">
              <tr>
                <th>
                  <span className="btn-table-cont">
                    <i className="fa-solid fa-trash"></i>
                    <i className="fa-solid fa-circle-plus"></i>
                  </span>
                </th>
                <th>Item</th>
                <th> {t("Defecto")}</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8 </th>
                <th>9 </th>
                <th>10 </th>
                <th>11 </th>
                <th>12 </th>
                <th>Total </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hidden">
                <td></td>
                <td> </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>

                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
              </tr>
            </tbody>
            <tfoot className="tfooter">
              <tr>
                <td> </td>
                <td> </td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ width: "300px" }}>{t('Total de defectos')}</div>
                </td>
                {totalesD.map((sum, i) => (
                  <td key={i}>
                    {i === totalesD.length - 1 ? (
                      <input
                        type="text"
                        value={sum}
                        readOnly
                        onChange={() => {
                          return;
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={sum}
                        onChange={() => {
                          return;
                        }}
                      />
                    )}
                  </td>
                ))}
                <td></td>
              </tr>
              <tr>
                <td> </td>
                <td> </td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ width: "300px" }}>
                    {t('Total de piezas inspeccionadas')}
                  </div>
                </td>
                {totalPiecesInsp.map((total, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      value={total}
                      onChange={(event) =>
                        handleInputChangeTotalPieInsp(index, event)
                      }
                    />
                    <br />
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <div>{t('INSPECTOR')}</div>
                  {inspectors.map((inspector, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        value={inspector}
                        onChange={(event) =>
                          handleInputChangeInsp(index, event)
                        }
                      />
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td colSpan={13} style={{ textAlign: "center" }}>
                  <div>{t('COMENTARIOS')}</div>
                  {comments.map((comment, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        value={comment}
                        onChange={(event) =>
                          handleInputChangeComm(index, event)
                        }
                      />
                      <br />
                    </React.Fragment>
                  ))}
                </td>
              </tr>
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  <div>
                    {t('REVISADO POR')} <span className="required">*</span>
                  </div>
                  <div className="firm">
                    <input
                      type=""
                      name=""
                      className="firm-input"
                      onChange={(e) => setInspectedBy(e.target.value)}
                      value={inspectedBy}
                    />
                  </div>
                </td>

                <td colSpan={8} style={{ textAlign: "center" }}>
                  <div>{t('AUTORIZADO POR')}</div>
                  <div className="firm">
                    <input
                      type=""
                      name=""
                      className="firm-input"
                      readOnly={
                        ["admin"].includes(dataSes.toLowerCase()) ? false : true
                      }
                      disabled={
                        ["admin"].includes(dataSes.toLowerCase()) ? false : true
                      }
                      onChange={
                        ["admin"].includes(dataSes.toLowerCase())
                          ? (e) => setAuthorizedBy(e.target.value)
                          : () => {
                              return;
                            }
                      }
                      value={authorizedBy}
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
