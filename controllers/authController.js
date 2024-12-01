const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// -------------------Get a specific user by Id ------------------------
const getUserById = async (req, res) => {
  try {
    // console.log("Specific User Get Api Hit");
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ------------------------ Update User details -----------------------
const updateUserById = async (req, res) => {
  try {
    console.log("User Update Api Hit");
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// ------------------------ User Registration ----------------------
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log("Register Api Hit");
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // ------------------------- Password hashing using bcrypt ------------------------
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    console.log("New user registered");
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ----------------------------- User Login ----------------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Api Hit");
    // console.log(req.body);
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // ------------------  Create and send jwt -----------------
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, loginUser, getUserById, updateUserById };
