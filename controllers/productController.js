const productService = require("../services/productService");
const userService = require("../services/userServices");

const showAllProducts = async (req, res) => {
  try {
    let allProducts = await productService.allProducts();
    return res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
    return res.status(400).end("NOTHING_HERE");
  }
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await productService.productById(id);

    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json({ message: err.message });
  }
};

const productLike = async (req, res) => {
  const { like } = req.body;
  const { id } = req.params;
  console.log(like);
  try {
    let loggedIn = await userService.verifyUser(req);

    if (!!loggedIn.email & (like === 1)) {
      await productService.productLike(loggedIn.email, id);

      return res.end(loggedIn.email);
    } else if (!!loggedIn & (like === 0)) {
      await productService.productDislike(loggedIn.email, id);

      return res.end("DELETED");
    } else if (!loggedIn) {
      let notLoggedIn = userService.err("PLEASE_LOGIN", 400);
      throw notLoggedIn;
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { showAllProducts, findProductById, productLike };
