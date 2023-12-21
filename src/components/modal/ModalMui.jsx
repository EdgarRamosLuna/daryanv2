// ModalMui.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const ModalMui = ({ open, onClose, title, children, actions, maxWidth = '600px' }) => {
    const { t } = useTranslation();
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title"
            PaperProps={{ style: { maxWidth: maxWidth, width: '100%' } }}
        >
            <DialogTitle id="dialog-title">{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {actions ? actions : <Button onClick={onClose} color='error'>{t("close")}</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default ModalMui;
