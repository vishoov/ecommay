
// 	Id:string, id is given by default 
// 	Name:string,
// Age:number,
// Email:string,
// Address:string,
// Contact:number,
// Role:”user”, “admin”, -> role based authentication 
// Password:string

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    // User Schema implement 
    {
        name:{
            type:String,
            required: true,
            trim: true
        },
        age:{
            type:Number, 
            required:true,
            min:[0, 'Age cannot be negative'],
            max:[120, 'Age cannot be more than 120']
        },
        email:{
            type:String,
            required:true,
            unique:[true, 'Email already exists'],
            lowercase:true,
            trim:true,
            validate:{
                validator:function(email){
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
                    
                },
                message: value => `${value} is not a valid email address`

            }

        },
        address:{
            type:String,
            required:true,
            trim:true
        },
        contact:{
            type:String,
            required:true,
            unique:true,
            validate:{
                validator:function(contact){
                    // Accepts numbers with optional '+' and country code, e.g., +12345678901 or 12345678901
                    return /^(\+\d{1,3})?\d{10}$/.test(contact);
                }
            }
        },
        role:{
            type:String,
            enum:['user', 'admin'],
            default:'user',
            required:true
        },
        password:{
            type:String,
            required:true,
            minlength:[6, 'Password must be at least 6 characters long'],
            // select:false // Exclude password from query results by default
        }
    
    }, {
        timestamps:true
    });

//bcrypt 
userSchema.pre('save', async function(next) {
    //write the logic to hash the password before saving
    if(this.isModified('password')){
        try{
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        }
        catch(err){
            console.error("Error hashing password:", err);
            next(err);
        }
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    //write the logic to compare the candidate password with the hashed password
    try{
        return await bcrypt.compare(candidatePassword, this.password)
    }
    catch(err){
        console.error("Error comparing password:", err);
        throw err;
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;