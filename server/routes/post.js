const express = require('express');
const router = express.Router();

const { authUser } = require('../middlewares/auth');
const {
  createPost,
  getAllPosts,
  comment,
  savePost,
  deletePost,
  getAllSavedPosts,
  getOneSavedPost,
} = require('.././controllers/user/Post');
const {
  createNotify,
  getAllNotify,
  updateStatusNotify,
} = require('../controllers/user/Notify');

router.post('/createPost', authUser, createPost);

router.get('/getAllPosts', authUser, getAllPosts);
router.get('/getAllSavedPosts', authUser, getAllSavedPosts);
router.get('/getOneSavedPost/:postId', authUser, getOneSavedPost);

router.put('/comment', authUser, comment);
router.put('/savePost/:id', authUser, savePost);

router.delete('/deletePost/:id', authUser, deletePost);

// thong bao
router.post('/createNotify', authUser, createNotify);
router.get('/getAllNotify', authUser, getAllNotify);
router.put('/updateStatusNotify', authUser, updateStatusNotify);
module.exports = router;
