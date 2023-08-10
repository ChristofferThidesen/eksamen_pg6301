const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Manager = require("../models/manager");

// Login route

router.get("/user", (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user });
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // For simplicity, compare plain text password (not recommended for production)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user = user;
    return res.json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/manager/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the manager with the given username
    const manager = await Manager.findOne({ username });

    if (!manager) {
      return res.status(400).json({ error: "Manager not found" });
    }

    // Compare passwords
    if (manager.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If credentials are valid, create a session
    req.session.manager = manager;

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during manager login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    return res.json({ message: "Logout successful" });
  });
});

module.exports = router;
