import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Grid } from '@mui/material';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const style = {
  fontSize: '33px'
}
export default function MuiCard({ children, show = true, setShow }) {
  return (
    <Card sx={{ minWidth: 375, maxHeight: 430, marginBottom: '15px', display: 'flex', flexDirection: 'column', justifyContent: `${show ? "space-between" : "end"} ` }}>
      <CardContent>
        <Grid sx={{ maxWidth: 333, maxHeight: 333 }} >
          {children}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button onClick={() => setShow(prev => !prev)}>{show ? <VisibilityIcon style={style} /> : <VisibilityOffIcon style={style} />}</Button>
      </CardActions>
    </Card>
  );
}
