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

// --------------------- Create new booking Routes---------------------
router.post("/", createBooking);

// ---------------- Retrieve all bookings of specific user  Route--------------------
router.get("/user/:id", getUserBookings);

// ----------------------- Retrieve all bookings Route -----------------------
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

// ------------------------ Delete a booking Route -----------------------
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
