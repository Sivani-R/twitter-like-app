const Tweet = require('../models/Tweet');

exports.getUserTimeline = async (req, res) => {
  try {
    const tweets = await Tweet.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(tweets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
