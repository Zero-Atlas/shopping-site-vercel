const mongoose = require("mongoose");

const helpSchema = mongoose.Schema({
  chatHistory: [{ message: { type: String }, isCustomer: { type: Boolean } }],
});

module.exports = mongoose.model("Chat", helpSchema);
