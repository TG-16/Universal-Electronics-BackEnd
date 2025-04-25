const express = require('express');
const router = express.Router();
const validator = require('../utils/validator');
const adminController = require('../controllers/adminController');
const checkAuth = require('../utils/checkAuth');

router.post('/login', validator.loginValidator,adminController.login);
router.post('/addProduct', checkAuth.upload.single("image"), validator.addProductValidator, adminController.addProduct);
router.get('/productList', adminController.productList);
router.get('/search/:name', adminController.search);
router.get('/orderList', adminController.orderList);
router.put('/updateProduct/:id', validator.addProductValidator, adminController.updateProduct);
router.delete('/deleteProduct/:id', adminController.deleteProduct);
router.get('/logout', adminController.logout);


module.exports = router;