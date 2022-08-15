const express = require("express");
const router = express.Router();

const register = require("../controllers/admin/Register");
const login = require("../controllers/admin/Login");

router.post("/admin/register", register);
router.post("/admin/login", login);

module.exports = router;
