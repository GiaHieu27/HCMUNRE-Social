const express = require('express');
const router = express.Router();

const { authUser } = require('../middlewares/auth');
const register = require('../controllers/admin/Register');
const login = require('../controllers/admin/Login');
const {
  countAccess,
  getTotalAnalyze,
  getOneUser,
  browseArticles,
} = require('../controllers/admin/Analyzes');

router.post('/admin/register', register);
router.post('/admin/login', login);
router.post('/admin/countAccess', authUser, countAccess);

router.get('/admin/getTotalAnalyze', authUser, getTotalAnalyze);
router.get('/admin/getOneUser/:id', authUser, getOneUser);

router.put('/admin/browseArticles/:id', authUser, browseArticles);

module.exports = router;
