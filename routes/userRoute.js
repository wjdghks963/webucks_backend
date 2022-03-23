const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController');

userRouter.route('/').post(userController.changePassword).get(userController.getUsersInfo);
userRouter.route('/signup').post(userController.createUser);
userRouter.route('/login').post(userController.login).get(userController.userLoggedIn);

module.exports = userRouter;