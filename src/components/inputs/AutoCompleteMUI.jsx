import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function AutoCompleteMUI({ data, handleNameFilterChange }) {
    // Función personalizada para filtrar las opciones basada en múltiples campos
    const filterOptions = (options, { inputValue }) => {
      const lowercasedInput = inputValue.toLowerCase();
  
      const filteredOptions = options.filter((option) => {
        // Asegúrate de que los campos existen antes de mapear
        const lots = option.reports_cc ? option.reports_cc.map(cc => cc.lot).join(", ") : "";
        const serials = option.reports_cc ? option.reports_cc.map(cc => cc.serial).join(", ") : "";
        const suppliers = option.supplier || "";
        const planta = option.plant || "";
  
        // Concatena los campos para la búsqueda
        const searchText = `${option.part_number} ${option.part_name} ${planta} ${lots} ${serials} ${suppliers}`.toLowerCase();
  
        // Verifica si el texto de entrada está incluido en los campos concatenados
        return searchText.includes(lowercasedInput);
      });
  
      // Retorna solo los part_numbers filtrados
      return filteredOptions;
    };
  
    return (
      <Autocomplete
        options={data.map((option) => option.part_number)} // Solo part_numbers como opciones
        getOptionLabel={(option) => option || ''}
        filterOptions={filterOptions}
        onChange={(e) => handleNameFilterChange(e)}
        renderInput={(params) => <TextField {...params} label="Buscar"
        
        
        />}
        // No se necesita renderOption ya que solo estamos mostrando part_number
      />
    );
  }
  

export default AutoCompleteMUI;
