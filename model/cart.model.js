const mongoose = require('mongoose');

// Id:string,
// userID:string,
// Products:[{
// productId: string,
// Price:number,
// quantity:number	
// }],
// totalAmount:number

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        trim: true,

    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: true,

            },
            price:{
                type:Number,
                required: true,
                min: 0
            },
            quantity:{
                type:Number,
                required: true,
                min: 1
            }
        }
    ],
    totalAmount:{
        type:Number,
        required: true,
        min: 0
    }

}, {timestamps: true});


//collection1 collection2
//users       cart
//cart -> userId -> users._id
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;