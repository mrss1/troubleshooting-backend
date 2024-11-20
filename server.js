// server.js
const express = require('express');
const knex = require('knex');
require('dotenv').config();

// Initialize Express App
const app = express();
const db = knex(require('./knexfile'));  // Load knex config

app.use(express.json()); // Middleware for JSON

// Test the database connection
db.raw('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL', err));

// Routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await db('troubleshooting_data').select('*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new troubleshooting data
app.post('/api/data', async (req, res) => {
  const { failure_point, symptom, cause, corrective_steps, notes } = req.body;
  try {
    const [newData] = await db('troubleshooting_data').insert({
      failure_point,
      symptom,
      cause,
      corrective_steps,
      notes,
    }).returning('*'); // Return inserted row
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
