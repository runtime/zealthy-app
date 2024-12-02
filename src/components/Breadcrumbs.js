import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Breadcrumbs = () => {
    const { currentStep, adminConfig, currentUser} = useContext(AppContext);
    const navigate = useNavigate();

   let breadcrumbs = [];

    if (currentUser.id === '') {
        //breadcrumbs = [];
        return (<div> Please Create An Account</div>);
    } else {
        breadcrumbs = adminConfig.map((step, index) => {
            const stepLabel = `Step ${index + 1}`;
            return (
                <Link
                    key={index}
                    underline="hover"
                    color={index === currentStep ? 'text.primary' : 'inherit'}
                    onClick={() => navigate(`/user-onboarding-${index + 1}`)}
                    sx={{ cursor: 'pointer' }}
                >
                    {stepLabel}
                </Link>
            );
        });
    }



    return (
        <MUIBreadcrumbs aria-label="breadcrumb">
            {breadcrumbs}
        </MUIBreadcrumbs>
    );
};

export default Breadcrumbs;
