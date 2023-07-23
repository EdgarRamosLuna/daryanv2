import * as React from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
 

/*


*/
export default function DatePickerMUI() {
  const [dateRange, setDateRange] = useState([null, null]);
    console.log(dateRange[0])
  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker 
          localeText={{ start: 'Check-in', end: 'Check-out' }} 
          value={dateRange} 
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
