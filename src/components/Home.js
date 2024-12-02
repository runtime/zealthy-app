import React from 'react';
import {Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';

import { useNavigate } from 'react-router-dom';


const Home = () => {
    const theme = useTheme();
    const { currentUser, prettyUrl } = useContext(AppContext);
    const navigate = useNavigate();

    console.log('[Home] currentUser:', currentUser);

    const handleNavigation = () => {
        if (currentUser.id != '') {
            navigate(prettyUrl);
            return;
        }
        navigate('/create-account');
    }

    return (
        <div style={{backgroundColor: theme.palette.background.default, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h1" style={{color: theme.palette.primary.main, marginBottom: '20px'}}>Welcome</Typography>
            <Typography variant="h5" style={{color: theme.palette.secondary.main, marginBottom: '20px'}}>Home :)</Typography>
            <Button variant="contained" color="primary" onClick={handleNavigation}>CREATE ACCOUNT</Button>
        </div>
    );
};

export default Home;