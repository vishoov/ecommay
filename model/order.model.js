const mongoose = require('mongoose');
// Id:string,
// userID:string,
// Items:[{
// 	productID:string,
// 	Quantity:number,
// 	Price:number
// }]
// 	totalAmount:Number,
// 	shippingAddress:String,
// 	Status:string,

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity:{
                type: Number,
                required: true,
                min: 1
            },
            price:{
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    totalAmount:{
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;