const mongoose = require("mongoose");
const resetTokenSchema = new mongoose.Schema({
  token: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Date,
    default: new Date() + 60000,
  },
});
const ResetToken = mongoose.model("ResetToken", resetTokenSchema);
module.exports = ResetToken;
