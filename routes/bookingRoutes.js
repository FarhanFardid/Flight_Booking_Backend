const express = require("express");
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// --------------------- New booking create Route---------------------
router.post("/", createBooking);

// ---------------- User specific booking get Route--------------------
router.get("/user/:id", getUserBookings);

// ----------------------- All bookings get Route -----------------------
router.get(
  "/",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  },
  getAllBookings
);

// ------------------------ Booking  update Route------------------------
router.put(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  },
  updateBooking
);

// ------------------------ Booking Delete Route -----------------------
router.delete(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  },
  deleteBooking
);

module.exports = router;
