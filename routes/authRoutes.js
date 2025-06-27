const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// /auth/me - Get current user from JWT (Authorization: Bearer <token>)
router.get('/me', authController.me);

// /auth/logout - For stateless JWT, just respond OK (client should remove token)
router.post('/logout',authController.logout);
router.post('/google', authController.googleAuth);

module.exports = router;
