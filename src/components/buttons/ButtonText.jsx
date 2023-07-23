import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonText({ content, onClick }) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text" onClick={onClick}
        sx={{
          height: '30px',
          color: '#fff',
          borderColor: '#fff',
          border: '1px solid',
          boxSizing: 'border-box',
          borderRadius: '9px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
        
      >{content}</Button>
    </Stack>
  );
}
