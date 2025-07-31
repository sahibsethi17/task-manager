const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Creating task
router.post('/', async (req, res) => {
    try {
        console.log('Received POST request:', req.body); // 👈 Add this
        const task = await Task.create(req.body);
        console.log('Created task:', task); // 👈 And this
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err.message); // 👈 And this
        res.status(400).json({ error: err.message });
    }
});

// Reading all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Reading a task by ID
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task ? res.json(task) : res.status(404).json({ error: 'Not found' });
});

// Updating a task by ID
router.put('/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.json(updated) : res.status(404).json({ error: 'Not found' });
});

// Deleting a task by ID
router.delete('/:id', async (req, res) => {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    deleted ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
});

module.exports = router;