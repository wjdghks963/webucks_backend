const productDao = require('../models/productDao');

const allProducts = () => {
   return productDao.allProducts()
}


module.exports= {allProducts}