const express = require('express');
const {
  messageSend,
  getMessage,
  messageSendImage,
  seenMessage,
  delivaredMessage,
} = require('../controllers/user/Messenger');
const { authUser } = require('../middlewares/auth');

const router = express.Router();
router.post('/messageSend', authUser, messageSend);
router.post('/messageSendImage', authUser, messageSendImage);
router.post('/seen-message', authUser, seenMessage);
router.post('/delivared-message', authUser, delivaredMessage);
router.get('/getMessage/:id', authUser, getMessage);

module.exports = router;
