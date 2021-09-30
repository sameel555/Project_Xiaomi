const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
    Mobile: { type: Number, required: true, unique:true },
    Email: { type: String, required: true},
    Password: { type: String, required: true },
    holding_product: [],
    holding_product_cnt: [],
    oreder_history: []
}, { versionKey: false, timestamps: true })

const Signup = mongoose.model('signup', signupSchema);

module.exports = Signup;