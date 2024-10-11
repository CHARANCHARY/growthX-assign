// src/components/Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); // Default role is 'user'
    const [success, setSuccess] = useState(false); // State to control success message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/'); // Navigate to login after 2 seconds
            }, 2000); // Display success message for 2 seconds
            console.log( "User ID for frontend",response.data.userId);
            localStorage.setItem('userId', name);
        } catch (error) {
            console.error('Registration error:', error);
            alert(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            {/* Success Message Popup */}
            {success && (
                <div className="absolute top-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-md">
                    Registration successful! Please log in.
                </div>
            )}
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
