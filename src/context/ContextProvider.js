import React, { createContext, useState, useEffect } from 'react';
import { createUser, updateUser, getUsers } from './api';

export const AppContext = createContext(); // Export the context

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [currentUser, setCurrentUser] = useState({ id: '', email: '', password:'', about: '', street:'', city:'', state:'', zip:''}); // Default user state
    const [currentStep, setCurrentStep] = useState(1); // Track onboarding step
    const [adminConfig, setAdminConfig] = useState([['AboutForm'], ['AddressForm', 'BirthdatePicker']]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                console.log('[ContextProvider] Fetched users response:', response);
                console.log('[ContextProvider] Fetched users response.data:', response.data);
                console.log('[ContextProvider] Fetched users response.data:', response.data.Items);
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


    const updateStep = (step) => {
        setCurrentStep(step);
    };

    const value = {
        userData,
        setUserData,
        adminConfig,
        setAdminConfig,
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