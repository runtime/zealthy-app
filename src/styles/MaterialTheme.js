import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#ff4081' },
        background: { default: '#f4f6f8' },
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
