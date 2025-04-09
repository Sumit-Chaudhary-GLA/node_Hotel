const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Starter', 'Main Course', 'Dessert', 'Beverage'],
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;



