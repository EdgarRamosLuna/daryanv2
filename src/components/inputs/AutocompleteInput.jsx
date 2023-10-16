import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const AutocompleteInput = ({
  id,
  name,
  options,
  value,
  label,
  onChange,
  getOptionLabel
}) => {
  const { t } = useTranslation();
  return (
    <Autocomplete
      disablePortal
      id={id}
      name={name}
      options={options}
      value={value}
      getOptionLabel={getOptionLabel}
      sx={{ width: "95%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label={label}
          name={name}
        />
      )}
      onChange={onChange}
    />

    // <Autocomplete
    //   disablePortal
    //   id="combo-box-demo"
    //   name="id_supplier"
    //   options={options}
    //   value={
    //     options.find(
    //       (supplier) => supplier.id === data.id_supplier
    //     ) || null
    //   } // Aquí estableces el valor
    //   getOptionLabel={(option) => option.fullname}
    //   sx={{ width: "95%" }}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       required
    //       label={t("table.supplier")}
    //       name="id_supplier"
    //     />
    //   )}
    //   onChange={(e, newValue) =>
    //     setData({
    //       ...data,
    //       id_supplier: newValue ? newValue.id : null,
    //     })
    //   }
    // />

  )
}

export default AutocompleteInput
