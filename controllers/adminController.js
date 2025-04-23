const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');

const login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await userModel.find({ phone });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

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
        const products = await productModel.find().sort({ createdAt: -1 }); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

const addProduct = async (req, res) => {
    const { name, price, stock, description, category } = req.body;
    try {
        const newProduct = new productModel({ name, price, stock, description, category });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
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

const orderList = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, description, category } = req.body;
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, { name, price, stock, description, category }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product Updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

module.exports = {
    productList,
    addProduct,
    search,
    orderList,
    updateProduct,
    login
};