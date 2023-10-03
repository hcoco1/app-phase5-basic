import React, { useState } from 'react';

function SignUp() {
    const [formData, setFormData] = useState({
        first_name: '',
        email: '',
        password: '',
        photo_url: ''  // Added this line
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.Message);
            }
            console.log("User registered:", data);
        } catch (error) {
            console.error("Error registering user:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="first_name" onChange={handleChange} placeholder="First Name" />
            <input name="email" onChange={handleChange} placeholder="Email" />
            <input name="password" type="password" onChange={handleChange} placeholder="Password" />
            <input name="photo_url" onChange={handleChange} placeholder="Photo URL" />  {/* Added this line */}
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
