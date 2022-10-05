const mongoose = require('mongoose');
const Notify = require('../../models/Notify');

exports.createNotify = async (req, res) => {
  const senderId = req.user.id;
  const { postId, recieverId, notify, react } = req.body;

  try {
    const check = await Notify.findOne({
      postRef: mongoose.Types.ObjectId(postId),
    });

    if (check == null) {
      await Notify({
        recieverId,
        postRef: postId,
        senderId,
        notify,
        react,
      }).save();
    } else {
      if (check.senderId.toString() !== senderId) {
        await Notify.findByIdAndUpdate(
          check._id,
          {
            senderId,
          },
          {
            new: true,
          }
        );
      } else {
        if (check.react !== react) {
          await Notify.findByIdAndUpdate(
            check._id,
            {
              react,
            },
            {
              new: true,
            }
          );
        } else {
          await Notify.findByIdAndRemove(check._id);
        }
      }
    }
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllNotify = async (req, res) => {
  try {
    const allNotify = await Notify.find({
      recieverId: mongoose.Types.ObjectId(req.user.id),
    }).populate('senderId', 'first_name last_name username picture');
    console.log(allNotify);
    res.status(200).json(allNotify);
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
