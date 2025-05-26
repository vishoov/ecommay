const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});




app.get("/", (req, res)=>{
    res.send("Welcome to our ecommerce API server");
})





app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})