const Notify = require('../../models/Notify');

exports.createNotify = async (req, res) => {
  try {
    const newNotify = await new Notify(req.body).save();
    res.json(newNotify);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllSavedPosts = async (req, res) => {
  try {
    const savedPosts = await User.findById(req.user.id)
      .select('savedPosts')
      .populate('savedPosts.post', 'text images videos background')
      .populate('savedPosts.postBy', 'first_name last_name picture username')
      .lean();

    res.json(savedPosts.savedPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOneSavedPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate('user', 'first_name last_name username picture')
      .populate('comments.commentBy', 'first_name last_name username picture');
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
