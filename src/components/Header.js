// In any child component
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Header = () => {
    const theme = useTheme();

    return (
        <div style={{ backgroundColor: theme.palette.background.default }}>
            <h1 style={{ color: theme.palette.primary.main }}>Hello!</h1>
            <Button variant="contained" color="secondary">
                Click Me
            </Button>
        </div>
    );
};

export default Header;
