const mongoose = require('mongoose');

const textInputSchema = new mongoose.Schema({
    text: String,
    animationConfig: Object,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TextInput', textInputSchema);
