const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./view/user.routes');
const productRoutes = require('./view/product.routes');
const cartRoutes = require('./view/cart.routes');
const orderRoutes = require('./view/order.routes');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});


app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes)
app.get("/", (req, res)=>{
    res.send("Welcome to our ecommerce API server");
})





app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})