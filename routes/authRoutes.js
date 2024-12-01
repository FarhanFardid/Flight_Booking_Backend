const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
} = require("../controllers/authController");

const router = express.Router();

// ---------------- Registration  Route --------------------
router.post("/register", registerUser);

// ----------------  Login Route -------------------
router.post("/login", loginUser);

// -------------- Specific User Get Route ---------------
router.get("/user/:id", getUserById);

module.exports = router;
