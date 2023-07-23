
/**
 * Componente para selecionar rangos de fechas
 * @param {function} setStartDate Establece la fecha de inicio
 * @param {function} setEndDate Establece la fecha de fin
 * @author ERL 12:35pm
 * @returns 
 */
import React, { useState } from 'react';
import {
    endOfDay,        
    addMonths,
    startOfWeek,
    differenceInCalendarDays,
    format, startOfDay, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths, isSameDay, isWithinInterval, addDays
  } from 'date-fns';
  
  
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-datepicker/dist/react-datepicker.css";
import { DateRange, DateRangePicker, DefinedRange } from 'react-date-range';
import { es } from 'date-fns/locale';

const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  };
// const staticRanges = [
//     {
//       label: 'Hoy',
//       range: () => ({
//         startDate: new Date(),
//         endDate: new Date(),
//         key: 'selection',
//       }),
//     },
//     {
//       label: 'Ayer',
//       range: () => ({
//         startDate: addDays(new Date(), -1),
//         endDate: addDays(new Date(), -1),
//         key: 'selection',
//       }),
//     },
//     // Agrega aquí más rangos predefinidos...
// //   ];
const staticRanges = [
    {
        label: 'Hoy',
        range: () => ({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }),
        isSelected: (range) => isSameDay(new Date(), range.startDate) && isSameDay(new Date(), range.endDate),
    },
    {
        label: 'Ayer',
        range: () => ({
            startDate: addDays(new Date(), -1),
            endDate: addDays(new Date(), -1),
            key: 'selection',
        }),
        isSelected: (range) => isSameDay(addDays(new Date(), -1), range.startDate) && isSameDay(addDays(new Date(), -1), range.endDate),
    },
    {
        label: 'Esta semana',
        range: () => ({
            startDate: startOfWeek(new Date()),
            endDate: endOfWeek(new Date()),
            key: 'selection',
        }),
        isSelected: (range) => isWithinInterval(new Date(), { start: startOfWeek(new Date()), end: endOfWeek(new Date()) }),
    },
    {
        label: 'Semana pasada',
        range: () => ({
            startDate: startOfWeek(subWeeks(new Date(), 1)),
            endDate: endOfWeek(subWeeks(new Date(), 1)),
            key: 'selection',
        }),
        isSelected: (range) => isWithinInterval(new Date(), { start: startOfWeek(subWeeks(new Date(), 1)), end: endOfWeek(subWeeks(new Date(), 1)) }),
    },
    {
        label: 'Este mes',
        range: () => ({
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
            key: 'selection',
        }),
        isSelected: (range) => isWithinInterval(new Date(), { start: startOfMonth(new Date()), end: endOfMonth(new Date()) }),
    },
    {
        label: 'El mes pasado',
        range: () => ({
            startDate: startOfMonth(subMonths(new Date(), 1)),
            endDate: endOfMonth(subMonths(new Date(), 1)),
            key: 'selection',
        }),
        isSelected: (range) => isWithinInterval(new Date(), { start: startOfMonth(subMonths(new Date(), 1)), end: endOfMonth(subMonths(new Date(), 1)) }),
    },
    // Agrega aquí más rangos predefinidos...
];
// const staticRanges = [
//     {
//         label: 'Hoy',
//         range: () => ({
//             startDate: new Date(),
//             endDate: new Date(),
//             key: 'selection',
//         }),
//         isSelected: (range) => {
//             const today = startOfDay(new Date());
//             return (
//                 startOfDay(range.startDate).getTime() === today.getTime() &&
//                 startOfDay(range.endDate).getTime() === today.getTime()
//             );
//         },
//     },
//     {
//         label: 'Ayer',
//         range: () => ({
//             startDate: addDays(new Date(), -1),
//             endDate: addDays(new Date(), -1),
//             key: 'selection',
//         }),
//         isSelected: (range) => {
//             const yesterday = startOfDay(addDays(new Date(), -1));
//             return (
//                 startOfDay(range.startDate).getTime() === yesterday.getTime() &&
//                 startOfDay(range.endDate).getTime() === yesterday.getTime()
//             );
//         },
//     },
//     // Agrega aquí más rangos predefinidos...
// ];
// const staticRanges = [
//   {
//     label: 'Hoy',
//     range: () => ({
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection',
//     }),
//   },
//   {
//     label: 'Ayer',
//     range: () => ({
//       startDate: addDays(new Date(), -1),
//       endDate: addDays(new Date(), -1),
//       key: 'selection',
//     }),
//   },
//   {
//     label: 'Esta semana',
//     range: () => ({
//       startDate: startOfWeek(new Date()),
//       endDate: endOfWeek(new Date()),
//       key: 'selection',
//     }),
//   },
//   {
//     label: 'Semana pasada',
//     range: () => ({
//       startDate: startOfWeek(subWeeks(new Date(), 1)),
//       endDate: endOfWeek(subWeeks(new Date(), 1)),
//       key: 'selection',
//     }),
//   },
//   {
//     label: 'Este mes',
//     range: () => ({
//       startDate: startOfMonth(new Date()),
//       endDate: endOfMonth(new Date()),
//       key: 'selection',
//     }),
//   },
//   {
//     label: 'El mes pasado',
//     range: () => ({
//       startDate: startOfMonth(subMonths(new Date(), 1)),
//       endDate: endOfMonth(subMonths(new Date(), 1)),
//       key: 'selection',
//     }),
//   },
//   // Agrega aquí más rangos predefinidos...
// ];
const LANG = "es";

