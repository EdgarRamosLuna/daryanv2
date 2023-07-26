import { Grid } from '@mui/material'
import React from 'react'

const NoFound404 = () => {
    return (
        <Grid
            sx={{
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
            }}>
            Error 404 <br /> Pagina no encontrada
        </Grid>
    )
}

export default NoFound404