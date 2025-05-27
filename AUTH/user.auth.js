const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const auth = (req, res, next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({message: "No token provided"});
        }

        // Verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Invalid token"});
        }

        next();
        
    }
    catch(err){
        console.error("Authentication error:", err);
        res.status(401).json({message: "Unauthorized access"});
    }
}

module.exports = auth;