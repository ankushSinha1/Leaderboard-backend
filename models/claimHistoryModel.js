const mongoose = require("mongoose");

const claimHistorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  claimedPoints: { type: Number, required: true },
  claimedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClaimHistory", claimHistorySchema);
