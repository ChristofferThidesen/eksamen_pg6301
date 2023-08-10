const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// Fetch all activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an activity by ID
router.put("/:id", async (req, res) => {
  const { name, department } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      { name, department },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Delete one activities
router.delete("/:id", async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);

    if (!deletedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to add a new activity
router.post("/", async (req, res) => {
  const { name, department } = req.body;

  try {
    const newActivity = new Activity({ name, department });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

module.exports = router;
