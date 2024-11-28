import React, { createContext, useState, useEffect } from 'react';
import { createUser, updateUser, getUsers } from './api';

export const AppContext = createContext(); // Export the context

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [currentUser, setCurrentUser] = useState({ id: '', email: '', password:'', about: '', street:'', city:'', state:'', zip:''}); // Default user state
    const [currentStep, setCurrentStep] = useState(0); // Track onboarding step
    const [currentIndex, setCurrentIndex] = useState(1);
    //const [adminConfig, setAdminConfig] = useState([['AboutForm'], ['AddressForm', 'BirthdatePicker']]);
    //const [adminConfig, setAdminConfig] = useState([['AddressForm'], ['AboutForm', 'BirthdatePicker']]);
    const [adminConfig, setAdminConfig] = useState([['AboutForm', 'BirthdatePicker'], ['AddressForm']]);

    const [activeComponents, setActiveComponents] = useState(adminConfig.flat());
    const [completeComponents, setCompleteComponents] = useState([]); // Track completed components
    const [prettyUrl, setPrettyUrl] = useState('create-account-2');



    const getAllUsers = async() => {
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
    }

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


    const updateStep = () => {
        console.log('[ContextProvider] Updating step...this should only happen if all the items in the current Step are done');
        const nextStep = currentStep + 1;
        // note:  adminConfig.length can be altered but we just need to let the slide know its ok to route
        let prettyurl = '';
        if (nextStep >= adminConfig.length) {
            console.log('[ContextProvider] All steps complete. Navigating to /users.');
            // we are done with this step, time to go to the next step.
            // todo navigate to users page via state change
            // lets make this dynamic
            prettyurl = `/users`;
            console.log(`[ContextProvider] Setting Pretty URL: ${prettyurl}`);
            setPrettyUrl(prettyurl);

        } else {
            // set the pretty url
            setCurrentIndex(currentIndex + 1);
            prettyurl = `/create-account-${currentIndex}`; // Navigate to the next route
            console.log(`[ContextProvider] Setting Pretty URL: ${prettyurl}`);
            setPrettyUrl(prettyurl);
            setCurrentStep(nextStep); // THEN update current step
            console.log(`[ContextProvider] Advanced to step ${nextStep}`);
        }
    };


    // todo make this trigger the input flow instead of useEffect listening
    const updateCompleteComponents = (componentName) => {
        if (!completeComponents.includes(componentName)) {
            setCompleteComponents((prev) => {
                const updated = [...prev, componentName];
                console.log('[ContextProvider] Updated completeComponents:', updated);

                // Pass the updated list to isStepComplete to decide
                isStepComplete(updated);
                return updated;
            });
        } else {
            console.log('[ContextProvider] Component already marked as complete:', componentName);
        }
    };

    //todo make not truthy but a gatekeeper to update step which updates array config
    const isStepComplete = (updatedComponents) => {
        const stepComponents = adminConfig[currentStep] || []; // Components for this step

        const allComplete = stepComponents.every((component) =>
            updatedComponents.includes(component)
        );

        console.log(`[ContextProvider] Step ${currentStep} is complete:`, allComplete);

        if (allComplete) {
            console.log('[ContextProvider] Advancing step...');
            updateStep(); // Advance the step if all components are done
        }
    };


    // i like and see a use for it in the breadcrumbs as it can update us how many parts to each step we have complete.
    //todo  breadcrumbs could be onboarding : step 2 [address and birthday]  [[ step 3 [about you] ]]
    const getProgress = () => {
        const totalComponents = activeComponents.length; //active is total components in both arrays set once
        const completedComponents = completeComponents.length; // completed is completed from
        return { totalComponents, completedComponents };
    };

    console.log('[ContextProvider] Progress:', getProgress());

    //todo get the progress and use it to decide if isAllComplete
    const isAllComplete = () => {
        const { totalComponents, completedComponents } = getProgress();
        return completedComponents === totalComponents;
    };

    console.log('[ContextProvider] =========================================================');
    console.log('[ContextProvider] activeComponents:', activeComponents); // set once, all components in admin config array is flattened
    console.log('[ContextProvider] completed components:', completeComponents); // an array of self reported items complete
    //console.log('[ContextProvider] currentUser:', currentUser);
    console.log('[ContextProvider] adminConfig:', adminConfig); //array of arrays with all components in sub arrays
    console.log('[ContextProvider] currentStep:', currentStep); // 0 <-- which array we are on
    console.log('[ContextProvider] adminConfig[currentStep]:', adminConfig[currentStep]); // the current array of components at 0 or 1
    console.log('[ContextProvider] prettyUrl:', prettyUrl);
    console.log('[ContextProvider] getProgress():', getProgress());
    console.log('[ContextProvider] isAllComplete:', isAllComplete()); // all components
    console.log('[ContextProvider] =========================================================');


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
        prettyUrl,
        getAllUsers
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