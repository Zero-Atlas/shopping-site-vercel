const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const productController = require("../controller/product");
const adminController = require("../controller/admin");
const userController = require("../controller/user");
const User = require("../model/user");
const isAdmin = require("../middleware/is-admin");
const isAuth = require("../middleware/is-auth");

//login for admin
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .custom((inputEmail) => {
        return User.findOne({ email: inputEmail }).then((result) => {
          if (!result) {
            return Promise.reject("Email is not exist.");
          }
          if (result.level === 0) {
            return Promise.reject("Email is invalid.");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Password must have 5+ character.")
      .trim(),
  ],
  userController.postLogin
);

//get dashboard data
router.get("/dashboard", isAuth, adminController.getDashboard);

//check admin logged in
router.get("/check-level", isAuth, isAdmin, (req, res, next) => {
  try {
    const level = req.user.level;
    return res.status(200).json({ level: level });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/product/new",
  isAuth,
  isAdmin,
  [
    body("name")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Name atleast have 5 character")
      .trim(),
    body("price").isNumeric(),
    body("stock").isNumeric(),
    body("cat")
      .isAlpha()
      .withMessage("Category can only have alphabet")
      .toLowerCase()
      .trim(),
    body("short").isString().trim(),
    body("long").isString().trim(),
  ],
  adminController.postAddProduct
);

router.post(
  "/product/edit/:productId",
  isAuth,
  isAdmin,
  [
    body("name")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Name atleast have 5 character")
      .trim(),
    body("price").isNumeric(),
    body("stock").isNumeric(),
    body("cat")
      .isAlpha()
      .withMessage("Category can only have alphabet")
      .toLowerCase()
      .trim(),
    body("short").isString().trim(),
    body("long").isString().trim(),
  ],
  adminController.postEditProduct
);

router.delete('/product/delete/:productId',isAuth,isAdmin,adminController.deleteProduct)

module.exports = router;
