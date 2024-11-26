import React, { useContext, useState } from 'react';
import AppContext from '../context/ContextProvider';

const Admin = () => {
    const { adminConfig, setAdminConfig } = useContext(AppContext);
    const [availableComponents] = useState(['AddressForm', 'AboutForm', 'BirthdatePicker']);

    const handleAdd = (component, index) => {
        const updatedConfig = [...adminConfig];
        if (updatedConfig[index].length < 2 && !updatedConfig.flat().includes(component)) {
            updatedConfig[index].push(component);
            setAdminConfig(updatedConfig);
        }
    };

    const handleRemove = (component, index) => {
        const updatedConfig = [...adminConfig];
        updatedConfig[index] = updatedConfig[index].filter((c) => c !== component);
        setAdminConfig(updatedConfig);
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            {adminConfig.map((stepConfig, index) => (
                <div key={index}>
                    <h3>Step {index + 2}</h3>
                    <div>
                        {stepConfig.map((component) => (
                            <div key={component}>
                                {component}{' '}
                                <button onClick={() => handleRemove(component, index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        {availableComponents
                            .filter((component) => !stepConfig.includes(component))
                            .map((component) => (
                                <button key={component} onClick={() => handleAdd(component, index)}>
                                    Add {component}
                                </button>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Admin;
