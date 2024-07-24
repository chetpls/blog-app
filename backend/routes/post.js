const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const postController = require("../controllers/postController");
const { upload } = require("../config/cloudinary");

// Create a new post
router.post("/", upload.single('coverImage'), auth, adminAuth, postController.createPost);

// Get all posts (for authenticated users)
router.get("/", auth, postController.getAllPosts);

// Get all published posts (public)
router.get("/published", postController.getAllPublishedPosts);

// Get a specific post by ID
router.get("/:id", postController.getPostById);

// Update a post
router.put("/:id", upload.single("coverImage"), auth, adminAuth, postController.editPost);

// Delete a post
router.delete("/:id", auth, adminAuth, postController.deletePost);

module.exports = router;