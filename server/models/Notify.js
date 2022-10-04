const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const NotifySchema = mongoose.Schema({
  recieverId: {
    type: ObjectId,
    ref: 'User',
  },
  postRef: {
    type: ObjectId,
    ref: 'Post',
  },
  senderId: {
    type: ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: 'sent',
  },
  react: {
    type: String,
  },
  notify: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Notify', NotifySchema);
