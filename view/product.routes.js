const router = require('express').Router();
const Product = require('../model/product.model');

const { createProduct, fetchProduct, updateProduct, deleteProduct, searchProduct } = require('../controller/product.controller');
// Create product /createproduct
// Fetch Product /product
// Update Product /updateProduct
// Delete Product /deleteProduct
// Search /searchProduct

router.post('/createproduct', createProduct);
router.get('/:name', fetchProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.get('/searchProduct', searchProduct);
router.get("/allproducts", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching all products:", err);
        res.status(500).json(err.message);
    }
});

module.exports = router;