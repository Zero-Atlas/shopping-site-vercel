const User = require("../model/user");
const Order = require("../model/order");
const Product = require("../model/product");
const fileHelper = require("../util/fileHelper");

const { validationResult } = require("express-validator");

const baseUrl=process.env.BASE_URL

exports.getDashboard = (req, res, next) => {
  const dashboardData = {};
  User.find({ level: 0 })
    .then((users) => {
      dashboardData.ClientCounter = users.length;
      return Order.find().populate({
        path: "productList",
        populate: { path: "productId", model: "Product" },
      });
    })
    .then((orders) => {
      dashboardData.OrderList = orders.map((order) => {
        order.total = order.productList.reduce(
          (sum, p) => (sum += p.quantity * p.productId.price),
          0
        );
        return order;
      });
      return res.status(200).json(dashboardData);
    });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const cat = req.body.cat;
  const short = req.body.short;
  const long = req.body.long;
  const photos = req.files;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    });
  }
  if (!photos || photos.length < 4) {
    return res.status(422).json({
      errorMsg: "Please upload at least 4 image.",
    });
  }

  const product = new Product({
    name: name,
    price: price,
    stock: stock,
    category: cat,
    short_desc: short,
    long_desc: long,
  });
  product.img1 = baseUrl + photos[0].path;
  product.img2 = baseUrl + photos[1].path;
  product.img3 = baseUrl + photos[2].path;
  product.img4 = baseUrl + photos[3].path;

  return product.save().then(() => {
    return res.status(201).json({ message: "Product created!" });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const cat = req.body.cat;
  const short = req.body.short;
  const long = req.body.long;
  const photos = req.files;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    });
  }

  return Product.findById(prodId).then((product) => {
    if (!product)
      return res.status(404).json({ errorMsg: "Product not found." });

    product.name = name;
    product.price = price;
    product.stock = stock;
    product.category = cat;
    product.short_desc = short;
    product.long_desc = long;

    if (photos.length >= 4) {
      fileHelper.deleteFile(product.img1);
      fileHelper.deleteFile(product.img2);
      fileHelper.deleteFile(product.img3);
      fileHelper.deleteFile(product.img4);
      product.img1 = baseUrl + photos[0].path;
      product.img2 = baseUrl + photos[1].path;
      product.img3 = baseUrl + photos[2].path;
      product.img4 = baseUrl + photos[3].path;
    }

    return product.save().then(() => {
      return res.status(201).json({ message: "Product updated!" });
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  return Product.findById(prodId)
    .then((product) => {
      if (!product)
        return res.status(404).json({ errorMsg: "Product not found." });
      fileHelper.deleteFile(product.img1);
      fileHelper.deleteFile(product.img2);
      fileHelper.deleteFile(product.img3);
      fileHelper.deleteFile(product.img4);
      return Product.deleteOne({ _id: prodId });
    })
    .then(() => {
      return res.status(200).json({ message: "Product deleted!" });
    });
};
