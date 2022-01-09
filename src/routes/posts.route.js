const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/posts.controller');

router.get('/', auth.checkAuth, getPosts);
router.get('/:id', auth.checkAuth, getPostById);
router.post('/', auth.checkAuth, createPost);
router.put('/:id', auth.checkAuth, updatePost);
router.delete('/:id', auth.checkAuth, deletePost);

module.exports = router;