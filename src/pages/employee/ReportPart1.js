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
  onlyNumbers,
  downTime,
  setDownTime
}) => {
  const { t } = useTranslation();
  return (
   <></>
  );
};

export default ReportPart1;
