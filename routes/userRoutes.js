const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const ClaimHistory = require("../models/claimHistoryModel");

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new user
router.post("/add", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim points for a user
router.post("/claim", async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  const randomPoints = Math.floor(Math.random() * 10) + 1;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += randomPoints;
    await user.save();

    const history = new ClaimHistory({ userId, claimedPoints: randomPoints });
    await history.save();

    res.status(200).json({ user, pointsClaimed: randomPoints });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
