const express = require("express");
const router = express.Router();

const { authUser } = require("../middlewares/auth");
const {
  createPost,
  getAllPosts,
  comment,
  savePost,
  deletePost,
  getSavedPosts,
} = require(".././controllers/user/Post");

router.post("/createPost", authUser, createPost);

router.get("/getAllPosts", authUser, getAllPosts);
router.get("/getSavedPosts", authUser, getSavedPosts);

router.put("/comment", authUser, comment);
router.put("/savePost/:id", authUser, savePost);

router.delete("/deletePost/:id", authUser, deletePost);

module.exports = router;
