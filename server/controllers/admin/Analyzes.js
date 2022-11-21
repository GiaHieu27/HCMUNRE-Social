const User = require('../../models/User');
const Post = require('../../models/Post');
const { default: mongoose } = require('mongoose');

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
    const allUser = await User.find({}).select('-password').lean();
    const allPost = await Post.find({})
      .populate('user', 'full_name picture')
      .lean();

    allPost.map((post) => {
      post['full_name'] = post['user'].full_name;
      post['avatar'] = post['user'].picture;
      delete post.user;
      return post;
    });

    const totalUser = allUser.length;
    const totalAccess = allUser.reduce((accum, current) => {
      return accum + current.accesses;
    }, 0);

    const totalPost = allPost.length;
    const postHasNotBeenApproved = allPost.filter((item) => {
      return item.approve === false;
    });
    const totalPostHasNotBeenApproved = postHasNotBeenApproved.length;

    return res.status(200).json({
      totalAccess,
      totalUser,
      totalPost,
      postHasNotBeenApproved,
      totalPostHasNotBeenApproved,
      allPost,
      allUser,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    const post = await Post.find({ user: mongoose.Types.ObjectId(id) });
    return res.status(200).json({ user, post });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.browseArticles = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName } = req.body;

    await Post.findByIdAndUpdate(
      id,
      { approve: true, censor: fullName },
      { new: true }
    );
    const posts = await Post.find({ approve: false }).lean();

    posts.map((post) => {
      post['id'] = post['_id'];
      return post;
    });

    return res.status(200).json({ posts });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.lockAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    let allUser;

    if (user) {
      if (user.isLock) {
        await User.findByIdAndUpdate(id, { isLock: false }, { new: true });
        allUser = await User.find({});
      } else {
        await User.findByIdAndUpdate(id, { isLock: true }, { new: true });
        allUser = await User.find({});
      }
    }

    return res.status(200).json({ allUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
