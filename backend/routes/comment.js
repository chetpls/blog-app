const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentController = require("../controllers/commentController");

// create a comment on a post
router.post("/:id", auth, commentController.createComment);

// get the comments of a post
router.get("/:id", commentController.getCommentsById);

module.exports = router;