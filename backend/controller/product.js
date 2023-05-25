const Product = require("../model/product");

exports.getTrending = (req, res, next) => {
  Product.find()
    .then((products) => {
      const trendingProduct = products
        .sort((a, b) => a.price - b.price)
        .filter((p, i) => i < 8); // first 8 product
      return res.json(trendingProduct);
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  Product.find()
    .then((products) => {
      return res.json(products);
    })
    .catch((err) => next(err));
};

exports.getDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return next();
      }
      return res.json(product);
    })
    .catch((err) => next(err));
};
