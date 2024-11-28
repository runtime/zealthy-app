import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../context/ContextProvider';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddressForm = () => {
    const { editUser, currentUser, currentStep, updateStep, isAllComplete, updateCompleteComponents } = useContext(AppContext);
    const navigate = useNavigate();

    //console.log('[AddressForm] currentUser:', currentUser);


// const handleNavigation = () => {
//     console.log('[AddressForm] handleNavigation isAllComplete:', isAllComplete);
//     if (!isAllComplete) {
//         const nextStep = currentStep + 1;
//         updateStep(nextStep);
//         navigate(`/create-account-${nextStep}`);
//     } else {
//         console.log('[You are finished!]');
//         navigate('/users');
//     }
// };



    const handleSubmit = async (values) => {
        const id = currentUser?.id;
        console.log('[AddressForm] Submitting Address with id:', id, ' values:', values);

        try {
            if (!id) {
                throw new Error('User ID is missing. Cannot proceed with update.');
            }
            await editUser(id, values);
            console.log('[AddressForm] Address updated successfully!');
            updateCompleteComponents('AddressForm'); // Mark as complete
        } catch (error) {
            console.error('[AddressForm] Error updating Address:', error);
        }
    };

    // const handleSubmit = async (values) => {
    //     const id = currentUser?.id;
    //     console.log('[AddressForm] Submitting Address with id:', id, ' values:', values);
    //
    //     try {
    //         if (!id) {
    //             throw new Error('User ID is missing. Cannot proceed with update.');
    //         }
    //         await editUser(id, values); // Update user
    //         console.log('[AddressForm] Address updated successfully!');
    //         updateCompleteComponents('AddressForm'); // Mark as complete
    //
    //         // Trigger navigation based on context's logic
    //         const nextRoute = updateStep();
    //         if (nextRoute) {
    //             navigate(nextRoute); // Navigate only if a route is returned
    //         }
    //     } catch (error) {
    //         console.error('[AddressForm] Error updating Address:', error);
    //     }
    // };





    // const handleNavigation = () => {
    //     if (isStepComplete(currentStep)) {
    //         const nextStep = currentStep + 1;
    //         updateStep(nextStep);
    //         navigate(`/create-account-${nextStep}`);
    //     } else {
    //         console.warn('[Navigation] Current step is not complete. Cannot proceed.');
    //     }
    // };
    //
    // const handleSubmit = async (values) => {
    //     const id = currentUser?.id;
    //     console.log('[AddressForm] Submitting Address with id:', id, ' values:', values);
    //
    //     try {
    //         if (!id) {
    //             throw new Error('User ID is missing. Cannot proceed with update.');
    //         }
    //
    //         await editUser(id, values); // Ensure ID is passed
    //         console.log('[AddressForm] Address updated successfully!');
    //         updateCompleteComponents('AddressForm')
    //         handleNavigation(); // Navigate to the next step
    //     } catch (error) {
    //         console.error('[AddressForm] Error updating Address:', error);
    //     }
    // };



    const formik = useFormik({
        initialValues: {
            id: currentUser.id,
            email: currentUser.email,
            password: currentUser.password,
            street: currentUser.street || '',
            city: currentUser.city || '',
            usersstate: currentUser.usersstate || '', // Updated field name
            zip: currentUser.zip || '',
            about: currentUser.about || '',
        },
        validationSchema: Yup.object({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            usersstate: Yup.string().required('State is required'), // Updated field name
            zip: Yup.string()
                .matches(/^\d{5}$/, 'Zip code must be 5 digits')
                .required('Zip code is required'),
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
                    id="state" // Updated field name
                    name="usersstate" // Updated field name
                    label="State"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.usersstate} // Updated field name
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.usersstate && Boolean(formik.errors.usersstate)} // Updated field name
                    helperText={formik.touched.usersstate && formik.errors.usersstate} // Updated field name
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
                <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default AddressForm;








// import React, { useContext } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { AppContext } from '../context/ContextProvider';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
//
// const AddressForm = () => {
//     const { editUser, currentUser, currentStep, updateStep } = useContext(AppContext);
//     const navigate = useNavigate();
//
//     console.log('[AddressForm] currentUser:', currentUser);
//
//     const handleNavigation = () => {
//         const nextStep = currentStep + 1; // Increment step
//         updateStep(nextStep); // Update step in context
//         navigate(`/create-account-${nextStep}`); // Navigate to the next step
//     };
//
//     const handleSubmit = async (values) => {
//
//         const id = currentUser.id
//         console.log('[AddressForm] Submitting Address by id:', id, ' values:', values);
//
//         try {
//             await editUser(id, values); // Ensure ID is passed
//             //handleNavigation()
//             console.log('[AddressForm] Address updated successfully!');
//         } catch (error) {
//             console.error('[AddressForm] Error updating Address:', error);
//         }
//     };
//
//
//     const formik = useFormik({
//         initialValues: {
//             id: currentUser.id,
//             email: currentUser.email,
//             password: currentUser.password,
//             street: currentUser.street || '',
//             city: currentUser.city || '',
//             usersstate: currentUser.usersstate || '',
//             zip: currentUser.zip || '',
//             about: currentUser.about || '',
//         },
//         validationSchema: Yup.object({
//             street: Yup.string().required('Street is required'),
//             city: Yup.string().required('City is required'),
//             usersstate: Yup.string().required('State is required'),
//             zip: Yup.string()
//                 .matches(/^\d{5}$/, 'Zip code must be 5 digits')
//                 .required('Zip code is required'),
//         }),
//         // onSubmit: async (values) => {
//         //     console.log('[AddressForm] Submitting Address:', values);
//         //     try {
//         //         await editUser(currentUser.id, values); // Ensure ID is passed
//         //         console.log('[AddressForm] Address updated successfully!');
//         //     } catch (error) {
//         //         console.error('[AddressForm] Error updating Address:', error);
//         //     }
//         // },
//         onSubmit: (values, { resetForm }) => handleSubmit(values, resetForm),
//     });
//
//     return (
//         <Box
//             sx={{
//                 maxWidth: 400,
//                 margin: 'auto',
//                 mt: 5,
//                 p: 3,
//                 boxShadow: 3,
//                 borderRadius: 2,
//                 bgcolor: 'background.paper',
//             }}
//         >
//             <Typography variant="h5" mb={2} textAlign="center">
//                 Address
//             </Typography>
//             <form onSubmit={formik.handleSubmit}>
//                 <TextField
//                     fullWidth
//                     id="street"
//                     name="street"
//                     label="Street"
//                     variant="outlined"
//                     margin="normal"
//                     value={formik.values.street}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.street && Boolean(formik.errors.street)}
//                     helperText={formik.touched.street && formik.errors.street}
//                 />
//                 <TextField
//                     fullWidth
//                     id="city"
//                     name="city"
//                     label="City"
//                     variant="outlined"
//                     margin="normal"
//                     value={formik.values.city}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.city && Boolean(formik.errors.city)}
//                     helperText={formik.touched.city && formik.errors.city}
//                 />
//                 <TextField
//                     fullWidth
//                     id="state"
//                     name="state"
//                     label="State"
//                     variant="outlined"
//                     margin="normal"
//                     value={formik.values.state}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.state && Boolean(formik.errors.state)}
//                     helperText={formik.touched.state && formik.errors.state}
//                 />
//                 <TextField
//                     fullWidth
//                     id="zip"
//                     name="zip"
//                     label="Zip Code"
//                     variant="outlined"
//                     margin="normal"
//                     value={formik.values.zip}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.zip && Boolean(formik.errors.zip)}
//                     helperText={formik.touched.zip && formik.errors.zip}
//                 />
//                 <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//                     Submit
//                 </Button>
//             </form>
//         </Box>
//     );
// };
//
// export default AddressForm;
