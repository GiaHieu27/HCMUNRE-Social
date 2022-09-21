const Messenger = require('../../models/Messenger');

exports.messageSend = async (req, res) => {
  try {
    const { dataMessage } = req.body;
    const senderId = req.user.id;
    const messageInsert = await new Messenger({
      senderId,
      senderName: dataMessage.senderName,
      receiverId: dataMessage.receiverId,
      message: {
        text: dataMessage.message,
      },
    }).save();

    res.json(messageInsert);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    let getAllMessages = await Messenger.find({
      $or: [
        {
          $and: [
            {
              senderId: {
                $eq: userId,
              },
            },
            {
              receiverId: {
                $eq: id,
              },
            },
          ],
        },
        {
          $and: [
            {
              senderId: {
                $eq: id,
              },
            },
            {
              receiverId: {
                $eq: userId,
              },
            },
          ],
        },
      ],
    });

    // getAllMessages = getAllMessages.filter(
    //   (m) =>
    //     (m.senderId === id && m.receiverId === userId) ||
    //     (m.receiverId === id && m.senderId === userId)
    // );

    res.json(getAllMessages);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.messageSendImage = async (req, res) => {
  try {
    const { sender, receiverId, img } = req.body;
    const senderId = req.user.id;
    const messageInser = await new Messenger({
      senderId,
      senderName: sender,
      receiverId: receiverId,
      message: {
        image: img,
      },
    }).save();

    res.json(messageInser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.seenMessage = async (req, res) => {
  try {
    const messageId = req.body.msg._id;
    console.log(req.body.msg);

    await Messenger.findByIdAndUpdate(messageId, {
      status: 'seen',
    });

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.delivaredMessage = async (req, res) => {
  try {
    const messageId = req.body.msg._id;

    await Messenger.findByIdAndUpdate(messageId, {
      status: 'delivared',
    });

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
