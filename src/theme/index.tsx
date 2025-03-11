import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

export const theme: Theme = responsiveFontSizes(createTheme({
    palette,
    typography,
}));
