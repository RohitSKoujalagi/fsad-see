const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: null,
    },
    author: {
        name: String,
        id: String,
        email: String,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
