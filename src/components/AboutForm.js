import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutForm = () => {
    const { editUser, currentUser, adminConfig, currentStep, completeComponents, updateCompleteComponents, prettyUrl } = useContext(AppContext); // Access the currentUser
    const navigate = useNavigate();

    //console.log('[AboutForm] currentUser:', currentUser);

    // Navigation logic
    const step = currentStep;
    console.log('[AboutForm] current step in this step: step: ', step);
    const stepsInThisStep = adminConfig[currentStep]?.length || 0;
    console.log('total number of steps components for this slide: ', stepsInThisStep);
    //todo reset or get how many are complete this step
    const howManyStepsAreComplete = completeComponents.length;
    console.log('[AboutForm] howManyStepsAreComplete: ', howManyStepsAreComplete);
    const completeComponentsForThisStep = completeComponents.length;
    console.log('[AboutForm] total number of completed components for this step: ', completeComponentsForThisStep);




    const handleNavigation = () => {
        if (stepsInThisStep === howManyStepsAreComplete) {
            // If all components are complete, navigate to the next step
            navigate(prettyUrl);
        } else {
            // dont navigate
            console.log('[AddressForm] Not all components are complete. Cannot proceed.');
        }
    }


    const handleSubmit = async (values) => {
        const id = currentUser?.id;
        console.log('[AboutForm] Submitting Address with id:', id, ' values:', values);
        try {
            if (!id) {
                throw new Error('User ID is missing. Cannot proceed with update.');
            }
            await editUser(id, values); // Ensure ID is passed
            console.log('[AboutForm] about updated successfully!');
            updateCompleteComponents('AboutForm'); // Mark as complete
            console.log('[AboutForm] updateCompleteComponents complete!');
            handleNavigation(); // Navigate to the next step
            console.log('[AboutForm] handleNavigation complete!');

        } catch (error) {
            console.error('[AboutForm] Error updating Address:', error);
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
