const express = require("express");
const router = express.Router();
const { register, verifyCode, login } = require("../controllers/authController");

// Register
router.post("/register", register);

// Verify code
router.post("/verify", verifyCode);

// Login
router.post("/login", login);

module.exports = router;
