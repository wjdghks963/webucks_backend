const productService  = require('../services/productService');

const showAllProducts = async (req,res) => {

    try{
       let allProducts = await productService.allProducts();
      return  res.status(200).json(allProducts)
    }catch(err){
        console.log(err);
       return res.status(400).end("NOTHING_HERE")
    }
}

module.exports = {showAllProducts}