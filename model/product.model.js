
// 	id:string,
// 	Name:string,
// description:string,
// Costprice:number,
// saleprice:number,
// Category:string,
// Stock:number,
// image:[String] -> cdn links front end 
// createdAt:date
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required: true,
        trim: true
    },
    costprice:{
        type: Number,
        required: true,
        min: [0, 'Cost price cannot be negative']
    },
    saleprice:{
        type: Number,
        required: true,
        min: [0, 'Sale price cannot be negative']
    },
    category:{
        type:String,
        required: true,
        trim: true
    },
    stock:{
        type:Number, 
        required:true,
        min:[0, 'Stock cannot be negative'],
        
    },
    image:[String], // Array of image URLs

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

