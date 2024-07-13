const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content:{type: String, requierd: true},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: {type: String, required: true},
    createdAt:{type: Date, defualt: Date.now}
})

module.exports = mongoose.model('Comment', CommentSchema);