const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Fetch leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ totalPoints: -1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
