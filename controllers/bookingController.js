const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const User = require("../models/User");

// ----------------- Create new booking - ------------------
const createBooking = async (req, res) => {
  try {
    console.log("Create Booking API Hit");
    const { userId, flightId, numberOfSeats, totalPrice, bookingStatus } =
      req.body;

    // Verify the user and flight exist
    const userExists = await User.findById(userId);
    const flightExists = await Flight.findById(flightId);

    if (!userExists) return res.status(404).json({ message: "User not found" });
    if (!flightExists)
      return res.status(404).json({ message: "Flight not found" });

    // Create and save the new booking
    const newBooking = new Booking({
      userId,
      flightId,
      numberOfSeats,
      totalPrice,
      bookingStatus,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ---------------- Retrieve all bookings for  specific user -----------------
const getUserBookings = async (req, res) => {
  try {
    console.log("Get User Bookings API Hit");
    const { id } = req.params;

    const bookings = await Booking.find({ userId: id }).populate("flightId");
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// -------------------- Retrieve all bookings -------------------------
const getAllBookings = async (req, res) => {
  try {
    console.log("Get All Bookings API Hit");

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const bookings = await Booking.find().populate("userId flightId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ---------------------- Update a booking ------------------------
const updateBooking = async (req, res) => {
  try {
    console.log("Update Booking API Hit");

    // Ensure only admins can access this endpoint
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ----------------------- Delete a booking -------------------
const deleteBooking = async (req, res) => {
  try {
    console.log("Delete Booking API Hit");

    // Ensure only admins can access this endpoint
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
