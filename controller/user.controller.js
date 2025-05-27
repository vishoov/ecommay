const User = require('../model/user.model');
const jwt = require('jsonwebtoken');


const signup = async (req, res)=>{
    try{
        const user = req.body;
        // Validate user data here if needed
        const newUser = await User.create(user);

        const token = jwt.sign({
            id:newUser._id, 
            email:newUser.email
        }, process.env.JWT_SECRET,{
            expiresIn: '1d',
             // Token expiration time
            algorithm: 'HS256' // Algorithm used for signing the token
        }
        )

        res.status(201).json({
            message:"User created successfully",
            user:newUser,
            token:token // Return the token to the client
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json(err.message);
    }
}

const login = async (req, res)=>{
    try{
        const {email, password}= req.body;

        // Validate email and password
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }

        // Find user by email
        const user = await User.findOne({email});
        
      
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid password"});
        }

          const token = jwt.sign({
            id: user._id, 
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '1d', // Token expiration time
            algorithm: 'HS256' // Algorithm used for signing the token
        });
        

        // Generate token (if using JWT or similar)

        res.status(200).json({
            message: "Login successful",
            user: user,
            token: token // Return the token to the client
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json(err.message);
    }
}

const logout = async (req, res)=>{
    try{
        res.status(200).json({
            message: "Logout successful"
        })

        // Implement logout logic here, such as clearing session or token
        //front end -> localStorage.removeItem('token');
    }
    catch(err){
        console.error(err);
        res.status(500).json(err.message);
    }
}

const updatePassword = async (req, res)=>{
    try{
        const { email, oldPassword, newPassword } = req.body;

        // Validate input
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "Email, old password, and new password are required" });
        }

        // Find user by email
        const user = await User.find({email:email});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare old password
        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }

        // Update password

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            message: "Password updated successfully"
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json(err.message);
    }
}

const profile = async (req, res)=>{
    try{
        const userId = req.params.id;

        // Validate user ID
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find user by ID

        const user = await User.findById(userId).select('-password'); // Exclude password from response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User profile retrieved successfully",
            user
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json(err.message);
    }
}

module.exports = {
    signup,
    login,
    logout,
    updatePassword,
    profile
};