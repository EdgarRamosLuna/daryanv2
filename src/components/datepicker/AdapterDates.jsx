import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
export default function SpanishApp({ children }) {
    return (
        
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="esES"
        >
            {children}
        </LocalizationProvider>
    );
}
