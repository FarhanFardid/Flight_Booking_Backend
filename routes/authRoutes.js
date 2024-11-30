const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Registration  Routes
router.post("/register", registerUser);

//  Login Routes
router.post("/login", loginUser);

module.exports = router;