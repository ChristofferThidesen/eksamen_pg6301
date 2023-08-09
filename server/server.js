const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGODB_URI = "mongodb://127.0.0.1:27017/eksamen_pg6301";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const activitySchema = new mongoose.Schema({
  name: String,
  department: String,
  maxHours: Number,
  loggedHours: Number,
  employeeUsername: String, // Add this field
});

const User = mongoose.model("User", userSchema, "employees"); // Specify the collection name
const Activity = mongoose.model("Activity", activitySchema, "activities"); // Specify the collection name

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log("Request Body:", req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Successful login logic here
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch activities for a specific department
app.get("/api/activities", async (req, res) => {
  const { department } = req.query;

  try {
    let activities;

    if (department) {
      activities = await Activity.find({ department });
    } else {
      activities = await Activity.find();
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Log hours for a specific activity
app.post("/api/log-hours", async (req, res) => {
  const { activityId, hours } = req.body;

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(400).json({ error: "Activity not found" });
    }

    // Check against maximum hours
    if (hours > activity.maxHours) {
      return res.status(400).json({ error: "Exceeds maximum hours" });
    }

    // Update the loggedHours field and associate with the employee
    activity.loggedHours = activity.loggedHours + hours;
    activity.employeeUsername = req.user.username; // Assuming you have a user object in req
    await activity.save();

    res.status(200).json({ message: "Hours logged successfully" });
  } catch (error) {
    console.error("Error logging hours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
