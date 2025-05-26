
// 	Id:string,
// 	Name:string,
// Age:number,
// Email:string,
// Address:string,
// Contact:number,
// Role:”user”, “admin”, -> role based authentication 
// Password:string

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    // User Schema implement 
);

//bcrypt 
userSchema.pre('save', async function(next) {
    //write the logic to hash the password before saving
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    //write the logic to compare the candidate password with the hashed password
}

const User = mongoose.model('User', userSchema);

module.exports = User;