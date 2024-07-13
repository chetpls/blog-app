const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

router.post('/create', auth, postController.createPost);
router.put('/edit/:id', auth, postController.editPost);
router.delete('/delete/:id', auth, postController.deletePost);

module.exports = router;
