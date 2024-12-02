import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#ae50ec' },
        background: {
            default: '#d2e0f8',
            alternate: '#c7ec94'},
        button: {
            warning: '#f50057',
            success: '#4caf50',
            info: '#2196f3',
            error: '#f44336',
            primary: '#1976d2',
            secondary: '#ae50ec',
            default: '#64a1fb',
            alternate: '#c7ec94',

        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: { fontSize: '2rem', fontWeight: 600 },
        body1: { fontSize: '1rem' },
    },
});

const MaterialTheme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default MaterialTheme;
export { theme }; // Optional: export theme object for direct use
