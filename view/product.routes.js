const router = require('express').Router();


const { createProduct, fetchProduct, updateProduct, deleteProduct, searchProduct, getAllProducts } = require('../controller/product.controller');
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
router.get("/allproducts", getAllProducts);

module.exports = router;