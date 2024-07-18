// controllers/postController.js
const Post = require('../models/post');

const createPost = async (req, res) => {
  const { title, content, published, category, readingTime } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author: req.user.userId,
      published,
      category,
      readingTime,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published, category, readingTime } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, { title, content, published, category, readingTime }, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if(!post) {
      return res.status(404).json({message: 'Post not found'});
    }
    res.status(200).send({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).send({message: 'Error deleting post',error});
  }
};

const getAllPosts = async (req,res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({message:'Error fetching posts', error});
  }
};

const getPostById = async(req, res) => {
  const {id} = req.params;
  try{
    const post = await Post.findById(id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({message:'Error fetching post', error});
  }
};

const getAllPublishedPosts = async (req, res) => {
  try {
    const publishedPosts = await Post.find({ published: true }).populate('author', 'username');
    res.status(200).json(publishedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};


const getPublishedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true }).populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching published posts', error });
  }
};





module.exports = { createPost, editPost, deletePost, getAllPosts, getPostById, getAllPublishedPosts, getPublishedPosts };
