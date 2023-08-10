const mongoose = require("mongoose");

const loggedHoursSchema = new mongoose.Schema({
  name: String,
  department: String,
  loggedHours: Number,
  employeeUsername: String,
});

module.exports = mongoose.model(
  "LoggedHours",
  loggedHoursSchema,
  "loggedHours"
);
