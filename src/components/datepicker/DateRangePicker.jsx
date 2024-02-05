
/**
 * Componente para selecionar rangos de fechas
 * @param {function} setStartDate Establece la fecha de inicio
 * @param {function} setEndDate Establece la fecha de fin
 * @author ERL 12:35pm
 * @returns 
 */
import React, { useEffect, useState } from 'react';
import {
    endOfDay,
    addMonths,
    startOfWeek,
    differenceInCalendarDays,
    format, startOfDay, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths, isSameDay, isWithinInterval, addDays,

} from 'date-fns';

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-datepicker/dist/react-datepicker.css";
import { DateRange, DateRangePicker, DefinedRange } from 'react-date-range';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { parseISO } from 'date-fns';
import { Tooltip } from '@mui/material';

const DatePickerRange = ({ setDateStart, setDateEnd, dLastDateByPartNumber, dfirstDateByPartNumber, reportDates = [] }) => {

    const { t, i18n } = useTranslation();
    const [markedDatesRange, setMarkedDatesRange] = useState({
        startDate: new Date(dLastDateByPartNumber),
        endDate: new Date(dfirstDateByPartNumber),
        key: 'selection'
    });
    const [state, setState] = useState([
        {
            startDate: new Date().setUTCHours(5, 0, 0, 999),
            endDate: new Date().setUTCHours(5, 0, 0, 999),
            key: 'selection'
        }
    ]);
    useEffect(() => {

        if (dLastDateByPartNumber !== '' && dfirstDateByPartNumber !== '') {

            setMarkedDatesRange({
                startDate: new Date(dLastDateByPartNumber).setUTCHours(6, 0, 0, 999),
                endDate: new Date(dfirstDateByPartNumber).setUTCHours(6, 0, 0, 999),
            })
            setState([{
                startDate: new Date(dLastDateByPartNumber).setUTCHours(6, 0, 0, 999),
                endDate: new Date(dfirstDateByPartNumber).setUTCHours(6, 0, 0, 999),
                key: 'selection'
            }])
        }

    }, [dLastDateByPartNumber, dfirstDateByPartNumber])
    // function customDayContent(day) {
    //     let extraDot = null;
    //     if (reportDates.some(specialDate => isSameDay(day, specialDate))) {
    //       extraDot = (
    //         <div style={{
    //           height: "5px",
    //           width: "5px",
    //           borderRadius: "100%",
    //           background: "red", // El color que prefieras
    //           position: "absolute",
    //           top: 2,
    //           right: 2,
    //         }} />
    //       );
    //     }
    //     return (
    //       <div>
    //         {extraDot}
    //         <span>{format(day, "d")}</span>
    //       </div>
    //     )
    //   }
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
    function isDateInMarkedRange(date) {
        return isWithinInterval(date, {
            start: markedDatesRange.startDate,
            end: markedDatesRange.endDate
        });
    }
    function customDayContent(day) {
        let extraDot = null;
        const { startDate, endDate } = markedDatesRange; // Asumiendo que estas son tus fechas de inicio y fin


        const specialDates = reportDates
            .reduce((unique, date) => {
                // Convert the date string to a Date object
                const dateObj = parseISO(date);
                // Create a string representation of the date for comparison
                const dateStr = dateObj.toISOString();
                // If this date string is not yet in the unique array, add the Date object
                if (!unique.some(d => d.toISOString() === dateStr)) {
                    unique.push(dateObj);
                }
                return unique;
            }, []);

        if (specialDates.some(specialDate => isSameDay(day, specialDate))) {
            extraDot = (
                <Tooltip title="Dia inspecciónado">


                    <div style={{
                        height: "6px",
                        width: "6px",
                        borderRadius: "100%",
                        background: "red", // Customize as needed
                        position: "absolute",
                        top: 2,
                        right: 2,
                    }} />
                </Tooltip>
            );
        }

        // Verifica si la fecha actual es la fecha de inicio o la fecha de fin
        if ((startDate && isSameDay(day, startDate))) {
            extraDot = (
                <Tooltip title="Primera fecha de inspección">
                    <div
                        style={{
                            height: '10px',
                            width: '10px',
                            borderRadius: '100%',
                            background: 'yellowgreen', // Elige el color de la marca
                            position: 'absolute',
                            top: 2,
                            right: 2,
                        }}
                    />
                </Tooltip>
            );
        }
        if ((endDate && isSameDay(day, endDate))) {
            extraDot = (
                <Tooltip title="Ultima fecha de inspección">
                    <div
                        style={{
                            height: '10px',
                            width: '10px',
                            borderRadius: '100%',
                            background: 'yellowgreen', // Elige el color de la marca
                            position: 'absolute',
                            top: 2,
                            right: 2,
                        }}
                    />
                </Tooltip>
            );
        }
        return (
            <div>
                {extraDot}
                <span>{format(day, 'd')}</span>
            </div>
        );
    }


    const staticRanges = [
        {
            label: t('dates.today'),
            range: () => ({
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }),
            isSelected: (range) => isSameDay(new Date(), range.startDate) && isSameDay(new Date(), range.endDate),
        },
        {
            label: t('dates.yesterday'),
            range: () => ({
                startDate: addDays(new Date(), -1),
                endDate: addDays(new Date(), -1),
                key: 'selection',
            }),
            isSelected: (range) => isSameDay(addDays(new Date(), -1), range.startDate) && isSameDay(addDays(new Date(), -1), range.endDate),
        },
        {
            label: t('dates.thisWeek'),
            range: () => ({
                startDate: startOfWeek(new Date()),
                endDate: endOfWeek(new Date()),
                key: 'selection',
            }),
            isSelected: (range) => isWithinInterval(new Date(), { start: startOfWeek(new Date()), end: endOfWeek(new Date()) }),
        },
        {
            label: t('dates.lastWeek'),
            range: () => ({
                startDate: startOfWeek(subWeeks(new Date(), 1)),
                endDate: endOfWeek(subWeeks(new Date(), 1)),
                key: 'selection',
            }),
            isSelected: (range) => isWithinInterval(new Date(), { start: startOfWeek(subWeeks(new Date(), 1)), end: endOfWeek(subWeeks(new Date(), 1)) }),
        },
        {
            label: t('dates.thisMonth'),
            range: () => ({
                startDate: startOfMonth(new Date()),
                endDate: endOfMonth(new Date()),
                key: 'selection',
            }),
            isSelected: (range) => isWithinInterval(new Date(), { start: startOfMonth(new Date()), end: endOfMonth(new Date()) }),
        },
        {
            label: t('dates.lastMonth'),
            range: () => ({
                startDate: startOfMonth(subMonths(new Date(), 1)),
                endDate: endOfMonth(subMonths(new Date(), 1)),
                key: 'selection',
            }),
            isSelected: (range) => isWithinInterval(new Date(), { start: startOfMonth(subMonths(new Date(), 1)), end: endOfMonth(subMonths(new Date(), 1)) }),
        },
        // Agrega aquí más rangos predefinidos...
    ];

    const inputRanges = [
        {
            label: t('dates.daysUpToToday'),
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
            label: t('dates.daysStartingToday'),
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




    const handleSelect = (ranges) => {

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

    const activeLanguage = i18n.language;
    const dateLocale = activeLanguage === 'es' ? es : enUS;
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
                    locale={dateLocale}
                    ranges={state}
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"
                    dayContentRenderer={customDayContent}

                />
            </div>
        </>
    );
};

export default DatePickerRange;

