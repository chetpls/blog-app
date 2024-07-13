const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {type:String, required:true},
    content:{type:String, require:true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    published:{type:Boolean, default: false},
    createdAt:{type:Date, default: Date.now},
    updatedAt:{type:Date, default: Date.now},
});

module.exports = mongoose.model('Post', PostSchema);