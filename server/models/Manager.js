const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
  username: String,
  password: String, // In production, use proper password hashing
});

const Manager = mongoose.model("Manager", managerSchema, "manager");

module.exports = Manager;
