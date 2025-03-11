import type { PaletteOptions } from "@mui/material";

const PURPLE = '#6B46C1';
const RED = '#f44336';
const ORANGE = '#FFC107';
const BLUE = '#2196f3';
const GREEN = '#4caf50';
const LIGHT_GRAY = '#F5F5F5';
const WHITE = '#FFFFFF';
const DARK_GRAY = '#333333';
const LIGHTER_GRAY = '#707070';
const SOFT_PINK = '#F48FB1';

export const palette: PaletteOptions = {
    primary: {
        main: PURPLE,
        dark: '#4c2a92',
        light: '#8d6ab3',
        contrastText: WHITE
    },
    secondary: {
        main: SOFT_PINK,
        dark: '#d5004f',
        light: '#ff79b0',
        contrastText: WHITE
    },
    error: {
        main: RED,
        dark: '#ba000d',
        light: '#ff7961',
        contrastText: WHITE
    },
    warning: {
        main: ORANGE,
        dark: '#c79100',
        light: '#ffd54f',
        contrastText: DARK_GRAY
    },
    info: {
        main: BLUE,
        dark: '#1769aa',
        light: '#4dabf5',
        contrastText: WHITE
    },
    success: {
        main: GREEN,
        dark: '#357a38',
        light: '#80e27e',
        contrastText: WHITE
    },
    background: {
        default: LIGHT_GRAY,
        paper: WHITE,
    },
    text: {
        primary: DARK_GRAY,
        secondary: LIGHTER_GRAY,
    },
}