const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const users = [
  "Ankush", "Kamal", "Sanaki", "Amit", "Raj", "Nisha", "Simran", "Aditya", "Priya", "Manish"
];

const populateUsers = async () => {
  try {
    await User.deleteMany();
    const userObjects = users.map((name) => ({ name }));
    await User.insertMany(userObjects);
    console.log("Users populated");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

populateUsers();
