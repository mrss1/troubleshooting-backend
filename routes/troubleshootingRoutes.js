const express = require('express');
const router = express.Router();
const db = require('../db'); // Import Knex instance

// Get all troubleshooting data
router.get('/', async (req, res) => {
    try {
        const data = await db('troubleshooting_data').select('*');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new troubleshooting data
router.post('/', async (req, res) => {
    const { failure_point, symptom, cause, corrective_steps, notes } = req.body;
    try {
        const [newData] = await db('troubleshooting_data').insert({
            failure_point,
            symptom,
            cause,
            corrective_steps,
            notes
        }).returning('*'); // returning '*' will return the inserted row

        res.status(201).json(newData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete troubleshooting data by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await db('troubleshooting_data').where('id', req.params.id).del();
        if (result) {
            res.status(200).json({ message: 'Entry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Entry not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
