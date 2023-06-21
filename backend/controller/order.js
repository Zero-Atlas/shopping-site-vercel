const Order = require("../model/order");
const Product = require("../model/product");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const createMail = require("../util/order-mail");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.postNewOrder = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const cart = req.body.cart.map((p) => {
    return { quantity: p.quantity, productId: p.product._id };
  });

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    });
  }

  const order = new Order({
    name: name,
    email: email,
    phone: phone,
    address: address,
    productList: cart,
    userId: req.user._id,
  });

  cart.map((p) => {
    Product.findById(p.productId)
      .then((product) => {
        if (!product) return next("Product not found");
        product.stock -= p.quantity;
        if (product.stock < 0) return next("Not enough stock");
        return product.save();
      })
      .catch((err) => next(err));
  });

  return order
    .save()
    .then(() => {
      transporter.sendMail({
        to: email,
        from: "anhdfx20137@funix.edu.vn",
        subject: "Successful signup!",
        html: createMail(name, phone, address, req.body.cart),
      });
      return res.status(201).json({ message: "Order created!" });
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  const userId = req.user._id;
  Order.find({ userId: userId })
    .populate({
      path: "productList",
      populate: {
        path: "productId",
        model: "Product",
      },
    })
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((err) => next(err));
};
