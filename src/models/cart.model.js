const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    category: { type: String, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceWithDis: { type: Number, required: true },
    count: { type: Number, required: true }
}, { versionKey: false, timestamps: true })

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;