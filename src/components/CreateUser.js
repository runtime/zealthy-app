import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';

const { v4: uuidv4 } = require('uuid');

const CreateUser = () => {
    const { addUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleNavigation = (currentStep) => {
        navigate(`/create-account-2`);
    };
    // Formik form setup
    const formik = useFormik({
        initialValues: {
            id: uuidv4(), // Generate a unique ID for the user
            email: '',
            password: '',
            firstName: '', // Optional fields initialized as empty strings
            lastName: '',
            street: '',
            city: '',
            usersstate: '',
            zip: '',
            about: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
            // No validation for optional fields
            firstName: Yup.string(),
            lastName: Yup.string(),
            street: Yup.string(),
            city: Yup.string(),
            usersstate: Yup.string(),
            zip: Yup.string(),
            about: Yup.string(),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log('[CreateUser] Submitting user:', values);
                const createdUser = await addUser(values); // Call the context function
                console.log('[CreateUser] User created:', createdUser);
                handleNavigation(); // Navigate after success
                resetForm(); // Clear the form
            } catch (error) {
                console.error('[CreateUser] Error creating user:', error);
                alert('Failed to create user. Please try again.');
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
            <Typography variant="h4" mb={2} textAlign="center">
                Create Account
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Create Account
                </Button>
            </form>
        </Box>
    );
};

export default CreateUser;
