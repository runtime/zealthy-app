// context/api.js
import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({

    //todo in lieu of env vars i will be deleting this public api in 5 days.
    baseURL: 'https://sr6oj50p5m.execute-api.us-east-1.amazonaws.com/prod', // Replace with your actual API Gateway URL
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});



// Example: Add a request interceptor (optional)
apiClient.interceptors.request.use(
    (config) => {
        // Modify the request config if needed (e.g., add auth tokens)
        //console.log('Request sent with config:', config);
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Example: Add a response interceptor (optional)
apiClient.interceptors.response.use(
    (response) => {
        // Process the response data
        return response;
    },
    (error) => {
        // Handle response errors
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export const createUser = async (userData) => {
    return apiClient.post('/users', userData);
};

export const updateUser = async (id, updateData) => {
    console.log('[API] Updating user with ID:', id);
    console.log('[API] Update data:', updateData);
    return apiClient.put(`/users/${id}`, updateData);
};


export const getUsers = async () => {
    return apiClient.get('/users');
};

export default apiClient;
