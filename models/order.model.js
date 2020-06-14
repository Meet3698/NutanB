const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    email:{
        type : String
    },
    productName : {
        type : String
    },
    productQuantity : {
        type : Number
    },
    productSize : {
        type : String
    },
    productColor : {
        type : String
    },
    productPrice : {
        type : Number
    },
    orderStatus : {
        type : String
    },
    orderTime : {
        type: Number
    }
})

mongoose.model('OrderSchema',OrderSchema)