const inputRanges = [
    {
      label: LANG === "es" ? 'días hasta hoy':'days up to todays',
      range(value) {
        return {
          startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
          endDate: defineds.endOfToday,
        };
      },
      getCurrentValue(range) {
        if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
        if (!range.startDate) return '∞';
        return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
      },
    },
    {      
      label: LANG === "es" ? 'días a partir de hoy':'days starting today',
      range(value) {
        const today = new Date();
        return {
          startDate: today,
          endDate: addDays(today, Math.max(Number(value), 1) - 1),
        };
      },
      getCurrentValue(range) {
        if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
        if (!range.endDate) return '∞';
        return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
      },
    },
  ];
// const inputRanges = [
//     {
//         label: 'días desde hoy',
//         range(value) {
//             return {
//                 startDate: addDays(new Date(), - parseInt(value)),
//                 endDate: new Date(),
//                 key: 'selection',
//             };
//         },
//         getCurrentValue(range) {
//             return Math.floor((range.endDate - range.startDate) / (1000 * 60 * 60 * 24));
//         },
//     },
//     {
//         label: 'días a partir de hoy',
//         range(value) {
//             return {
//                 startDate: new Date(),
//                 endDate: addDays(new Date(), parseInt(value)),
//                 key: 'selection',
//             };
//         },
//         getCurrentValue(range) {
//             return Math.floor((range.endDate - range.startDate) / (1000 * 60 * 60 * 24));
//         },
//     },
//     // Agrega aquí más rangos de entrada...
// ];
const DatePickerRange = ({ setDateStart, setDateEnd }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        console.log(ranges);

        // Para obtener los valores de startDate y endDate
        const startDate = ranges.selection.startDate;
        const endDate = ranges.selection.endDate;

        // Formatear las fechas al inicio del día y en el formato 'YYYY-MM-DD'
        const formattedStartDate = format(startOfDay(startDate), 'yyyy-MM-dd');
        const formattedEndDate = format(startOfDay(endDate), 'yyyy-MM-dd');

        setDateStart(formattedStartDate);
        setDateEnd(formattedEndDate);

        setState([ranges.selection]);
    };
    const styles = {
        "date-range-container": {
            display: 'inline-flex',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            userSelect: 'none',
        }
    };

    return (
        <>

            <div style={styles["date-range-container"]}>
                <DefinedRange
                    ranges={state}
                    onChange={handleSelect}
                    staticRanges={staticRanges}
                    inputRanges={inputRanges}
                />
                <DateRange
                    locale={es}
                    ranges={state}
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"

                />

            </div>
        </>
    );
};

export default DatePickerRange;
