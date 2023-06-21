const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  fullName: { type: String, require: true },
  phone: { type: String, require: true },
  level: { type: Number, require: true },
  cart: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
    },
  ],
  chatRoom: { type: mongoose.Types.ObjectId, ref: "Chat" },
});

// methods
userSchema.methods.addToCart = function (productId) {
  // add logic
};
userSchema.methods.clearCart = function () {
  this.cart = [];
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
