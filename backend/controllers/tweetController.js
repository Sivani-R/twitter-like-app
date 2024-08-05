const Tweet = require('../models/Tweet');

exports.postTweet = async (req, res) => {
  try {
    const tweet = new Tweet({
      userId: req.user.id,
      text: req.body.text,
    });
    await tweet.save();
    res.status(201).json(tweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
