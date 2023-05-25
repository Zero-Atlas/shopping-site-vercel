const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, require: true },
  short_desc: { type: String, require: true },
  long_desc: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  img1: { type: String },
  img2: { type: String },
  img3: { type: String },
  img4: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
