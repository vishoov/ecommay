const auth = require('../AUTH/user.auth');
const { updatePassword, signup, login, logout, profile } = require('../controller/user.controller');
const User = require('../model/user.model');
const router = require('express').Router();



// Signup
router.post("/signup", signup)


// Login
router.post("/login", login)

// Logout
router.post("/logout", logout)


// Update Password

router.put("/update-password", updatePassword);


// Profile Page
router.get("/profile/:id", auth, profile);
router.get("/all", async (req, res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json(err.message);
    }
})

module.exports = router;


//   {
//         "_id": "6835d77510d9894a6b96735a",
//         "name": "robo",
//         "age": 50,
//         "email": "robo@gmail.com",
//         "address": "123, NYC, USA",
//         "contact": "+919897976578",
//         "role": "admin",
//         "password": "iamarobot",
//         "createdAt": "2025-05-27T15:17:09.138Z",
//         "updatedAt": "2025-05-27T15:17:09.138Z",
//         "__v": 0
//     },

// "product": {
//         "name": "iPhone",
//         "description": "designed by apple in california",
//         "costprice": 999,
//         "saleprice": 1999,
//         "category": "Technology",
//         "stock": 1000,
//         "image": [
//             "3900hdlhe603yohfoy0hol"
//         ],
//         "_id": "683725f687382bbd971f1b9f",
//         "createdAt": "2025-05-28T15:04:22.547Z",
//         "updatedAt": "2025-05-28T15:04:22.547Z",
//         "__v": 0
//     }