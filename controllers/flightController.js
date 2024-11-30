const Flight = require("../models/Flight");

// ---------------- Get all flights -------------------------
const getFlights = async (req, res) => {
  try {
    console.log("Flight Get Api Hit");
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// -------------------Get a specific flight by ID ------------------------
const getFlightById = async (req, res) => {
  try {
    console.log("Specific Flight Get Api Hit");
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// ----------------------- Add  new flight ------------------------
const addFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    console.log("Flight Add API Hit");
    console.log(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    console.error("Error saving flight:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------ Update flight details -----------------------
const updateFlight = async (req, res) => {
  try {
    console.log("Flight Update Api Hit");
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ----------------------- Delete a flight -------------------
const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------ Search for flights based on criteria --------------------------
const searchFlights = async (req, res) => {
  const { origin, destination } = req.query;

  try {
    const query = {};
    if (origin) query.origin = origin;
    if (destination) query.destination = destination;
    const flights = await Flight.find(query);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getFlights,
  getFlightById,
  addFlight,
  updateFlight,
  deleteFlight,
  searchFlights,
};
