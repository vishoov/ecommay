const auth = require('../AUTH/user.auth');
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
router.get("/profile/:id", auth, profile);


module.exports = router;