import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';

const AboutForm = () => {
    const { editUser, currentUser, updateCompleteComponents } = useContext(AppContext); // Access the currentUser

    //console.log('[AboutForm] currentUser:', currentUser);

    const handleSubmit = async (values) => {
        const id = currentUser?.id;
        //console.log('[AboutForm] Submitting Address with id:', id, ' values:', values);
        try {
            if (!id) {
                throw new Error('User ID is missing. Cannot proceed with update.');
            }
            await editUser(id, values); // Ensure ID is passed
            //console.log('[AboutForm] about updated successfully!');
            updateCompleteComponents('AboutForm'); // Mark as complete
            //console.log('[AboutForm] updateCompleteComponents complete!');
            //console.log('[AboutForm] handleNavigation complete!');

        } catch (error) {
            console.error('[AboutForm] Error updating Address:', error);
        }
    };

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            about: currentUser.about || '', // Initialize the About field
        },
        validationSchema: Yup.object({
            about: Yup.string().max(300, 'About Me must be 300 characters or less'),
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
