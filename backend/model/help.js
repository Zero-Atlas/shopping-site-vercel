const mongoose = require("mongoose");

const helpSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, require: true, ref: "User" },
  chatHistory: [{ message: { type: String }, isUser: { type: Boolean } }],
});

module.exports = mongoose.model("Help", helpSchema);
