import React, { useContext, useState } from "react";
import SecondTableCreate2 from "./SecondTableCreate2";
import { useEffect } from "react";

import Create3 from "./Create3";
import {
  Box,
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

import { MainContext } from "../../../../context/MainContext";
import { StyledForm, Table } from "../../../../styles/Styles";
import { useParams } from "react-router-dom";
import { LanguageContext } from "../../../../context/LanguageContext";
import InputDate from "../../../../components/inputs/InputDate";

const Create2 = () => {
  const {
    dataReportH,
    setDataReportH,
    numFilasReportByH,
    activeTabReportByH,
    setActiveTabReportByH,
    divsSamplingTable,
    dataTS2, data2, setData2, setDivsSamplingTable
  } = useContext(MainContext);
  const params = useParams();
  const idReport = params.id;

  //console.log(data2);
  const eData =
    data2.length === 0
      ? JSON.parse(dataTS2).filter(
          (data2) => Number(data2.id) === Number(idReport)
        )[0]
      : data2.filter((data2) => Number(data2.id) === Number(idReport))[0];
  const [dataC, setDataC] = useState(eData);  
  const [data, setData] = useState([]);
  const [totalesDefectos, setTotalesDefectos] = useState([]);
  const [totalesD, setTotalesD] = useState([]);
  useEffect(() => {
    if (totalesDefectos !== undefined && totalesDefectos) {
      setTotalesD(totalesDefectos.slice(2));
    }
  }, [totalesDefectos]);

  const [inspectors, setInspectors] = useState(dataC.reports_inspectors);
  const handleInputChangeInsp = (index, event) => {
    const newInspectors = [...inspectors];
    newInspectors[index] = event.target.value;
    setInspectors(newInspectors);
  };
  const [comments, setComments] = useState(dataC.reports_comments);
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
  const [inspectedBy, setInspectedBy] = useState(dataC.inspected_by);
  const [authorizedBy, setAuthorizedBy] = useState(dataC.authorized_by);
  const [divsR4, setDivsR4] = useState([
    { id: 1, values: Array(15).fill("") },
    { id: 2, values: Array(15).fill("") },
    { id: 3, values: Array(15).fill("") },
    { id: 4, values: Array(15).fill("") },
    { id: 5, values: Array(15).fill("") },
  ]);
  const [divs, setDivs] = useState([]);

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
          setTotalPiecesInsp={setTotalPiecesInsp}
          dataC={dataC}
          setDataC={setDataC}
          eData={eData}
          setDivsSamplingTable={setDivsSamplingTable}
        />
      ),
    },
    2: {
      component: <Create3 divs={divs} setDivs={setDivs} divsR4={divsSamplingTable} setDivsR4={setDivsSamplingTable}  reportType="byh" />,
    },
  };
    
  useEffect(() => {

    const reports_sample_table = eData.report_sata;
    const newList = reports_sample_table.map(item => ({
      id: parseInt(item.id_item),
      values: [
          item?.id,
          item?.lot,
          item?.serial,
          item?.total_pieces_insp,
          item?.total_pieces_sampling,
          item?.hour,
          item?.signature,
          
      ]
  }));
  setDivsSamplingTable(newList);  
  }, [])
  return <>{tabsObj[activeTabReportByH]?.component}</>;
};

export default Create2;

