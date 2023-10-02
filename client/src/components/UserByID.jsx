import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';


function UserDetails() {

    const [user, setUser] = useState(null);
    const { id } = useParams(); // Get the user ID from the URL
    const navigate = useNavigate(); // Use navigate instead of history

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/users/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('There was an error fetching the user:', error);
            }
        }

        fetchUser();
    }, [id]);

    if (!user) {
        return <p>Loading...</p>;
    }


    const deleteUser = async () => {
        try {
            const response = await fetch(`/users/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('User deleted successfully!');
                navigate('/users'); // Use navigate to redirect
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('There was an error deleting the user:', error);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="parent-container">

<div className="user-card">
                <img
                    src={user.photo_url || "default_image_url.jpg"}
                    alt={`${user.first_name} ${user.last_name}`}
                    
                />
                <h2 >{user.first_name} {user.last_name}</h2>
                <p >Email: {user.email}</p>
                <p >Email: {user.biography}</p>
                {/* Add more user details as needed */}
            </div>
            <button onClick={deleteUser}>Delete User</button> {/* Add delete button */}


        </div>


    );
}

export default UserDetails;
