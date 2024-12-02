// In any child component
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Header = () => {
    const theme = useTheme();

    return (
        <div style={{backgroundColor: theme.palette.background.default}}>
            {/*<h3 style={{color: theme.palette.primary.main}}>Hello!</h3>*/}
            <h3 style={{color: theme.palette.secondary.main}}>Zealthy API!</h3>
            {/*<Button variant="contained" color="secondary">*/}
            {/*    Click Me*/}
            {/*</Button>*/}
        </div>
    );
};

export default Header;
