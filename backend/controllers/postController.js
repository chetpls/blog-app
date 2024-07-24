const Post = require("../models/post");
const { cloudinary } = require("../config/cloudinary");

const createPost = async (req, res) => {
  try {
    console.log("Received request to create post");
    console.log("Request body:", req.body);
    console.log("File:", req.file);
    console.log("User:", req.user);

    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // Check if user is authenticated and is an admin
    if (!req.user || !req.user.userId || !req.user.isAdmin) {
      return res
        .status(401)
        .json({ message: "User not authenticated or not an admin" });
    }

    const coverImage = req.file ? req.file.path : null;

    console.log("Creating new Post...");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.userId,
      published: req.body.published === "true",
      category: req.body.category,
      description: req.body.description,
      readingTime: req.body.readingTime,
      coverImage: coverImage,
    });

    console.log("Saving post...");
    await post.save();
    console.log("Post saved successfully");

    res.status(201).json(post);
  } catch (error) {
    console.error("Error in createPost:", error);
    res
      .status(500)
      .json({
        message: "Error creating post",
        error: error.toString(),
        stack: error.stack,
      });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published, category, readingTime, description } =
    req.body;
  try {
    let coverImage = req.body.coverImage;
    if (req.file) {
      coverImage = req.file.path;
    }
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        published,
        category,
        readingTime,
        coverImage,
        description,
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.toString() });
  }
};

const deletePost = async (req, res) => {
  try {
    console.log("Attempting to delete post with ID:", req.params.id);
    console.log("User:", req.user); // Log the user object

    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Post found:", post);

    if (post.coverImage) {
      console.log("Attempting to delete cover image");
      const publicId = post.coverImage.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log("Cover image deleted");
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
        // Continue with post deletion even if image deletion fails
      }
    }

    console.log("Removing post from database");
    await Post.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of remove()
    console.log("Post removed successfully");

    res.status(200).send({ message: "Post deleted" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res
      .status(500)
      .json({
        message: "Error deleting post",
        error: error.toString(),
        stack: error.stack,
      });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.toString() });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", "username");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.toString() });
  }
};

const getAllPublishedPosts = async (req, res) => {
  try {
    const publishedPosts = await Post.find({ published: true }).populate(
      "author",
      "username"
    );
    res.status(200).json(publishedPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.toString() });
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAllPosts,
  getPostById,
  getAllPublishedPosts,
};
