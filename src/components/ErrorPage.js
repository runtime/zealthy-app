import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
const ErrorPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();


    return (
        <div style={{backgroundColor: theme.palette.background.default, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h1" style={{color: theme.palette.primary.main, marginBottom: '20px'}}>Oops!</Typography>
            <Typography variant="h5" style={{color: theme.palette.secondary.main, marginBottom: '20px'}}>Something went wrong.</Typography>
        </div>
    );
};

export default ErrorPage;