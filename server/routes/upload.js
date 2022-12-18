const express = require('express');
const router = express.Router();

const { authUser } = require('../middleware/auth');
const { imageUpload } = require('../middleware/imageUpload');

const { uploadImages, listImages } = require('../controllers/user/Upload');

router.post('/uploadImages', authUser, imageUpload, uploadImages);
router.post('/listImages', authUser, listImages);

module.exports = router;
