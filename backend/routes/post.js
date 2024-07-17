const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const postController = require('../controllers/postController');

router.post('/create', auth, adminAuth, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/published', postController.getAllPublishedPosts);
router.get('/:id', postController.getPostById);
router.put('/:id/edit', auth, adminAuth, postController.editPost);
router.delete('/:id', auth, adminAuth, postController.deletePost);


module.exports = router;
