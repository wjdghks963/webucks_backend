const express = require("express");
const productRouter = express.Router();

const productController = require("../controllers/productController");

productRouter.route("/").get(productController.showAllProducts);
productRouter
  .route("/:id")
  .get(productController.findProductById)
  .post(productController.productLike);

module.exports = productRouter;
