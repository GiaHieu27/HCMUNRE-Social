const User = require('../../models/User');
const Post = require('../../models/Post');

exports.countAccess = async (req, res) => {
  try {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, {
      $inc: { accesses: 1 },
    });
    return res.status(200);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getTotalAnalyze = async (req, res) => {
  try {
    const allUser = await User.find({});
    const allPost = await Post.find({});

    const totalUser = allUser.length;
    const totalAccess = allUser.reduce((accum, current) => {
      return accum + current.accesses;
    }, 0);

    const totalPost = allPost.length;
    const postHasNotBeenApproved = allPost.filter((item) => {
      return item.approve === false;
    }).length;

    return res
      .status(200)
      .json({ totalAccess, totalUser, totalPost, postHasNotBeenApproved });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
