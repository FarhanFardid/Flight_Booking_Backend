const express = require("express");
const {
  getFlights,
  getFlightById,
  addFlight,
  updateFlight,
  deleteFlight,
  searchFlights,
} = require("../controllers/flightController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ----------------------- Get all flights Route -------------------------
router.get("/", getFlights);

// -------------------- Get specific flight info Route ------------------------
router.get("/:id", getFlightById);

// ------------------------ Post new flight Route ----------------------
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

// ---------------------- Update flight details Route ---------------------
router.put(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  updateFlight
);

// -------------------- Flight delete Route --------------------
router.delete(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  deleteFlight
);

// ----------------------- Flights search Route -------------------------
router.get("/search", searchFlights);

module.exports = router;
