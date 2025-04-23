const userModel = require('../models/userModel');
const productModel = require('../models/productModel');

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
        const user = await userModel.find({ phone });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

const productList = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

const search =  async (req, res) => {
    const { name } = req.params;
    try {
        const product = await productModel.findById(name);
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
        products.forEach(async product => {
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            if (product.stock < quantity) {
                return res.status(400).json({ error: 'Insufficient stock' });
            }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        products.forEach(async product => {
            const product = await productModel.findById(productId);
            product.stock -= quantity;
            await product.save();
        });

        // Implement checkout logic here (e.g., create an order, update stock, etc.)
        res.status(200).json({ message: 'Checkout successful' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error during checkout' });
    }
}



module.exports = {
    signup,
    login,
    productList,
    search,
    checkout
}