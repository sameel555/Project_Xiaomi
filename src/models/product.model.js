const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    category: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: false },
}, { versionKey: false, timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = Product;