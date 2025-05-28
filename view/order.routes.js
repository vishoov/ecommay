const router = require('express').Router();
const Cart = require('../model/cart.model');
// Place Order
// Cancel Order
// Track
//update Order Status
const Order = require('../model/order.model');

router.post("/placeorder", async (req, res)=>{
    try{
        const {
            userId,
            cartId, 
            shippingAddress,
            status = 'Pending'
        } = req.body;
        
        if(!userId || !cartId || !shippingAddress){
            return res.status(400).json({ message: "User ID, Cart ID, and Shipping Address are required" });
        }

        // Fetch the cart
        const cart = await Cart.findById(cartId).populate('products.productId');
        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }

        // Calculate total amount
        const totalAmount = cart.products.reduce((total, item) => {
            return total + (item.productId.saleprice * item.quantity);
        }, 0);

        // Create the order
        const order = await Order.create({
            userId: userId,
            items: cart.products.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.saleprice
            })),
            totalAmount: totalAmount,
            shippingAddress: shippingAddress,
            status: status
        });

        // Clear the cart after placing the order
        await Cart.findByIdAndDelete(cartId);
        res.status(201).json({
            message: "Order placed successfully",
            order: order
        });


    }
    catch(err){
        console.error("Error placing order:", err);
        res.status(500).json(err.message);
    }
})

router.put("/cancelorder/:id", async (req, res)=>{
    try{
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }
        if(order.status === 'Cancelled'){
            return res.status(400).json({ message: "Order is already cancelled" });
        }
        order.status = 'Cancelled';
        await order.save();
        res.status(200).json({
            message: "Order cancelled successfully",
            order: order
        });

    }
    catch(err){
        console.error("Error cancelling order:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/trackorder/:id", async (req, res)=>{
    try{
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('items.productId');
        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order fetched successfully",
            order: order
        });
    }
    catch(err){
        console.error("Error tracking order:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/updateorderstatus/:id", async (req, res)=>{
    try{
        const orderId = req.params.id;
        const { status } = req.body;

        if(!status){
            return res.status(400).json({ message: "Status is required" });
        }

        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order: order
        });
    }
    catch(err){
        console.error("Error updating order status:", err);
        res.status(500).json(err.message);
    }
});

module.exports = router;

// {
//     "message": "Cart updated successfully",
//     "cart": {
//         "_id": "683726b9700f1a1dc8470627",
//         "userId": "6835d77510d9894a6b96735a",
//         "products": [
//             {
//                 "productId": "683725f687382bbd971f1b9f",
//                 "price": 10,
//                 "quantity": 40,
//                 "_id": "683726b9700f1a1dc8470628"
//             }
//         ],
//         "totalAmount": 400,
//         "__v": 0,
//         "updatedAt": "2025-05-28T15:09:20.258Z"
//     }
// }