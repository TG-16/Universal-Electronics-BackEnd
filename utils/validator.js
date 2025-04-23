
const signupValidator = (req, res, next) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    next();
}

const loginValidator = (req, res, next) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ error: 'Phone and password are required' });
    }

    next();
}

// const productValidator = (req, res, next) => {
//     const { name, price, stock, description, category } = req.body;

//     if (!name || !price || !stock || !description || !category) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     if (price <= 0) {
//         return res.status(400).json({ error: 'Price must be greater than 0' });
//     }

//     if (stock < 0) {
//         return res.status(400).json({ error: 'Stock cannot be negative' });
//     }

//     next();
// }

const checkoutValidator = (req, res, next) => {
    const { userId, products } = req.body;

    if (!userId || !products || products.length === 0) {
        return res.status(400).json({ error: 'User ID and products are required' });
    }

    products.forEach(product => {
        if (!product.name || !product.quantity) {
            return res.status(400).json({ error: 'Product ID and quantity are required for each product' });
        }

        if (product.quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0' });
        }
    });

    next();
}

const addProductValidator = (req, res, next) => {
    const { name, price, stock, description, category } = req.body;

    if (!name || !price || !stock || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (price <= 0) {
        return res.status(400).json({ error: 'Price must be greater than 0' });
    }

    if (stock < 0) {
        return res.status(400).json({ error: 'Stock cannot be negative' });
    }

    next();
}

// const updateProductValidator = (req, res, next) => {
//     const { name, price, stock, description, category } = req.body;

//     if (!name || !price || !stock || !description) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     if (price <= 0) {
//         return res.status(400).json({ error: 'Price must be greater than 0' });
//     }

//     if (stock < 0) {
//         return res.status(400).json({ error: 'Stock cannot be negative' });
//     }

//     next();
// }

module.exports = { 
    signupValidator,
    loginValidator,
    checkoutValidator,
    addProductValidator
 };