const express = require('express');
const router = express.Router();
const {register,login,getMe} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

// post /api/auth/register
router.post('/register',register);

// post /api/auth/login
router.post('/login',login);

//GET /api/auth/me
router.get('/me',protect,getMe);

module.exports = router;