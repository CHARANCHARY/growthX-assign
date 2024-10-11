import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            const name = localStorage.getItem('userId'); // Replace with admin ID
            console.log('Admin ID from localStorage:', name);
            const res = await axios.get(`http://localhost:5000/api/admin/assignments?name=${name}`);
            setAssignments(res.data);
            // console.log('Assignments fetched:', res.data);
        };
        fetchAssignments();
    }, []);

    const handleAccept = async (id) => {
        await axios.post(`http://localhost:5000/api/admin/assignments/${id}/accept`);
        setAssignments(assignments.filter((assignment) => assignment._id !== id));
    };

    const handleReject = async (id) => {
        await axios.post(`http://localhost:5000/api/admin/assignments/${id}/reject`);
        setAssignments(assignments.filter((assignment) => assignment._id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            {assignments.map((assignment) => (
                <div key={assignment._id} className="bg-white p-4 mb-4 shadow-lg rounded">
                    <h3 className="text-xl font-semibold">{assignment.userId.name}</h3>
                    <p className="text-gray-600">{assignment.task}</p>
                    <div className="mt-4">
                        <button
                            onClick={() => handleAccept(assignment._id)}
                            className="mr-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleReject(assignment._id)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;
