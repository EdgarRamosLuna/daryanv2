import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
/**
 * Un componente de formulario básico que contiene un campo de texto.
 * Utiliza la biblioteca de Material-UI para los componentes de interfaz de usuario.
 * 01/07/2023
 * @param {Object} props - Las propiedades del componente. Actualmente no se utilizan.
 *
 * @returns {JSX.Element} Un formulario con un solo campo de texto.
 */
export default function InputComponent({
    onChange,
    id,
    type,
    placeholder 
}) {
    const [value, setValue] = useState('');
    useEffect(() => {
        if (value !== "") onChange(value)
        return () => {

        }
    }, [value])

    return (
        <Box
            type={type}
            value={value}
            placeholder={placeholder}
            
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" onChange={(e) => setValue(e.target.value)} value={value} label="Outlined" variant="outlined" />
            {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        </Box>
    );
}