const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {createPost,getAllPosts,getPostById,updatePost,deletePost,likePost} = require('../controllers/postController');

// posts /api/posts
router.post('/',protect,createPost);
router.get('/:id',getPostById);
router.get('/',getAllPosts);
router.delete('/:id',protect,deletePost);
router.put('/:id',protect,updatePost);
router.put('/:id/like',protect,likePost);



module.exports = router;