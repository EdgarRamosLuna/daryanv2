import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function  ComboBoxMUI({ control, name, title, options }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          id="tags-outlined"
          options={options}
          getOptionLabel={(option) => option.label}
//          defaultValue={options[0] ? [options[0]] : []}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label={title}
              variant='standard'
              //placeholder="Favorites"
            />
          )}
        />
      )}
    />
  );
}
