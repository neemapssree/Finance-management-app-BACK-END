const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    phone: {
        type:Number,
        required: true,
    },
    country: {
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true,
        default:3
    }   
    //user - 3
    // admin - 1 
},
{ timestamps: true } 

);

const userModel = mongoose.model('users',userSchema );

module.exports = userModel