// controllers/postController.js
const Post = require('../models/post');

const createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.userId,
      published: req.body.published || false,
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Post deleted' });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createPost, editPost, deletePost };
