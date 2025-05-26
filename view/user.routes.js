const { updatePassword, signup, login, logout, profile } = require('../controller/user.controller');

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
router.get("/profile", profile);


module.exports = router;