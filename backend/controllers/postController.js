const Post = require('../models/post');
const { cloudinary } = require('../config/cloudinary');

const createPost = async (req, res) => {
  try {
    console.log('Received request to create post');
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const coverImage = req.file ? req.file.path : null;

    console.log('Creating new Post...');
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.userId,
      published: req.body.published === 'true',
      category: req.body.category,
      readingTime: req.body.readingTime,
      coverImage: coverImage,
    });

    console.log('Saving post...');
    await post.save();
    console.log('Post saved successfully');

    res.status(201).json(post);
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).json({ message: 'Error creating post', error: error.toString(), stack: error.stack });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published, category, readingTime } = req.body;
  try {
    let coverImage = req.body.coverImage;
    if (req.file) {
      coverImage = req.file.path;
    }
    const post = await Post.findByIdAndUpdate(id, { title, content, published, category, readingTime, coverImage }, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.toString() });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.coverImage) {
      const publicId = post.coverImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await post.remove();
    res.status(200).send({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting post', error: error.toString() });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({message:'Error fetching posts', error: error.toString()});
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
    res.status(500).json({message:'Error fetching post', error: error.toString()});
  }
};

const getAllPublishedPosts = async (req, res) => {
  try {
    const publishedPosts = await Post.find({ published: true }).populate('author', 'username');
    res.status(200).json(publishedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.toString() });
  }
};

module.exports = { createPost, editPost, deletePost, getAllPosts, getPostById, getAllPublishedPosts };