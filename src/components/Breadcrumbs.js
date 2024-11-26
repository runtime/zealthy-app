import React, { useContext } from 'react';
import { AppContext } from '../context/ContextProvider';

const Breadcrumbs = () => {
    const { currentStep } = useContext(AppContext);

    return (
        <div>
            <span style={{ fontWeight: currentStep === 1 ? 'bold' : 'normal' }}>Step 1: Create Account</span> &gt;
            <span style={{ fontWeight: currentStep === 2 ? 'bold' : 'normal' }}>Step 2: Additional Info</span> &gt;
            <span style={{ fontWeight: currentStep === 3 ? 'bold' : 'normal' }}>Step 3: Final Details</span>
        </div>
    );
};

export default Breadcrumbs;
