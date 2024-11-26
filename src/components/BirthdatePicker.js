import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BirthdatePicker = () => {
    const { editUser, currentUser, currentStep, updateStep } = useContext(AppContext);
    const navigate = useNavigate();

    console.log('[BirthdatePicker] Current user:', currentUser);

    const handleNavigation = () => {
        const nextStep = currentStep + 1; // Increment step
        updateStep(nextStep); // Update step in context
        navigate(`/create-account-${nextStep}`); // Navigate to the next step
    };

    const formik = useFormik({
        initialValues: {
            birthdate: currentUser.birthdate || '',
        },
        validationSchema: Yup.object({
            birthdate: Yup.date()
                .max(new Date(), 'Birthdate cannot be in the future')
                .required('Birthdate is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('[BirthdatePicker] Submitting Birthdate:', values);
            try {
                await editUser(currentUser.id, values); // Update user with birthdate
                console.log('[BirthdatePicker] Birthdate updated successfully!');
                handleNavigation(); // Proceed to the next step
                resetForm();
            } catch (error) {
                console.error('[BirthdatePicker] Error updating birthdate:', error);
            }
        },
    });

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: 'auto',
                mt: 5,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
            }}
        >
            <Typography variant="h5" mb={2} textAlign="center">
                Birthdate
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="birthdate"
                    name="birthdate"
                    label="Birthdate (YYYY-MM-DD)"
                    type="date"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.birthdate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                    helperText={formik.touched.birthdate && formik.errors.birthdate}
                    InputLabelProps={{ shrink: true }}
                />
                <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default BirthdatePicker;
