import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/ContextProvider';

const ShowUsers = () => {
    const { userData, setUserData } = useContext(AppContext);

    console.log('[ShowUsers]')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://dplojg10ic.execute-api.us-east-1.amazonaws.com/prod/users'); // Adjust endpoint as needed
                const rawData = await response.json(); // Parse initial response
                console.log('[ShowUsers] Fetched raw data:', rawData);

                // Parse the `body` if it's a string
                const parsedBody = rawData.body ? JSON.parse(rawData.body) : rawData;
                console.log('[ShowUsers] Parsed body:', parsedBody);

                // Check if `Items` exists and is an array
                if (parsedBody && Array.isArray(parsedBody.Items)) {
                    console.log('[ShowUsers] Items:', parsedBody.Items);
                    setUserData(parsedBody.Items);
                } else {
                    console.warn('[ShowUsers] Unexpected data format:', parsedBody);
                    setUserData([]); // Set empty array if data is invalid
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [setUserData]);


    return (
        <div>
            <h2>All Users</h2>
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
                            <td>{user.state}</td>
                            <td>{user.zip}</td>
                            <td>{user.about}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowUsers;
