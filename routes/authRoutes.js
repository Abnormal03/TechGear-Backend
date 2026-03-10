const express = require("express");

const router = express.Router();

const { loginUser, signupUser } = require("../controllers/authController");

//logging in a user
router.post("/login", loginUser);

//signup a user
router.post("/signup", signupUser);

module.exports = router;
