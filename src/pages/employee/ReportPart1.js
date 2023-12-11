import {
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
import dayjs from "dayjs";
import AutocompleteInput from "../../components/inputs/AutocompleteInput";
import { useTranslation } from "react-i18next";
import { StyledForm } from "../../styles/Styles";

const ReportPart1 = ({
  data,
  setData,
  suppliers,
  totalHours,
  handleInputChange,
  serviceType,
  setServiceType,
  customerControl,
  setCustomerControl,
  onlyNumbers
}) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="title">
        <h3>{t("reports.inspection_report_title")}</h3>
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
          <AutocompleteInput
            id="combo-box-demo"
            name="id_supplier"
            options={suppliers}
            value={
              suppliers.find((supplier) => supplier.id === data.id_supplier) ||
              null
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
        <div
          className="form-containers"
          style={{
            width: "24%",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label={`${t("table.date")}*`}
                required
                name="date"
                value={data.date ? dayjs(data.date) : null} // establece el valor aquí
                sx={{
                  width: "95%",
                }}
                onChange={(newValue) =>
                  setData({
                    ...data,
                    date: newValue ? dayjs(newValue).format("YYYY-MM-DD") : "",
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="form-container">
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
            value={Number.isNaN(data.report_number) ? 1 : data.report_number}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: e.target.value,
              })
            }
            inputProps={{
                readOnly:true
            }}
            
          />
        </div>
        <div className="form-container">
          <TextField
            id="outlined-basic"
            label={t("reports.part_name_label")}
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
            label={t("reports.worked_hours_label")}
            variant="outlined"
            type="text"
            name="worked_hours"
            placeholder=""
            required
            sx={{
              width: "95%",
            }}
            value={
              totalHours > 0 &&
              typeof totalHours === "number" &&
              onlyNumbers.test(data.rate)
                ? totalHours.toFixed(1)
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
            <InputLabel id="demo-simple-select-label">
              {t("reports.shift_label")} *
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="shift"
              type="text"
              required
              value={data.shift || ""} // Usa "value" en lugar de "defaultValue"
              label={t("reports.shift_label")}
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
            label={t("reports.part_number_label")}
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
                    [e.target.dataset.name || e.target.name]: e.target.value,
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
            {t("reports.customer_control_label")}{" "}
            <span className="required">*</span>
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
                    [e.target.dataset.name || e.target.name]: e.target.checked,
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
                    [e.target.dataset.name || e.target.name]: e.target.checked,
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
                    [e.target.dataset.name || e.target.name]: e.target.checked,
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
                    [e.target.dataset.name || e.target.name]: e.target.checked,
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
                    [e.target.dataset.name || e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </Grid>
      </StyledForm>
    </div>
  );
};

export default ReportPart1;
