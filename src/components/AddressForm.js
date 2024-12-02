import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddressForm = () => {
    const {
        editUser,
        currentUser,
        updateCompleteComponents,
        currentStep,
        adminConfig,
        prettyUrl,
    } = useContext(AppContext);
    const navigate = useNavigate();

    // Total components and completed components in the current step
    const stepsInThisStep = adminConfig[currentStep]?.length || 0;

    // const stepsCompleteForThisStep = adminConfig[currentStep]?.filter((component) =>
    //     currentUser?.completeComponents?.includes(component)
    // ).length;
    //
    // // Check if all components in the current step are complete
    // const allComponentsComplete = stepsCompleteForThisStep === stepsInThisStep;


    const handleNavigation = () => {
        console.log('[AddressForm] All components for this step are complete. Navigating to:', prettyUrl);
        navigate(prettyUrl);
    };

    const handleSubmit = async (values) => {
        const id = currentUser?.id;
        console.log('[AddressForm] Submitting Address with id:', id, ' values:', values);

        try {
            if (!id) {
                throw new Error('User ID is missing. Cannot proceed with update.');
            }
            // Update the user in the backend
            await editUser(id, values);
            console.log('[AddressForm] Address updated successfully!');

            // Mark the form as complete
            updateCompleteComponents('AddressForm');
            handleNavigation();
        } catch (error) {
            console.error('[AddressForm] Error updating Address:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            street: currentUser.street || '',
            city: currentUser.city || '',
            usersstate: currentUser.usersstate || '', // Updated field name for state
            zip: currentUser.zip || '',
        },
        validationSchema: Yup.object({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            usersstate: Yup.string().required('State is required'), // Updated field name
            zip: Yup.string()
                .matches(/^\d{5}$/, 'Zip code must be 5 digits')
                .required('Zip code is required'),
        }),
        onSubmit: (values) => handleSubmit(values),
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
                Address
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="street"
                    name="street"
                    label="Street"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.street && Boolean(formik.errors.street)}
                    helperText={formik.touched.street && formik.errors.street}
                />
                <TextField
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
                <TextField
                    fullWidth
                    id="usersstate"
                    name="usersstate"
                    label="State"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.usersstate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.usersstate && Boolean(formik.errors.usersstate)}
                    helperText={formik.touched.usersstate && formik.errors.usersstate}
                />
                <TextField
                    fullWidth
                    id="zip"
                    name="zip"
                    label="Zip Code"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                    helperText={formik.touched.zip && formik.errors.zip}
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

export default AddressForm;



