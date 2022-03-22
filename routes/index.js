const express = require('express');
const router = express.Router();

const userRouter = require('./userRoute');
const productRouter = require('./productRoute');
const categoriesRouter = require('./categoriesRouter')

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoriesRouter);

module.exports = router;