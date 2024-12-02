import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const ShowUsers = () => {
    const { userData, setUserData } = useContext(AppContext);
    const navigate = useNavigate();

    //console.log('[ShowUsers], userData: ', userData)

    let content = 'loading....'

    useEffect(() => {
        if (userData.length === 0) {
            //console.log('[ShowUsers] userData is undefined or null');

        }
        const fetchUsers = async () => {
            try {
                //todo update to utilize the api
                const response = await fetch('https://sr6oj50p5m.execute-api.us-east-1.amazonaws.com/prod/users'); // Adjust endpoint as needed
                const rawData = await response.json(); // Parse initial response
                //console.log('[ShowUsers] Fetched raw data:', rawData);

                // Parse the `body` if it's a string
                const parsedBody = rawData.body ? JSON.parse(rawData.body) : rawData;
                //console.log('[ShowUsers] Parsed body:', parsedBody);

                // Check if `Items` exists and is an array
                if (parsedBody && Array.isArray(parsedBody.Items)) {
                    //console.log('[ShowUsers] Items:', parsedBody.Items);
                    setUserData(parsedBody.Items);
                } else {
                    //console.warn('[ShowUsers] Unexpected data format:', parsedBody);
                    setUserData([]); // Set empty array if data is invalid
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [setUserData]);

    const handleAdminClick = () => {
        //navigate('/admin');
        window.location.reload('/');
    }


    return (
        <div>
            <h2>All Users</h2>
            <p>Click the button below to restart the app. This will clear the current User.</p>
            <button onClick={handleAdminClick}>
                RESTART APP
            </button>
            {userData.length === 0 ? (
                <p>No users found.</p>
            ) : (

                <table>
                    <thead>
                    <tr>
                        <th>email</th>
                        <th>pw</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>About</th>
                        <th>Birthdate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...userData].map((user) => (
                        <tr key={user.id}>
                            {/*<td>{user.id}</td>*/}
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.street}</td>
                            <td>{user.city}</td>
                            <td>{user.usersstate}</td>
                            <td>{user.zip}</td>
                            <td>{user.about}</td>
                            <td>{user.birthdate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            )}

        </div>
    );
};

export default ShowUsers;
