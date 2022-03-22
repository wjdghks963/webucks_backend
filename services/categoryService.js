const categoryDao = require('../models/categoryDao');

const showAllCategory = () => {
   return categoryDao.allCategories()
}

module.exports = {showAllCategory}