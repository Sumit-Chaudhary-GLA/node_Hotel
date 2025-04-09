const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const items = await Menu.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Menu.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add new menu item
router.post('/', async (req, res) => {
    try {
        const newItem = new Menu(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update menu item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete menu item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully', deletedItem });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//comment added succesfully
module.exports = router;