// SnackBarUi.tsx
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { AlertColor } from '@mui/material/Alert';

interface SnackBarUiProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    onClose: () => void;
    autoHideDuration?: number;
}

const SlideTransition = (props: any) => {
    return <Slide {...props} direction="left" />;
};

const SnackBarUi: React.FC<SnackBarUiProps> = ({ open, message, severity, onClose, autoHideDuration = 1500 }) => {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose();
    };

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <Alert onClose={handleClose} variant='filled' severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBarUi;
