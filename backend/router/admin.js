const express = require("express");

const router = express.Router();

const productController = require("../controller/product");
const isAdmin = require("../middleware/is-admin");
const isAuth = require("../middleware/is-auth");


//check admin logged in
router.get("/check-level", isAuth, isAdmin, (req, res, next) => {
  try {
    const level = req.user.level;
    return res.status(200).json({ level: level });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
