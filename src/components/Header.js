// In any child component
import React, {useContext} from 'react';
import { useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {AppContext} from "../context/ContextProvider";

const Header = () => {
    const theme = useTheme();
    const { currentUser } = useContext(AppContext);
    const navigate = useNavigate();

    let content = (<div>
        loading....
    </div>);

    // header should only offer the admin and create account in the app load
    // if there is a currentUser we do not want to change the config or create an account
    if (currentUser.email ==='') {
        content = (
            <div style={{backgroundColor: theme.palette.background.default}}>

                <Button variant="contained" color="secondary" onClick={() => navigate('/create-account')}>
                    CREATE ACCOUNT
                </Button>

                <Button variant="contained" color="grey" onClick={() => navigate('/admin')}>
                    ADMIN
                </Button>
                <Button variant="contained" color="grey" onClick={() => navigate('/users')}>
                    USERS
                </Button>


            </div>
        );
    } else {
        content = (
            <div style={{backgroundColor: theme.palette.background.default}}>
                <h3 style={{color: theme.palette.primary.main}}>{currentUser.email}!</h3>
                <Button variant="contained" color="grey" onClick={() => navigate('/users')}>
                    SHOW USERS
                </Button>
            </div>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: theme.palette.background.default, padding: '10px' }}>
            <Typography variant="h6" style={{color: theme.palette.primary.main}}>Welcome :)</Typography>
            {content}
        </Box>

    );
};

export default Header;
