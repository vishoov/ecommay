const router = require('express').Router();
const Cart = require('../model/cart.model');
// Add to cart
// Delete From Cart
// Fetch Cart


router.post("/addtocart", async (req, res)=>{
    try{
        const price = 10;
        const { userId, productId, quantity } = req.body;

        if(!userId|| !productId || !quantity){
            return res.status(400).json({ message: "User ID, Product ID, and Quantity are required" });
        }
//if the cart already exists for the user, update it
        const cart = await Cart.findOne({ userId: userId });
        //if the cart does not exist, create a new one
        if(!cart){
            const newCart = await Cart.create({
                userId:userId,
                products:[{
                    productId: productId,
                    quantity: quantity,
                    price: 10
                }],
                totalAmount: quantity * price
            })
            return res.status(201).json({
                message: "Cart created successfully",
                cart: newCart
            });
        }

        else{
            //if it exists, and considering the product also exists in the cart

            const productIndex = cart.products.findIndex(p=>
                p.productId.toString() === productId.toString()
            )

            if(productIndex>-1){
                //if the product already exists in the cart, update the quantity and total amount
                cart.products[productIndex].quantity += quantity;
                cart.totalAmount += cart.products[productIndex].price * quantity;
            }
            else{
                //if the product does not exist in the cart, add it
                const product = await Product.findById(productId);
                if(!product){
                    return res.status(404).json({ message: "Product not found" });
                }
                cart.products.push({
                    productId: productId,
                    quantity: quantity,
                    price: product.price
                });
                cart.totalAmount += product.price * quantity;
                
            }
            //save the cart
            const updatedCart = await cart.save();

            res.status(200).json({
                message: "Cart updated successfully",
                cart: updatedCart
            })


        }
    }
    catch(err){
        console.error("Error adding to cart:", err);
        res.status(500).json(err.message);
    }
});

router.delete("/deletefromcart/:userId/:productId", async (req, res)=>{
    try{
        const { userId, productId } = req.params;
    
    if(!userId || !productId){
        return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    const cart = await Cart.findOne({ userId:userId});

    if(!cart){
        return res.status(404).json({ message: "Cart not found for this user" });
    }
    const p= cart.products.findIndex(p => p.productId.toString() === productId.toString());

    if(p === -1){
        return res.status(404).json({ message: "Product not found in cart" });
    }

    //if the product exists in the cart, remove it
    cart.products.splice(p, 1);

    //update the total amount
    cart.totalAmount -= cart.products[p].price * cart.products[p].quantity;

    const updatedCart = await cart.save();

    res.status(200).json({
        message: "Product removed from cart successfully",
        cart: updatedCart
    });
    }
    catch(err){
        console.error("Error deleting from cart:", err);
        res.status(500).json(err.message);
    }
}) 

router.get("/fetchcart/:userId", async (req, res)=>{
    try{
        const { userId } = req.params;

        if(!userId){
            return res.status(400).json({ message: "User ID is required" });
        }

        const cart = await Cart.findOne({ userId: userId });

        if(!cart){
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        res.status(200).json(cart);
    }
    catch(err){
        console.error("Error fetching cart:", err);
        res.status(500).json(err.message);
    }
});


module.exports = router;