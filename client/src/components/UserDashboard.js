import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [task, setTask] = useState('');
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState('');

    useEffect(() => {
        // Fetch all admins for assignment selection
        const fetchAdmins = async () => {
            const res = await axios.get('http://localhost:5000/api/user/admins');
            setAdmins(res.data);
        };
        fetchAdmins();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Get userId from local storage (or replace with auth context if available)
            const userId = localStorage.getItem('userId'); // Adjust this if you use a context or different auth method
            console.log('Form Data:', { userId, task, admin: selectedAdmin });
            // Prepare the assignment object
            const assignment = {
                userId: userId, // Assuming userId is stored in local storage
                task: task,
                admin: selectedAdmin,
            };

            // Send the assignment to the backend
            await axios.post('http://localhost:5000/api/user/upload', { userId, task, admin: selectedAdmin });
            setTask(''); // Reset the task input
            setSelectedAdmin(''); // Reset selected admin
            alert('Assignment uploaded successfully');
        } catch (error) {
            console.error('Error uploading assignment:', error);
            alert('Failed to upload assignment. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold mb-6">User Dashboard</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <div className="mb-4">
                    <textarea
                        placeholder="Write your task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                        required // Make textarea required
                    />
                </div>
                <div className="mb-4">
                    <select
                        value={selectedAdmin}
                        onChange={(e) => setSelectedAdmin(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded"
                        required // Make selection required
                    >
                        <option value="">Select Admin</option>
                        {admins.map((admin) => (
                            <option key={admin._id} value={admin.name}>
                                {admin.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
                >
                    Upload Assignment
                </button>
            </form>
        </div>
    );
};

export default UserDashboard;


























































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserDashboard = () => {
//     const [task, setTask] = useState('');
//     const [admins, setAdmins] = useState([]);
//     const [selectedAdmin, setSelectedAdmin] = useState('');

//     useEffect(() => {
//         // Fetch all admins for assignment selection
//         const fetchAdmins = async () => {
//             const res = await axios.get('http://localhost:5000/api/user/admins');
//             setAdmins(res.data);
//         };
//         fetchAdmins();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const userId = localStorage.getItem('userId'); // Replace with proper user ID from localStorage or auth context
//             await axios.post('http://localhost:5000/api/user/upload', { userId, task, admin: selectedAdmin });
//             setTask('');
//             alert('Assignment uploaded successfully');
//         } catch (error) {
//             console.error('Error uploading assignment:', error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h2 className="text-3xl font-bold mb-6">User Dashboard</h2>
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
//                 <div className="mb-4">
//                     <textarea
//                         placeholder="Write your task..."
//                         value={task}
//                         onChange={(e) => setTask(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <select
//                         value={selectedAdmin}
//                         onChange={(e) => setSelectedAdmin(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded"
//                     >
//                         <option value="">Select Admin</option>
//                         {admins.map((admin) => (
//                             <option key={admin._id} value={admin.name}>
//                                 {admin.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
//                 >
//                     Upload Assignment
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UserDashboard;
