const express = require('express');
const router = express.Router();
const validator = require('../validators/userValidator');
const adminController = require('../controllers/adminController');

router.post('/login', validator.loginValidator,adminController.login);
router.post('/addProduct', validator.addProductValidator, adminController.addProduct);
router.get('/productList', adminController.productList);
router.get('/search/:name', adminController.search);
router.get('/orderList', adminController.orderList);
router.post('/updateProduct/:id', validator.addProductValidator, adminController.updateProduct);
