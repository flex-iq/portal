import React from 'react';
import { Button, Box } from '@mui/material';

interface NavigationButtonProps {
    handleCancel: () => void;
    handleNext: () => void;
    isFormValid: () => number | string;
}

export const NavigationButtons: React.FC<NavigationButtonProps> = ({ handleCancel, handleNext, isFormValid }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', my: 2 }}>
            <Button variant="outlined" size="large" onClick={() => handleCancel()}>
                Cancel
            </Button>
            <Button variant="contained" size="large" disabled={!isFormValid()} onClick={() => handleNext()}>
                Next
            </Button>
        </Box>
    );
}