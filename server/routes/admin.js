const express = require('express');
const router = express.Router();

const { authUser } = require('../middleware/auth');
const register = require('../controllers/admin/Register');
const login = require('../controllers/admin/Login');
const {
  countAccess,
  getTotalAnalyze,
  getOneUser,
  browseArticles,
  lockAccount,
  getOnePost,
} = require('../controllers/admin/Analyzes');

router.post('/admin/register', register);
router.post('/admin/login', login);
router.post('/admin/countAccess', authUser, countAccess);

router.get('/admin/getTotalAnalyze', authUser, getTotalAnalyze);
router.get('/admin/getOneUser/:id', authUser, getOneUser);
router.get('/admin/getOnePost/:id', authUser, getOnePost);

router.put('/admin/browseArticles/:id', authUser, browseArticles);
router.put('/admin/lockAccount/:id', authUser, lockAccount);

module.exports = router;
