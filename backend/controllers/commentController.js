const Comment = require('../models/comment');

const createComment = async (req, res) => {
    const {id} = req.params;
    try {
        const comment =new Comment({
            content: req.body.content,
            author: req.user.userId,
            post: id,
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({message: 'Error creating comment', error: error.toString()});
    }

};

const getCommentsById = async(req, res) =>{
    const {id} = req.params;
    try {
        const comments = await Comment.find({post:id}).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving comments', error: error.toString()});
    }
};

module.exports = {
    createComment, getCommentsById
};