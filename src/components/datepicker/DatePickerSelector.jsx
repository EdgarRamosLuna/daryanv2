import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es'; // Importa el locale español
import dayjs from 'dayjs';

dayjs.locale('es'); // Configura dayjs para usar el locale español

export default function DatePickerMUI2() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [highlightedDate, setHighlightedDate] = useState(dayjs('2023-07-22')); // Establece la fecha que deseas resaltar

  return (
    <LocalizationProvider
      adapterLocale="es"
      dateAdapter={AdapterDayjs}
    >
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        renderDay={(day, selectedDate, DayComponentProps) => {
          const isSelected = DayComponentProps.isWithinRange(day, selectedDate);
          const isHighlighted = dayjs(day).isSame(highlightedDate, 'day');
          return (
            <div
              style={{
                backgroundColor: isHighlighted ? 'red' : undefined,
              }}
            >
              <DayComponentProps.DayComponent {...DayComponentProps} />
            </div>
          );
        }}
      />
    </LocalizationProvider>
  );
}
