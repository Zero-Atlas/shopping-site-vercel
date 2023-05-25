const express = require("express");

const isAuth = require("../middleware/is-auth");
const productController = require("../controller/product");

const router = express.Router();

router.get("/trending", productController.getTrending);
router.get("/all", productController.getAll);

router.get('/detail/:productId',productController.getDetail)

module.exports = router;
