const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './utils/.env'});

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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('JWT', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        return res.status(200).json({ message: 'Login successful' });
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
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
    try {
      const newProduct = new productModel({
        name,
        price,
        stock,
        description,
        category,
        image: imagePath, // Save the filename or full path
      });
  
      await newProduct.save();
      res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error adding product" });
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
        const orders = await orderModel.find()
            .sort({ createdAt: -1 })
            .populate('user')  // populates the user
            .populate({
                path: 'products.product',
                model: 'Product',
            });  // populates each product inside the array

        console.log(JSON.stringify(orders, null, 2));  // Helpful for debugging
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
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
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await productModel.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  };

const logout = async (req, res) => {
    try {
        res.clearCookie('JWT', { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging out' });
    }
}


module.exports = {
    productList,
    addProduct,
    search,
    orderList,
    updateProduct,
    deleteProduct,
    login,
    logout
};