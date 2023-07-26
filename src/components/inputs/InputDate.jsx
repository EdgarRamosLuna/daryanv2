import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es'; // Importa el locale español
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { useEffect } from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers-pro';
dayjs.locale('es'); // Configura dayjs para usar el locale español
const InputDate = ({ setData, data }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}
            adapterLocale="es"
        >
            <DemoContainer components={["DatePicker"]}>
                <DatePicker
                    label="Fecha *"
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
    )
}

export default InputDate