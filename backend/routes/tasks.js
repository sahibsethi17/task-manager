const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// create task
router.post('/', async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});

// reading all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// reading task by id
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task ? res.json(task) : res.status(404).json({ error: 'Not found' });
});

// updating task by id
router.put('/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated ? res.json(updated) : res.status(404).json({ error: 'Not found' });
});

// deleting task by id
router.delete('/:id', async (req, res) => {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    deleted ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
});

module.exports = router;