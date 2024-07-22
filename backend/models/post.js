const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {type:String, required:true},
    content:{type:String, require:true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {type: String, required:true},
    readingTime: {type: String, required:true},
    description: {type: String, required:true},
    published:{type:Boolean, default: false},
    coverImage:{type: String, required: true},
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date, default: Date.now},
});

module.exports = mongoose.model('Post', PostSchema);