const express = require("express");
const router = express.Router();
const LoggedHours = require("../models/LoggedHours");
const Activity = require("../models/Activity"); // Import your Activity model
const requireAuth = require("../middelware/authMiddelware");

router.post("/", requireAuth, async (req, res) => {
  const { activityId, loggedHours } = req.body;

  try {
    // Fetch the selected activity from the database
    const selectedActivity = await Activity.findById(activityId);

    if (!selectedActivity) {
      return res.status(400).json({ error: "Activity not found" });
    }

    // Get the logged in user
    const user = req.session.user;

    // Debugging: Log data before saving
    console.log("Selected Activity:", selectedActivity);
    console.log("Logged Hours:", loggedHours);
    console.log("User:", user);

    // Create a new LoggedHours entry and save it
    const loggedHoursEntry = new LoggedHours({
      name: selectedActivity.name,
      department: selectedActivity.department,
      loggedHours: loggedHours,
      employeeUsername: user.username,
    });

    await loggedHoursEntry.save();

    res.status(200).json({ message: "Hours logged successfully" });
  } catch (error) {
    console.error("Error logging hours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/logged-hours", requireAuth, async (req, res) => {
  try {
    // Get the logged in user
    const user = req.session.user;

    // Fetch logged hours data for the logged-in employee
    const loggedHoursData = await LoggedHours.find({
      employeeUsername: user.username,
    });

    res.status(200).json(loggedHoursData);
  } catch (error) {
    console.error("Error fetching logged hours data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
