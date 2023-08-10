const mongoose = require("mongoose");
const Activity = require("./models/Activity");
const LoggedHours = require("./models/LoggedHours");
const Manager = require("./models/manager");
const User = require("./models/User");

const MONGODB_URI = "mongodb://127.0.0.1:27017/eksamen_pg6301";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Seed activities
    const activities = await Activity.create([
      { name: "Activity 1", department: "Department A", maxHours: 10 },
      { name: "Activity 2", department: "Department B", maxHours: 15 },
      // Add more activities as needed
    ]);

    // Seed logged hours
    const loggedHours = await LoggedHours.create([
      { name: "Activity 1", department: "Department A", loggedHours: 5 },
      // Add more logged hours data as needed
    ]);

    // Seed managers
    const managers = await Manager.create([
      { username: "admin", password: "admin" },
      // Add more managers as needed
    ]);

    // Seed users
    const users = await User.create([
      { username: "user1", password: "password1" },
      // Add more users as needed
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
