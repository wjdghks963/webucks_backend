const express = require('express');
const categoriesRouter = express.Router();

const categoryController = require('../controllers/categoryController');

categoriesRouter.route('/').get(categoryController.showAllCategory);

module.exports = categoriesRouter;