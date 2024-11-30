const express = require("express");
const { getFlights, addFlight } = require("../controllers/flightController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all flights (public route)
router.get("/", getFlights);

// Add a new flight (protected route, admin only)
router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  addFlight
);

module.exports = router;
