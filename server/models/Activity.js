const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: String,
  department: String,
  maxHours: Number,
  loggedHours: Number,
  employeeUsername: String,
});

module.exports = mongoose.model("Activity", activitySchema, "activities");
