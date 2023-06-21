const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  productList: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "Product",
      },
      quantity: { type: Number },
    },
  ],
  total: { type: Number },
  userId: { type: mongoose.Types.ObjectId, require: true, ref: "User" },
});

module.exports = mongoose.model("Order", orderSchema);
