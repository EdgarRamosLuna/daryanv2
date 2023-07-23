import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonOutlined({ children, onClick, icon, iconStart, disableRipple = false }) {
    return (
        <Stack spacing={2} direction="row">
            <Button
                variant="contained"
                endIcon={icon ? icon : ""}
                startIcon={iconStart ? iconStart: ""}
                color="success"
                disableRipple={disableRipple}
                sx={{
                    borderRadius:'15px',
                    backgroundColor: "#fff",
                    '&:hover': {
                        //backgroundColor: '#002353',
                        color:"#ffff"
                    },
                    color:"#002353"
                }}
                onClick={onClick}
                
            >
                {children}
            </Button>
        </Stack>
    );
}
