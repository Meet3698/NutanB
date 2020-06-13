const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName : {
        type : String
    },
    productDescription : {
        type : String
    },
    productPrice : {
        type : Number
    },
    productSize : {
        type : String
    },
    productStock : {
        type : Number
    },
    productColor : {
        type : String,
        value : [String]
    },
    productLength : {
        type : Number
    },
    productCare : {
        type : String
    },
    productComposition : {
        type : String
    },
    productStyleNo : {
        type : String
    },
    productCategory : {
        type : String
    },
    productType : {
        type : String
    }
})

mongoose.model('ProductSchema',ProductSchema)