const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: 'General',
    },
    image: {
        type: String,
        required: true,
        default: '/uploads/default.png', // Default image path
    },
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;