export const Create2FirstTable = ({
  dataReportH,
  setDataReportH,
  numFilasReportByH,
  activeTabReportByH,
  setActiveTabReportByH,
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
  divsR4, 
  setDivsR4,
  setTotalPiecesInsp,
  dataC,
  setDataC,
  eData,
  setDivsSamplingTable
}) => {  
  const {t} = useContext(LanguageContext);
  
 
  const dataSes = localStorage.getItem("sesType");
  useEffect(() => {
    const newArray = [
      {
        report_id: dataC.id,
        reportP1: dataC,
        reportP2: divs,
        inspectors,
        comments,
        inspectedBy,
        authorizedBy,
        totalDefects: totalesD,
        totalPieces: totalPiecesInsp,
        sampling_table:divsSamplingTable
      },
    ];
    setDataReportH(newArray);
  }, [
    dataC,
    inspectors,
    comments,
    inspectedBy,
    authorizedBy,
    totalesD,
    divs,
    totalPiecesInsp,
    divsSamplingTable
  ]);
  const handleDate = (name, date) => {
    setDataC({
      ...dataC,
      [name]: date,
    });
  };

  useEffect(() => {
    dataC.reports_cc.forEach((element) => {
      const newData = {
        id: element.item,
        values: [
          element?.item,
          element?.defect,
          element?.h1,
          element?.h2,
          element?.h3,
          element?.h4,
          element?.h5,
          element?.h6,
          element?.h7,
          element?.h8,
          element?.h9,
          element?.h10,
          element?.h11,
          element?.h12,
          element?.total,
        ],
      };
      setDivs([newData]);
    });
  }, []);
  useEffect(() => {
    dataC.report_total.forEach((element, index) => {
      setTotalPiecesInsp((prev) => {
        // Si el array ya tiene 12 elementos
        if (prev.length >= 12) {
          // Crear un nuevo array con los valores actualizados
          const updatedArray = prev.map((item, itemIndex) => {
            // Actualizar el valor, excluyendo el último elemento
            if (itemIndex < prev.length - 1) {
              return dataC.report_total[itemIndex]?.total || item;
            }
            // Mantener el último elemento (la suma total)
            else {
              return item;
            }
          });

          // Reemplazar la última posición con la suma total
          const totalSum = updatedArray
            .slice(0, -1)
            .reduce((a, b) => Number(a) + Number(b), 0);
          updatedArray[updatedArray.length - 1] = totalSum;

          return updatedArray;
        }
        // Si el array tiene menos de 12 elementos
        else {
          // Agregar el elemento al array
          const newArray = [...prev, element.total];

          // Si es el último elemento, agregar la suma total
          if (index === dataC.report_total.length - 1) {
            const totalSum = newArray.reduce(
              (a, b) => Number(a) + Number(b),
              0
            );
            return [...newArray, totalSum];
          } else {
            return newArray;
          }
        }
      });
    });

  }, [dataC]);
  

  return (
    <>
      <div className="container">
        <div className="title">
          <h3>REPORTE POR HORAS</h3>
          <br />
        </div>
        <StyledForm>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Planta"
              sx={{
                width: "95%",
              }}
              type="text"
              name="plant"
              placeholder=""
              required
              value={dataC.plant}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Numero de parte"
              sx={{
                width: "95%",
              }}
              type="text"
              name="part_number"
              placeholder=""
              required
              value={dataC.part_number}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
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
                  data={dataC}
                  setData={setDataC}
                />
              </Box>

          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="No. de Reporte"
              sx={{
                width: "95%",
              }}
              type="text"
              name="report_number"
              placeholder=""
              required
              value={dataC.report_number}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Mesa"
              sx={{
                width: "95%",
              }}
              type="text"
              name="table"
              placeholder=""
              required
              value={dataC.table_info}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-container">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Nombre de parte"
              sx={{
                width: "95%",
              }}
              type="text"
              name="part_name"
              placeholder=""
              required
              value={dataC.part_name}
              onChange={(e) =>
                setDataC({
                  ...dataC,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <Box className="form-container">
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t('reports.shift_label')}*</InputLabel>
              <Select
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
                  setDataC({
                    ...dataC,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
                <th>Defecto</th>
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
                  <div style={{ width: "300px" }}>Total de defectos</div>
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
                    Total de piezas inspeccionadas
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
                  <div>INSPECTOR</div>
                  {inspectors.map((insp, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        value={insp.inspector}
                        onChange={(event) =>
                          handleInputChangeInsp(index, event)
                        }
                      />
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td colSpan={13} style={{ textAlign: "center" }}>
                  <div>COMENTARIOS</div>
                  {comments.map((com, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        value={com.comment}
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
                    REVISO <span className="required">*</span>
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
                  <div>AUTORIZO</div>
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
