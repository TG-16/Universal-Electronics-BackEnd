const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');

const signup = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const newUser = new userModel({ name, email, phone, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

const login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await userModel.findOne({ phone });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

const productList = async (req, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

const search = async (req, res) => {
    const { name } = req.params;
    try {
        const product = await productModel.findOne({ name });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

const checkout = async (req, res) => {
    const { userId, products } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        for (const product of products) {
            const findProduct = await productModel.findById(product.productId);
            if (!findProduct) {
                return res.status(404).json({ error: `Product not found: ${product.productId}` });
            }

            if (findProduct.stock < product.quantity) {
                return res.status(400).json({ error: `Insufficient stock for product: ${findProduct.name}` });
            }
        }

        const productDetailsList = await Promise.all(products.map(p => productModel.findById(p.productId)));
        const totalAmount = productDetailsList.reduce((sum, prod, i) => {
            return sum + (prod.price * products[i].quantity);
        }, 0);

        const order = new orderModel({
            user: userId,
            products: products.map(p => ({
                product: p.productId,
                quantity: p.quantity
            })),
            totalAmount
        });

        await order.save();

        for (const product of products) {
            const findProduct = await productModel.findById(product.productId);
            findProduct.stock -= product.quantity;
            await findProduct.save();
        }

        res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error during checkout' });
    }
};

module.exports = {
    signup,
    login,
    productList,
    search,
    checkout
};
