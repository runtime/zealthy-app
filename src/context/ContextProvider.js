import React, { createContext, useState, useEffect } from 'react';
import { createUser, updateUser, getUsers } from './api';

export const AppContext = createContext(); // Export the context

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [currentUser, setCurrentUser] = useState({ id: '', email: '', password:'', about: '', street:'', city:'', state:'', zip:''}); // Default user state
    const [currentStep, setCurrentStep] = useState(1); // Track onboarding step
    //const [adminConfig, setAdminConfig] = useState([['AboutForm'], ['AddressForm', 'BirthdatePicker']]);
    const [adminConfig, setAdminConfig] = useState([['AddressForm'], ['AboutForm', 'BirthdatePicker']]);
    const [activeComponents, setActiveComponents] = useState(adminConfig.flat());
    const [completeComponents, setCompleteComponents] = useState([]); // Track completed components


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                //console.log('[ContextProvider] Fetched users response:', response);
                //console.log('[ContextProvider] Fetched users response.data:', response.data);
                console.log('[ContextProvider] Fetched users response.data.items:', response.data.Items);
                if (Array.isArray(response.data)) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.error('[ContextProvider] Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const addUser = async (user) => {
        try {
            const response = await createUser(user);
            console.log('[ContextProvider] Created user response:', response);
            console.log('[ContextProvider] Created user response.data:', response.data);

            // Parse the response body if it's returned as a string
            const createdUser = response.data;

            console.log('[ContextProvider] Parsed created user:', createdUser);

            // Update currentUser with the newly created user
            setCurrentUser(createdUser);

            // Add the created user to the userData array
            setUserData((prev) => [...prev, createdUser]);

            console.log('[ContextProvider] createdUser :', createdUser);

            // Return the created user
            return createdUser;
        } catch (error) {
            console.error('[ContextProvider] - Error adding user:', error);
            throw error; // Rethrow for handling in the component
        }
    };






    const editUser = async (id, updates) => {
        console.log('[ContextProvider] Editing user with ID:', id);
        console.log('[ContextProvider] Updates:', updates);

        try {
            // Ensure the provided ID matches the currentUser ID
            if (id !== currentUser.id) {
                throw new Error('[ContextProvider] Mismatched user ID. Unable to edit.');
            }

            // Send the update to the backend
            await updateUser(id, updates);

            // Update the currentUser state
            setCurrentUser((prev) => {
                console.log('[ContextProvider] Current user before update:', prev);
                const updatedUser = { ...prev, ...updates };
                console.log('[ContextProvider] Current user after update:', updatedUser);
                return updatedUser;
            });

            // Update the user in userData as well
            setUserData((prev) => {
                console.log('[ContextProvider] setUserData with:', prev);
                const updatedUserData = prev.map((user) =>
                    user.id === id ? { ...user, ...updates } : user
                );
                console.log('[ContextProvider] Updated userData:', updatedUserData);
                return updatedUserData;
            });

        } catch (error) {
            console.error('[ContextProvider] Error updating user:', error);
        }
    };



    // const validateStep = (step) => {
    //     const stepConfig = adminConfig[step - 1] || [];
    //     const allComplete = stepConfig.every((component) => completeComponents.includes(component));
    //     console.log('[ContextProvider] Step validation:', { step, stepConfig, allComplete });
    //     return allComplete;
    // };

    // const updateStep = () => {
    //     if (!validateStep(currentStep)) {
    //         console.warn('[ContextProvider] Cannot move to the next step: Current step is incomplete.');
    //         return `/create-account-${currentStep}`; // Stay on the current step
    //     }
    //
    //     const nextStep = currentStep + 1;
    //     if (nextStep > adminConfig.length) {
    //         console.log('[ContextProvider] All steps complete. Navigating to /users.');
    //         return '/users'; // All steps are complete
    //     }
    //
    //     setCurrentStep(nextStep);
    //     console.log('[ContextProvider] Moving to the next step:', nextStep);
    //     return `/create-account-${nextStep}`; // Navigate to the next route
    // };

    const updateStep = () => {
        if (isAllComplete()) {
            console.log('[ContextProvider] All components complete for current step!');

            if (currentStep >= adminConfig.length) {
                console.log('[ContextProvider] All steps complete. Navigating to /users.');
                return '/users'; // Go to success page
            } else {
                const nextStep = currentStep + 1;
                setCurrentStep(nextStep); // Increment step
                const nextRoute = `/create-account-${nextStep}`;
                console.log('[ContextProvider] Navigating to:', nextRoute);
                return nextRoute; // Go to the next route
            }
        } else {
            console.warn('[ContextProvider] Current step is not complete. Staying on current step.');
        }
    };


    const updateCompleteComponents = (componentName) => {
        if (!completeComponents.includes(componentName)) {
            setCompleteComponents((prev) => {
                const updated = [...prev, componentName];
                console.log('[ContextProvider] Updated completeComponents:', updated);
                return updated;
            });
        } else {
            console.log('[ContextProvider] Component already marked as complete:', componentName);
        }
    };



    const isAllComplete = () => {
        if (currentStep < 1 || currentStep > adminConfig.length) {
            console.error('[ContextProvider] Invalid currentStep:', currentStep);
            return false; // Fail-safe for invalid step
        }

        // Get the components for the current step
        const stepConfig = adminConfig[currentStep - 1] || [];
        console.log('[ContextProvider] Checking stepConfig:', stepConfig);

        // Check if every component in the step is marked complete
        const result = stepConfig.every((component) => completeComponents.includes(component));
        console.log('[ContextProvider] isAllComplete result:', result);

        return result;
    };



    console.log('[ContextProvider] =========================================================');
    console.log('[ContextProvider] completed components:', completeComponents);
    //console.log('[ContextProvider] currentUser:', currentUser);
    console.log('[ContextProvider] adminConfig:', adminConfig);
    console.log('[ContextProvider] currentStep:', currentStep);
    console.log('[ContextProvider] math that the adminConfig does -->currentStep -1:', currentStep -1);
    console.log('[ContextProvider] Current step config:', adminConfig[currentStep - 1]);
    console.log('[ContextProvider] isAllComplete:', isAllComplete());
    console.log('[ContextProvider] =========================================================');



    // const isStepComplete = (currentStep) => {
    //     const activeComponents = adminConfig[currentStep - 1] || [];
    //     return activeComponents.every((component) => completeComponents.includes(component));
    // };

    // const updateStep = () => {
    //     const nextStep = currentStep + 1;
    //     if (isAllComplete()) {
    //         // Navigate to "Success" or home page
    //         return '/users';
    //     } else {
    //         // Go to next step
    //         setCurrentStep(nextStep);
    //         return `/create-account-${nextStep}`;
    //     }
    // };

    // const addToComplete = (component) => {
    //     if (!completeComponents.includes(component)) {
    //         console.log('[ContextProvider] Adding to completeComponents:', component);
    //         setCompleteComponents((prev) => [...prev, component]);
    //         console.log('[ContextProvider] setCompleteComponents complete for:', component);
    //     }
    // };


    // const updateCompleteComponents = (componentName) => {
    //     setCompleteComponents((prev) => {
    //         const updated = [...prev];
    //         if (!updated.includes(componentName)) {
    //             updated.push(componentName);
    //         }
    //         console.log('[ContextProvider] Updated completeComponents:', updated);
    //         return updated;
    //     });
    // };

    // const isAllComplete = () => {
    //     return adminConfig[currentStep - 1].every((component) => completeComponents.includes(component));
    //     //return activeComponents.every((component) => completeComponents.includes(component));
    //
    // }



    const value = {
        userData,
        setUserData,
        adminConfig,
        setAdminConfig,
        completeComponents,
        setCompleteComponents,
        isAllComplete,
        updateCompleteComponents,
        currentStep,
        updateStep,
        addUser,
        editUser,
        currentUser,
        setCurrentUser,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default ContextProvider;
















// import React, { createContext, useState, useEffect } from 'react';
// import { createUser, updateUser, getUsers } from './api';
//
// const AppContext = createContext();
//
// export const ContextProvider = ({ children }) => {
//     const [userData, setUserData] = useState([]);
//     const [adminConfig, setAdminConfig] = useState([['about'], ['address', 'birthdate']]);
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await getUsers();
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);
//
//     const addUser = async (user) => {
//         try {
//             const response = await createUser(user);
//             setUserData((prev) => [...prev, response.data]); // Assuming the API returns the created user
//         } catch (error) {
//             console.error('Error adding user:', error);
//         }
//     };
//
//     const editUser = async (userId, updates) => {
//         try {
//             await updateUser(userId, updates);
//             // Update state after successful edit
//             setUserData((prev) =>
//                 prev.map((user) => (user.id === userId ? { ...user, ...updates } : user))
//             );
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };
//
//     const value = {
//         userData,
//         setUserData,
//         adminConfig,
//         setAdminConfig,
//         addUser,
//         editUser,
//     };
//
//     return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };
//
// export default ContextProvider;