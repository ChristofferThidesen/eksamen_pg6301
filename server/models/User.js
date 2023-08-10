const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "employees"); // Specify the collection name

module.exports = User;
