const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        unique : true,
        type : String
    },
    phone : {
        unique : true,
        type  : String,
    },
    password : {
        type : String
    
})

mongoose.model('UserSchema',UserSchema)