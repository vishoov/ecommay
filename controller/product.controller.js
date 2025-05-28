const Product = require('../model/product.model');


const createProduct = async (req, res) => {
    try{
        const productData = req.body;

        const newProduct = await Product.create(productData);

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });

    }
    catch(err){
        console.error("Error creating product:", err);
        res.status(500).json(err.message);
    }
}



const fetchProduct= async (req, res)=>{
    try{
        const name = req.params.name;

        const product = await Product.findOne({name:name});

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({
            message: "Product fetched successfully",
            product: product
        });
    }
    catch(err){
        console.error("Error fetching products:", err);
        res.status(500).json(err.message);
    }
}

const updateProduct = async (req, res) => {
    try{
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        )

        if(!updatedProduct){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    }
    catch(err){
        console.error("Error updating product:", err);
        res.status(500).json(err.message);
    }
}

const deleteProduct = async (req, res) => {
    try{
        const productId = req.params.id;

        const deletedProduct= await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    }
    catch(err){
        console.error("Error deleting product:", err);
        res.status(500).json(err.message);
    }
}


const searchProduct = async (req, res) => {
    try{
        const query = req.query.q;
        if(!query){
            return res.status(400).json({message: "Search query is required"});
        }
      
        const products = await Product.find({name:query})

        if(products.length === 0){
            return res.status(404).json({message: "No products found"});
        }

        res.status(200).json({
            message: "Products found",
            products: products
        });
    }
    catch(err){
        console.error("Error searching products:", err);
        res.status(500).json(err.message);
    }
}

const getAllProducts = async (req, res) => {
   
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching all products:", err);
        res.status(500).json(err.message);
    }
}

module.exports = {
    createProduct,
    fetchProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    getAllProducts
}