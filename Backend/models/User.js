const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    createdAt : {
        default : () => Date.now(),
        type : Date
    }
})

module.exports = new mongoose.model("User", userSchema)