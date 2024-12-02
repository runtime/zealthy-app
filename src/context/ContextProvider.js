import React, { createContext, useState } from 'react';
import { createUser, updateUser, getUsers } from './api';

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        id: '',
        email: '',
        password: '',
        about: '',
        street: '',
        city: '',
        state: '',
        zip: '',
    });
    const [currentStep, setCurrentStep] = useState(0);
    // const [adminConfig] = useState([
    //     ['AddressForm'],
    //     ['AboutForm', 'BirthdatePicker'],
    // ]);
    const [adminConfig, setAdminConfig] = useState([
        ['AddressForm'],

        ['AboutForm', 'BirthdatePicker'],
        ['AddressForm'],
    ]);

    const [completeComponents, setCompleteComponents] = useState([]);

    const updateCompleteComponents = (componentName) => {
        if (!completeComponents.includes(componentName)) {
            setCompleteComponents((prev) => [...prev, componentName]);
        }
    };

    const getProgress = () => {
        const stepComponents = adminConfig[currentStep] || [];
        const completedInStep = stepComponents.filter((component) =>
            completeComponents.includes(component)
        ).length;
        return {
            totalComponents: stepComponents.length,
            completedComponents: completedInStep,
        };
    };

    const getAllUsers = async () => {
        try {
            const response = await getUsers();
            console.log('[ContextProvider] Fetched users response:', response.data.Items);
            if (Array.isArray(response.data.Items)) {
                setUserData(response.data.Items);
            }
        } catch (error) {
            console.error('[ContextProvider] Error fetching users:', error);
        }
    };

    const addUser = async (user) => {
        try {
            const response = await createUser(user);
            const createdUser = response.data;
            console.log('[ContextProvider] Created user:', createdUser);

            setCurrentUser(createdUser);
            setUserData((prev) => [...prev, createdUser]);

            return createdUser;
        } catch (error) {
            console.error('[ContextProvider] Error adding user:', error);
            throw error;
        }
    };

    const editUser = async (id, updates) => {
        console.log('[ContextProvider] Editing user with ID:', id, ' Updates:', updates);

        try {
            if (id !== currentUser.id) {
                throw new Error('[ContextProvider] Mismatched user ID. Unable to edit.');
            }

            await updateUser(id, updates);

            setCurrentUser((prev) => {
                const updatedUser = { ...prev, ...updates };
                console.log('[ContextProvider] Updated currentUser:', updatedUser);
                return updatedUser;
            });

            setUserData((prev) => {
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

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                currentUser,
                setCurrentUser,
                currentStep,
                setCurrentStep,
                adminConfig,
                setAdminConfig,
                completeComponents,
                setCompleteComponents,
                updateCompleteComponents,
                getProgress,
                getAllUsers,
                addUser,
                editUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;





