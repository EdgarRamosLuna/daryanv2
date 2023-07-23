import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es'; // Importa el locale español
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { useEffect } from 'react';
import { useState } from 'react';
dayjs.locale('es'); // Configura dayjs para usar el locale español

const shortcutsItems = [
  {
    label: 'Esta semana',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Semana anterior',
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, 'day');
      return [prevWeek.startOf('week'), prevWeek.endOf('week')];
    },
  },
  {
    label: 'Ultimos 7 Dias',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'Mes actual',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'Últimos 3 meses',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(3, 'month'), today];
    },
  },
  {
    label: 'Últimos 6 meses',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(6, 'month'), today];
    },
  },
  {
    label: 'Último año',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(1, 'year'), today];
    },
  },
  { label: 'Reiniciar', getValue: () => [null, null] },
];

const dataRangeText = "Selecciona un rango de fechas"
export default function DatePickerMUI2({ setDateStart, setDateEnd }) {
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  // const handleDateChange = (dateRange) => {
  //   setSelectedDateRange(dateRange);
  //   const formattedStartDate = dayjs(dateRange[0]).format('YYYY-MM-DD');
  //   const formattedEndDate = dayjs(dateRange[1]).format('YYYY-MM-DD');
  //   setDateStart(formattedStartDate); // Imprime el rango de fechas seleccionado en la consola
  //   setDateEnd(formattedEndDate); // Imprime el rango de fechas seleccionado en la consola


  // };

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  
    const startDate = dayjs(dateRange[0]).startOf('day').format('YYYY-MM-DD');
    const endDate = dayjs(dateRange[1]).startOf('day').format('YYYY-MM-DD');
  
    setDateStart(startDate);
    setDateEnd(endDate);
  };
  
  useEffect(() => {
    // Get all span elements
    var spans = document.getElementsByTagName('span');

    // Loop through all spans
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];

      // Check if the span is visible and contains the text "Select date range"
      if (span.innerHTML === "Select date range" && window.getComputedStyle(span).display !== 'none') {
        // Change the color to transparent
        //span.style.color = "transparent";
        span.innerHTML = dataRangeText;
      }
      if (span.innerHTML === "Start" && window.getComputedStyle(span).display !== 'none') {
        // Change the color to transparent
        //span.style.color = "transparent";
        span.innerHTML = "Inicio";
      }
      if (span.innerHTML === "End" && window.getComputedStyle(span).display !== 'none') {
        // Change the color to transparent
        //span.style.color = "transparent";
        span.innerHTML = "Fin";
      }
    }
    var divs = document.getElementsByTagName('div');

    // Loop through all divs
    for (var i = 0; i < divs.length; i++) {
      var div = divs[i];

      // Check if the div is visible and contains the text "Select date range"
      if (div.innerHTML === "MUI X Missing license key" && window.getComputedStyle(div).display !== 'none') {
        // Change the color to transparent
        div.style.color = "transparent";
        div.innerHTML = "";
        div.remove();
      }
    }
  }, []);  // La lista de dependencias vacía asegura que este efecto se ejecuta solo una vez después de que el componente se ha renderizado

  return (
    <LocalizationProvider
      adapterLocale="es"
      dateAdapter={AdapterDayjs}
      
    >
      <StaticDateRangePicker
        slotProps={{
          shortcuts: {
            items: shortcutsItems,
          },
          actionBar: { actions: [] },
        }}
        calendars={2}
        value={selectedDateRange}      
        onChange={handleDateChange}  
      />
    </LocalizationProvider>
  );
}