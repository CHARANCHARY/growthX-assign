const express = require('express');
const Assignment = require('../models/Assignment');
const router = express.Router();

// View all assignments tagged to admin
router.get('/assignments', async (req, res) => {
    const { adminId } = req.query; // Assume adminId is passed as query param
    console.log('Admin ID received From Back ENd:', adminId); // Log the received adminId
    try {
        const assignments = await Assignment.find({ adminId }).populate('userId', 'name');
        res.json(assignments);
        
    } catch (error) {
        res.status(500).json({ error: 'Error fetching assignments' });
    
    }
});

// Accept assignment
router.post('/assignments/:id/accept', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ error: 'Error accepting assignment' });
    }
});

// Reject assignment
router.post('/assignments/:id/reject', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting assignment' });
    }
});

module.exports = router;
