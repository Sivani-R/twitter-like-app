const express = require('express');
const router = express.Router();
const { getUserTimeline } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/:userId/timeline', authMiddleware, getUserTimeline);

