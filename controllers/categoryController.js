const categoryService = require('../services/categoryService');

const showAllCategory = async (req,res) =>{
    try{
        let allCategory = await categoryService.showAllCategory();
        return  res.status(200).json({allCategory});
    }
    catch(err){
        console.log(err)
        return res.status(400).end("NOTHING HERE")
    }

}

module.exports = {showAllCategory}