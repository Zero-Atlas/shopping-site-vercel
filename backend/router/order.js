const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");
const orderController = require("../controller/order");

const router = express.Router();

router.post(
  "/new",
  isAuth,
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("name")
      .custom((value) => /^([a-zA-Z ]{2,})$/.test(value))
      .withMessage(
        "Name can only have alphabet, white space and has 2 or more character."
      )
      .trim(),
    body("address")
      .custom((value) => /^([a-zA-Z0-9 ]{2,})$/.test(value))
      .withMessage(
        "Address can only have alphabet, number, white space and has 2 or more character."
      )
      .trim(),
    body("phone")
      .custom((value) => /^([0-9]{6,})$/.test(value))
      .withMessage("Phone can only have number and has 6 or more character.")
      .trim(),
  ],
  orderController.postNewOrder
);

router.get("/all", isAuth, orderController.getAll);

module.exports = router;
