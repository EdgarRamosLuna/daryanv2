
/**
 * Componente para selecionar rangos de fechas
 * @param {function} setStartDate Establece la fecha de inicio
 * @param {function} setEndDate Establece la fecha de fin
 * @author ERL 12:35pm
 * @returns 
 */
import React, { useState } from 'react';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale';
import { format, startOfDay } from 'date-fns';

const DatePickerRange = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }

    // Para obtener los valores de startDate y endDate
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;

    // Formatear las fechas al inicio del día y en el formato 'YYYY-MM-DD'
    const formattedStartDate = format(startOfDay(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(startOfDay(endDate), 'yyyy-MM-dd');

    console.log("Start Date: ", formattedStartDate);
    console.log("End Date: ", formattedEndDate);

    setState([ranges.selection]);
  };

  return (
    <DateRangePicker
      locale={es}
      ranges={state}
      onChange={handleSelect}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      direction="horizontal"
    />
  );
};

export default DatePickerRange;


// const DateRangePicker = () => {
//     const [state, setState] = useState([
//         {
//             startDate: new Date(),
//             endDate: addDays(new Date(), 7),
//             key: "selection",
//         },
//     ]);
//     const handleDateChange = (ranges) => {
//         setState(ranges);
//           // Para obtener los valores de startDate y endDate
//         const startDate = ranges.selection.startDate;
//         const endDate = ranges.selection.endDate;

//         console.log("Start Date: ", startDate);
//         console.log("End Date: ", endDate);
//         // const startDate = dayjs(dateRange[0]).startOf('day').format('YYYY-MM-DD');
//         // const endDate = dayjs(dateRange[1]).startOf('day').format('YYYY-MM-DD');
      
//         // setDateStart(startDate);
//         // setDateEnd(endDate);
//       };



//     /*
//     const selectionRange = {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection',
//   }
//     */
//     return (

//         <RangePicker
//             onChange={(item) => handleDateChange([item.selection])}
//             showSelectionPreview={true}
//             moveRangeOnFirstSelection={false}
//             months={2}
//             ranges={state}
//             direction="horizontal"
//         />
//         // <RangePicker
//         //     onChange={(item) => setState([item.selection])}
//         //     showSelectionPreview={true}
//         //     moveRangeOnFirstSelection={false}
//         //     months={2}
//         //     ranges={state}
//         //     direction="horizontal"
//         // />
//     )
// }

// export default DateRangePicker