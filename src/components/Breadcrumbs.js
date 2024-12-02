import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';

const Breadcrumbs = () => {
    const { currentIndex, adminConfig, currentStep} = useContext(AppContext);

    return (
        <div>
            <span style={{ fontWeight: currentIndex === 1 ? 'bold' : 'normal' }}>Create Account</span> &gt;
            <span style={{ fontWeight: currentIndex === 2 ? 'bold' : 'normal' }}>{adminConfig[0]}</span> &gt;
            <span style={{ fontWeight: currentIndex === 3 ? 'bold' : 'normal' }}>{adminConfig[1]}</span>
        </div>
    );
};

export default Breadcrumbs;
