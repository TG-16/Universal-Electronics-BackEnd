const express = require('express');
const router = express.Router();
const validator = require('../validators/userValidator');
const userController = require('../controllers/userController');


router.post('/signup', validator.signupValidatorasync , userController.signup);
router.post('/login', validator.loginValidator,userController.login);
router.get("/productList", userController.productList);
router.get("/search/:name", userController.search);
router.post("/checkout", validator.checkoutValidator, userController.checkout);
