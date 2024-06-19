const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harryisagood$oy";

// Route 1: Create a User using: POST "/api/auth/createuser" no login required
router.post('/createuser', async (req, res) => {
  try {
    // Check if a user with this email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry, a user with this email already exists" });
    }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Creating a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    // Generating JWT token
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 2: Authenticate a user using: POST "/api/auth/login" no login required
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    // Generating JWT token
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken, message: "Login Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
