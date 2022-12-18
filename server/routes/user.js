const express = require('express');
const router = express.Router();

const { authUser } = require('../middleware/auth');

const {
  findUser,
  senResetPasswordCode,
  validateResetPassword,
  changePassword,
} = require('../controllers/user/ResetPassword');
const register = require('../controllers/user/Register');
const login = require('../controllers/user/Login');
const {
  getProfile,
  updateProfilePicture,
  updateCover,
  updateDetails,
} = require('../controllers/user/Profile');
const {
  activeAccount,
  sendVerification,
} = require('../controllers/user/Activate');

router.post('/register', register);
router.post('/login', login);
router.post('/activate', authUser, activeAccount);
router.post('/findUser', findUser);
router.post('/sendVerification', authUser, sendVerification);
router.post('/sendResetPasswordCode', senResetPasswordCode);
router.post('/validateResetPassword', validateResetPassword);
router.post('/changePassword', changePassword);

router.put('/updateProfilePicture', authUser, updateProfilePicture);
router.put('/updateCover', authUser, updateCover);
router.put('/updateDetails', authUser, updateDetails);

router.get('/getProfile/:username', authUser, getProfile);

module.exports = router;
