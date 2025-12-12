// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    // Las especificaciones las guardaremos como un Array de objetos flexible
    specs: [{
        label: String,
        value: String
    }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);