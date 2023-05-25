const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../model/user");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    });
  }

  // check password and log user in
  User.findOne({ email: email }).then((user) => {
    bcryptjs
      .compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return res.status(202).json({ message: "Logged in success!" });
        }
        return res
          .status(401)
          .json({ message: "Email or password is not correct!" });
      })
      .catch((err) => next(err));
  });
};

exports.postSignup = (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
    });
  }

  // create new user
  bcryptjs
    .hash(password, 12)
    .then((hashPassword) => {
      const user = new User({
        fullName: fullName,
        email: email,
        password: hashPassword,
        phone: phone,
        level: 0,
      });

      return user.save();
    })
    .then(() => {
      console.log("User Created!");
      return res.status(201).json({ message: "Successfully signup!" });
    })
    .catch((err) => next(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.json({ message: "Logout" });
  });
};
