const productDao = require("../models/productDao");
const userDao = require("../models/userDao");

const error = (content, status) => {
  let err = new Error(content);
  err.statusCode = status;
  return err;
};

const allProducts = () => {
  return productDao.allProducts();
};

const productById = async (id) => {
  let productById = await productDao.productById(id);

  if (productById.length === 0) {
    const noProduct = error("NO_PRODUCT", 404);
    throw noProduct;
  } else {
    return productById;
  }
};

const productLike = async (userEmail, productId) => {
  const userId = await userDao.findUserId(userEmail);
  return await productDao.productLike(userId, productId);
};

const productDislike = async (userEmail, productId) => {
  const userId = await userDao.findUserId(userEmail);
  return await productDao.productDislike(userId, productId);
};

module.exports = { allProducts, productById, productLike, productDislike };
