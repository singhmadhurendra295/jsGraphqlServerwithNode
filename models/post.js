const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, },
    image: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true }
});

module.exports = mongoose.model('posts', postSchema);