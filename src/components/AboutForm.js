import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutForm = () => {
    const { editUser, updateStep, currentStep, currentUser } = useContext(AppContext); // Access the currentUser
    const navigate = useNavigate();

    console.log('[AboutForm] currentUser:', currentUser);

    // Navigation handler
    const handleNavigation = () => {
        const nextStep = currentStep + 1; // Increment step
        updateStep(nextStep); // Update step in context
        navigate(`/create-account-${nextStep}`); // Navigate to the next step
    };

    const handleSubmit = async (values, resetForm) => {
        console.log('[AboutForm] currentUser:', currentUser);
        try {
            const id = currentUser?.id;
            if (!id) {
                throw new Error('User ID is missing. Cannot proceed with update.');
            }

            console.log('[AboutForm] Submitting About Me id:', id, ' values:', values);

            await editUser(id, values); // Call editUser with the current user's ID and about field
            console.log('[AboutForm] About Me updated successfully!');

            handleNavigation(); // Navigate to the next step
            resetForm(); // Clear the form
        } catch (error) {
            console.error('[AboutForm] Error updating About Me:', error);
            console.log('Failed to update About Me. Please try again.');
        }
    };


    // Formik configuration
    const formik = useFormik({
        initialValues: {
            about: '', // Initialize the About field
        },
        validationSchema: Yup.object({
            about: Yup.string().max(300, 'About Me must be 300 characters or less'),
        }),
        onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm),

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
                About Me
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="about"
                    name="about"
                    label="About Me"
                    variant="outlined"
                    multiline
                    rows={4}
                    margin="normal"
                    value={formik.values.about}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.about && Boolean(formik.errors.about)}
                    helperText={formik.touched.about && formik.errors.about}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default AboutForm;
