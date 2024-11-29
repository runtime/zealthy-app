import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BirthdatePicker = () => {
    const { editUser, currentUser, currentStep, updateStep, isAllComplete, updateCompleteComponents, prettyUrl } = useContext(AppContext);
    const navigate = useNavigate();

   // console.log('[BirthdatePicker] Current user:', currentUser);



    const handleNavigation = () => {

        navigate(prettyUrl[currentStep + 1]);

    };


    const handleSubmit = async (values) => {
        const id = currentUser?.id;
        console.log('[BirthdatePicker] Submitting Address with id:', id, ' values:', values);
        try {
            if (!id) {
                throw new Error('User ID is missing. Cannot proceed with update.');
            }
            await editUser(id, values); // Ensure ID is passed
            console.log('[BirthdatePicker] birthday updated successfully!');
            updateCompleteComponents('BirthdatePicker'); // Mark as complete
            console.log('[BirthdatePicker] updateCompleteComponents complete!');
            //handleNavigation(); // Navigate to the next step
            console.log('[BirthdatePicker] handleNavigation complete!');
        } catch (error) {
            console.error('[BirthdatePicker] Error updating Address:', error);
        }
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
        onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm),
        // onSubmit: async (values, { resetForm }) => {
        //     console.log('[BirthdatePicker] Submitting Birthdate:', values);
        //     try {
        //         await editUser(currentUser.id, values); // Update user with birthdate
        //         console.log('[BirthdatePicker] Birthdate updated successfully!');
        //         handleNavigation(); // Proceed to the next step
        //         resetForm();
        //     } catch (error) {
        //         console.error('[BirthdatePicker] Error updating birthdate:', error);
        //     }
        // },
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
