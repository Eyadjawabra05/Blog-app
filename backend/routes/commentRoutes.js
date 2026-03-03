const express = require('express');
const router = express.Router({mergeParams:true});
const protect = require('../middleware/authMiddleware');
const {createComment,getComments,deleteComment} = require('../controllers/commentController');

router.post('/',protect,createComment);
router.get('/',getComments);
router.delete('/:id',protect,deleteComment);

module.exports = router;