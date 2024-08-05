const express = require('express');
const router = express.Router();
const { postTweet } = require('../controllers/tweetController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, postTweet);

module.exports = router;
