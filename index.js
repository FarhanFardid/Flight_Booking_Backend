const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

//----------- Middlewares -------------
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Flight Booking Server is Running");
});

app.listen(port, () => {
  console.log(`Flight Booking server is running on Port: ${port}`);
});
