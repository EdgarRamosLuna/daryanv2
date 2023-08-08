import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import { DatePicker } from '@mui/x-date-pickers-pro';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

dayjs.locale('es');

const InputDate = ({ setData, data, defaultValue }) => {
    const [selectedDate, setSelectedDate] = React.useState(defaultValue);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        setData({
            ...data,
            date: newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label="Fecha *"
                    required
                    name="date"
                    sx={{
                        width: '95%',
                    }}
                    value={dayjs(defaultValue)}
                    onChange={handleDateChange}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default InputDate;