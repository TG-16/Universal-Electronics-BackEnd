
router.post("/addProduct", async (req, res) => {
    const { name, price, stock, description, category } = req.body;
    try {
        const newProduct = new productModel({ name, price, stock, description, category });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});