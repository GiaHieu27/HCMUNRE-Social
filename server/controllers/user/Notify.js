const mongoose = require('mongoose');
const Notify = require('../../models/Notify');

exports.createNotify = async (req, res) => {
  const senderId = req.user.id;
  const { postId, recieverId, notify, react } = req.body;
  let newNotify;
  try {
    const check = await Notify.findOne({
      postRef: mongoose.Types.ObjectId(postId),
    });

    if (check == null) {
      newNotify = await Notify({
        recieverId,
        postRef: postId,
        senderId,
        notify,
        react,
      }).save();
      await newNotify.populate(
        'senderId',
        'first_name last_name username picture'
      );
    } else {
      if (check.senderId.toString() !== senderId) {
        newNotify = await Notify.findByIdAndUpdate(
          check._id,
          {
            senderId,
          },
          {
            new: true,
          }
        ).populate('senderId', 'first_name last_name username picture');
      } else {
        if (check.react !== react) {
          newNotify = await Notify.findByIdAndUpdate(
            check._id,
            {
              react,
            },
            {
              new: true,
            }
          ).populate('senderId', 'first_name last_name username picture');
        } else {
          await Notify.findByIdAndRemove(check._id);
        }
      }
    }
    res.status(200).json(newNotify);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllNotify = async (req, res) => {
  try {
    const allNotify = await Notify.find({
      recieverId: mongoose.Types.ObjectId(req.user.id),
    })
      .populate('senderId', 'first_name last_name username picture')
      .sort({
        createdAt: -1,
      });
    console.log(allNotify);
    res.status(200).json(allNotify);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateStatusNotify = async (req, res) => {
  try {
    const { status, id } = req.body;
    await Notify.updateMany(
      { recieverId: mongoose.Types.ObjectId(id) },
      {
        status,
      }
    );
    res.status(200).json({ status: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
