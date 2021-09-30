const mongoose = require('mongoose');

const priceSchema = mongoose.Schema({
    TotalMRP: { type: Number, required: true },
    SavingsMRP: { type: Number, required: true },
    Subtotal: { type: Number, required: true },
    OrderTotal: { type: Number, required: true },
    YouSave: { type: Number, required: true },
    count: { type: Number, required: true }
}, { versionKey: false, timestamps: true })

const Price = mongoose.model('price', priceSchema);

module.exports = Price;