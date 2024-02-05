import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';

export default function DataGridMUI({rows, columns, localeText}) {
  
  const { lang: globalLang } = useContext(LanguageContext);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}        
        disableRowSelectionOnClick
        disableColumnSelector
        disableRowsSelector
        localeText={ globalLang === 'es' ? esES.components.MuiDataGrid.defaultProps.localeText : ''}
      />
    </Box>
  );
}