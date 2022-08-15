const express = require("express");
const router = express.Router();

const register = require("../controllers/admin/Register");

router.post("/admin/register", register);

module.exports = router;
