const express = require('express');
const Assignment = require('../models/Assignment');
const User = require('../models/User');
const router = express.Router();

// Upload assignment
router.post('/upload', async (req, res) => {
    const { userId, task, admin } = req.body; // 'admin' now refers to admin name
    try {
        // Find the admin by name instead of ID
        const adminDoc = await Admin.findOne({ name: admin });
        
        if (!adminDoc) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const assignment = new Assignment({
            userId,
            task,
            adminId,// Assign the admin's ID here
        });
        
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading assignment' });
    }
});



// Fetch all admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await User.find({ role: 'Admin' }).select('name');
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admins' });
    }
});

module.exports = router;
