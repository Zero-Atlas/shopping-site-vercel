const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const userController = require("../controller/user");
const User = require("../model/user");

// POST signup
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .custom((inputEmail) => {
        return User.findOne({ email: inputEmail }).then((result) => {
          if (result) {
            return Promise.reject("Email is already exist.");
          }
        });
      })
      .normalizeEmail(),
    body("fullName")
      .custom((value) => /^([a-zA-Z ]{2,})$/.test(value))
      .withMessage(
        "Name can only have alphabet, white space and has 2 or more character."
      )
      .trim(),
    body("phone")
      .custom((value) => /^([0-9]{6,})$/.test(value))
      .withMessage("Phone can only have number and has 6 or more character.")
      .trim(),
    body("password")
      .isString()
      .isLength({ min: 5 })
      .withMessage("Password must have 5+ character.")
      .trim(),
  ],
  userController.postSignup
);

// POST login
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

// check auth stage
router.get("/check-auth", (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.status(200).json({
      name: req.session.user.fullName,
      email: req.session.user.email,
      phone: req.session.user.phone,
      chatRoom: req.session.user.chatRoom,
    });
  }
  return res.status(200).json({ isAuthenticated: "false" });
});

// logout
router.post("/logout", userController.postLogout);

module.exports = router;
