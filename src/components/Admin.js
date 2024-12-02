import React, { useContext, useState } from 'react';
import { AppContext } from '../context/ContextProvider';
import { Box, Typography, TextField, Button, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { adminConfig, setAdminConfig } = useContext(AppContext);
    const [selectedStep, setSelectedStep] = useState(0);
    const [componentName, setComponentName] = useState('');

    const navigate = useNavigate();

    const handleAdd = () => {
        if (!componentName) return;

        // Ensure adminConfig array has enough steps
        const updatedConfig = [...adminConfig];
        while (updatedConfig.length <= selectedStep) {
            updatedConfig.push([]);
        }

        // Add component to the selected step
        if (updatedConfig[selectedStep].length < 2 && !updatedConfig.flat().includes(componentName)) {
            updatedConfig[selectedStep].push(componentName);
            console.log('[Admin] ADDED and setting updatedConfig:', updatedConfig);
            setAdminConfig(updatedConfig);
            console.log('[Admin] this is the updatedConfig:', updatedConfig);
        } else {
            alert('Cannot add duplicate components or exceed 2 components per step.');
        }

        setComponentName('');
    };

    const handleRemove = (stepIndex, component) => {
        const updatedConfig = [...adminConfig];
        updatedConfig[stepIndex] = updatedConfig[stepIndex].filter((c) => c !== component);
        console.log('[Admin] REMOVED and setting updatedConfig:', updatedConfig);
        setAdminConfig(updatedConfig);
        console.log('[Admin] this is the updatedConfig:', updatedConfig);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" mb={3}>
                Admin UI
            </Typography>
            <Typography variant="h5" mb={2}>
                Onboarding Configuration
            </Typography>

            <Typography variant="p" mb={2}>
                The admin comes set with a preset configuration below Current Steps Configuration
            </Typography>
            <Typography variant="h5" mb={2}>
                Instructions
            </Typography>
            <Typography variant="p" mb={2}>
                Choose the components you want to include in each step of the onboarding.
                You need to remove the components if they are already in the Current Steps Configuration
                you need to type in the name of the component in camelCase exactly the way it appears in the list below.
                names need to choose the number slide you want. slide 0 is the first slide, 1 is the second, etc..
                You can only add 2 components per step.
                <ul>
                    <li>AddressForm</li>
                    <li>BirthdatePicker</li>
                    <li>AboutForm</li>
                </ul>

            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Assign Components to Steps</Typography>
                <TextField
                    label="Component Name"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <TextField
                    type="number"
                    label="Step Index"
                    value={selectedStep}
                    onChange={(e) => setSelectedStep(Number(e.target.value))}
                    sx={{ mr: 2, width: '100px' }}
                />
                <Button variant="contained" color="primary" onClick={handleAdd}>
                    Add Component
                </Button>
            </Box>

            <Typography variant="h6">Current Steps Configuration</Typography>
            <List>
                {adminConfig.map((step, index) => (
                    <ListItem key={index}>
                        <Typography variant="subtitle1">
                            Step {index + 1}: {step.join(', ')}
                        </Typography>
                        {step.map((component) => (
                            <Button
                                key={component}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={() => handleRemove(index, component)}
                                sx={{ ml: 1 }}
                            >
                                Remove {component}
                            </Button>
                        ))}
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
                SAVE ONBOARDING CONFIGURATION
            </Button>
        </Box>
    );
};

export default Admin;

