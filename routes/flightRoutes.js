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

// -------------------- Get specific flight details Route ------------------------
router.get("/:id", getFlightById);

// ----------------------- Get flights on criteria Route -------------------------
router.get("/search", searchFlights);

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

// ---------------------- Put flight details Route ---------------------
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

// -------------------- Delete flight Route --------------------
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

module.exports = router;
