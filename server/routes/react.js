const express = require('express');
const router = express.Router();

const { authUser } = require('../middleware/auth');
const { reactPost, getReacts } = require('.././controllers/user/Reacts');

router.put('/reactPost', authUser, reactPost);
router.get('/getReacts/:id', authUser, getReacts);

module.exports = router;
