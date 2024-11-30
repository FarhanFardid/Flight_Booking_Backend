const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const router = express.Router();
require("dotenv").config();

const app = express();

//----------- Middlewares -------------
const cors = require("cors");
app.use(cors());
app.use(express.json());

//-------------- MongoDb connection string from .env ----------------------
const mongoURI = process.env.MONGO_URI;

//------------------- Schema Models -------------------------------
const User = require("./models/User");
const Flight = require("./models/Flight");
const Booking = require("./models/Booking");

// ----------------- Routes Import -----------------
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");

// ----------------------- Connection to MongoDB using Mongoose -----------------------
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// --------------------- APIs --------------------

// ----------------------- Authentication Related  APIs -----------------------
app.use("/api/auth", authRoutes);

// ----------------------- Flights Related APIs ------------------------
app.use("/api/flights", flightRoutes);

app.get("/", (req, res) => {
  res.send("Flight Booking Server is Running");
});

app.listen(port, () => {
  console.log(`Flight Booking server is running on Port: ${port}`);
});
